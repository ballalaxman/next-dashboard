import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";
import AddStudentForm from "@/app/ui/students/create-form";
import React from "react";

const Page = () => {
  return (
    <div>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Students", href: "/dashboard/students" },
          {
            label: "Add Student",
            href: "/dashboard/students/add",
            active: true,
          },
        ]}
      />
      <AddStudentForm />
    </div>
  );
};

export default Page;
