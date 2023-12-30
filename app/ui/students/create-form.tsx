"use client";
import Link from "next/link";
import React from "react";
import { Button } from "../button";

const AddStudentForm = () => {
  return (
    <form>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        <div className="grid grid-cols-2 gap-10">
          <div className="col-span-1">
            <label
              htmlFor="studentName"
              className="mb-2 block text-sm font-medium"
            >
              Student Name
            </label>
            <input
              id="studentname"
              name="studentName"
              type="text"
              placeholder="Enter Student Name"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-2 text-sm outline-2 placeholder:text-gray-500"
            />
          </div>
          <div className="col-span-1">
            <label htmlFor="contact" className="mb-2 block text-sm font-medium">
              Contact No
            </label>
            <input
              id="contact"
              name="contactNumber"
              type="number"
              placeholder="+91 9XXXXX"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-2 text-sm outline-2 placeholder:text-gray-500"
            />
          </div>
          <div className="col-span-1">
            <label
              htmlFor="fathername"
              className="mb-2 block text-sm font-medium"
            >
              Father Name
            </label>
            <input
              id="fathername"
              name="fatherName"
              type="text"
              placeholder="Enter Student Father name"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-2 text-sm outline-2 placeholder:text-gray-500"
            />
          </div>
          <div className="col-span-1">
            <label htmlFor="village" className="mb-2 block text-sm font-medium">
              Village
            </label>
            <input
              id="village"
              name="villageName"
              type="text"
              placeholder="Vilage name"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-2 text-sm outline-2 placeholder:text-gray-500"
            />
          </div>
          <div className="col-span-1">
            <label
              htmlFor="aspiringfor"
              className="mb-2 block text-sm font-medium"
            >
              Aspiring for:
            </label>
            <select
              id="aspiringfor"
              name="aspirant"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-4 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=""
            >
              <option value="" disabled>
                Select an option
              </option>
              <option value="residence">Residence</option>
              <option value="navodaya">Navodaya</option>
            </select>
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/students"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Add Student</Button>
      </div>
    </form>
  );
};

export default AddStudentForm;
