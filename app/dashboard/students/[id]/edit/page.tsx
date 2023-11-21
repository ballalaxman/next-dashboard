import { fetchStudentById } from "@/app/lib/data";
import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";
import Form from "@/app/ui/students/edit-student";
import React from "react";

const Page = async ({ params }: { params: { id: string } }) => {
  const id = params.id;
  const student = await fetchStudentById(id);
  console.log(student);
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Students", href: "/dashboard/students" },
          {
            label: "Edit Student",
            href: `/dashboard/students/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form student={student} />
    </main>
  );
};

export default Page;
