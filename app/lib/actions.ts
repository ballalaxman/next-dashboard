"use server";

import { signIn } from "@/auth";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const FormSchema = z.object({
  id: z.string(),
  customerId: z.string({
    invalid_type_error: "Please Select a customer.",
  }),
  amount: z.coerce
    .number()
    .gt(0, { message: "Please enter a amount greater than zero." }),
  status: z.enum(["pending", "paid"], {
    invalid_type_error: "Please Select a status.",
  }),
  date: z.string(),
});

// create a new invoice

export type State = {
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };
};

const CreateInvoice = FormSchema.omit({ id: true, date: true });

export const createInvoice = async (prevState: State, formData: FormData) => {
  const validatedFields = CreateInvoice.safeParse({
    customerId: formData.get("customerId"),
    amount: formData.get("amount"),
    status: formData.get("status"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields, Failed to create invoice",
    };
  }
  const { customerId, amount, status } = validatedFields.data;
  const amountInCents = amount * 100;
  const date = new Date().toISOString().split("T")[0];

  try {
    await sql`
        INSERT INTO invoices (customer_id, amount, status, date)
        VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
    `;
  } catch (error) {
    return { message: "Database Error: Failed to create invoice" };
  }
  revalidatePath("/dashboard/invoices");
  redirect("/dashboard/invoices");
};

// update invoices

const UpdateInvoice = FormSchema.omit({ id: true, date: true });

export const updateInvoice = async (
  id: string,
  prevState: State,
  formData: FormData
) => {
  const validatedFields = UpdateInvoice.safeParse({
    customerId: formData.get("customerId"),
    amount: formData.get("amount"),
    status: formData.get("status"),
  });
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields, Failed to update invoice",
    };
  }
  const { customerId, amount, status } = validatedFields.data;
  const amountInCents = amount * 100;
  const date = new Date().toISOString().split("T")[0];
  try {
    await sql`
        UPDATE Invoices
        SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}, date = ${date}
        WHERE id = ${id}
    `;
  } catch (error) {
    return { message: "Database Error: Failed to update invoice" };
  }
  revalidatePath("/dashboard/invoices");
  redirect("/dashboard/invoices");
};

// delete invoices

export const deleteInvoice = async (id: string) => {
  try {
    await sql`
        DELETE FROM Invoices WHERE id = ${id}
    `;
  } catch (error) {
    return { message: "Database Error: Failed to delete invoice" };
  }
  revalidatePath("/dashboard/invoices");
};

export const authenticate = async (
  prevState: string | undefined,
  formData: FormData
) => {
  try {
    await signIn("credentials", Object.fromEntries(formData));
  } catch (error) {
    if ((error as Error).message.includes("CredentialsSignIn")) {
      return "CredentialsSignIn";
    }
    throw error;
  }
};