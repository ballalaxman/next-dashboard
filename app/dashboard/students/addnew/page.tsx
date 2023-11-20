import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";
import React from "react";
import Form from "@/app/ui/students/create-student";

const Page = () => {
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Students", href: "/dashboard/students" },
          {
            label: "Create Students",
            href: "/dashboard/students/addnew",
            active: true,
          },
        ]}
      />
      <Form />
    </main>
  );
};

export default Page;
