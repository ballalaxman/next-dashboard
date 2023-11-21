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

const StudentFormSchema = z.object({
  id: z.string(),
  name: z.string().min(1, { message: "Name is Required" }),
  fatherName: z.string(),
  motherName: z.string(),
  contact: z.coerce.string().refine((value) => /^\d{10}$/.test(value), {
    message: "Mobile number must be a 10-digit number",
  }),
  village: z.string().min(1, { message: "Please Enter village" }),
  classStd: z.string({ invalid_type_error: "Please Select a class" }),
  status: z.enum(["disqualified", "qualified", "selected"], {
    invalid_type_error: "Please Select a status.",
  }),
  school: z.string().min(1, { message: "Enter School name" }),
  date: z.string(),
});

export type studentState = {
  errors?: {
    name?: string[];
    fatherName?: string[];
    motherName?: string[];
    contact?: string[];
    village?: string[];
    classStd?: string[];
    status?: string[];
    school?: string[];
  };
};

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

const AddStudent = StudentFormSchema.omit({ id: true, date: true });

export const addStudent = async (
  prevState: studentState,
  formData: FormData
) => {
  const validatedFields = AddStudent.safeParse({
    name: formData.get("name"),
    fatherName: formData.get("fatherName"),
    motherName: formData.get("motherName"),
    contact: formData.get("contact"),
    village: formData.get("village"),
    classStd: formData.get("classStd"),
    status: formData.get("status"),
    school: formData.get("school"),
  });
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields, Failed to add student",
    };
  }
  const {
    name,
    fatherName,
    motherName,
    contact,
    village,
    classStd,
    status,
    school,
  } = validatedFields.data;
  const date = new Date().toISOString();

  try {
    await sql`
        INSERT INTO students (name, father_name, mother_name, contact, village, class_std, status, school, date)
        VALUES (${name}, ${fatherName}, ${motherName}, ${contact}, ${village}, ${classStd}, ${status}, ${school}, ${date})
    `;
  } catch (error) {
    return { message: "Database Error: Failed to create invoice" };
  }
  revalidatePath("/dashboard/students");
  redirect("/dashboard/students");
};

const UpdateStudent = StudentFormSchema.omit({ id: true, date: true });

export const updateStudent = async (
  id: string,
  prevState: studentState,
  formData: FormData
) => {
  const validatedFields = UpdateStudent.safeParse({
    name: formData.get("name"),
    fatherName: formData.get("fatherName"),
    motherName: formData.get("motherName"),
    contact: formData.get("contact"),
    village: formData.get("village"),
    classStd: formData.get("classStd"),
    status: formData.get("status"),
    school: formData.get("school"),
  });
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields, Failed to add student",
    };
  }
  const {
    name,
    fatherName,
    motherName,
    contact,
    village,
    classStd,
    status,
    school,
  } = validatedFields.data;
  const date = new Date().toISOString().split("T")[0];

  try {
    await sql`
      UPDATE students
      SET name = ${name}, father_name = ${fatherName}, mother_name = ${motherName}, contact = ${contact},village = ${village}, class_std = ${classStd}, status = ${status}, school = ${school}, date = ${date}
      WHERE id = ${id}
    `;
  } catch (error) {
    return { message: "Database Error: Failed to update student" };
  }
  revalidatePath("/dashboard/students");
  redirect("/dashboard/students");
};

export const deleteStudent = async (id: string) => {
  try {
    await sql`
        DELETE FROM students WHERE id = ${id}
    `;
  } catch (error) {
    return { message: "Database Error: Failed to delete invoice" };
  }
  revalidatePath("/dashboard/students");
};
