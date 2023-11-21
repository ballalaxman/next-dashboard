"use client";
import {
  CheckIcon,
  ClockIcon,
  NoSymbolIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import React from "react";
import { Button } from "../button";
import { useFormState } from "react-dom";
import { updateStudent } from "@/app/lib/actions";
import { StudentForm } from "@/app/lib/definitions";

const EditStudentForm = ({ student }: { student: StudentForm }) => {
  const initialState = { message: null, errors: {} };
  const updateInvoiceById = updateStudent.bind(null, student.id);
  const [state, dispatch] = useFormState(updateInvoiceById, initialState);

  return (
    <form action={dispatch}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        <div className="mb-4 text-sm font-medium">
          <label htmlFor="name" className="mb-2">
            Student Name
          </label>
          <div className="relative mt-2">
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter Student Name"
              className="block w-full rounded-md border border-gray-200 py-2 text-sm outline-2 placeholder:text-gray-500"
              defaultValue={student.name}
            />
          </div>
          <div aria-live="polite" aria-atomic="true">
            {state.errors?.name &&
              state.errors?.name.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
        <div className="w-full mb-5 flex justify-between items-start gap-5">
          <div className="w-full text-sm font-medium">
            <label htmlFor="fatherName" className="mb-2">
              Father Name
            </label>
            <div className="relative mt-2">
              <input
                type="text"
                id="fatherName"
                name="fatherName"
                placeholder="Enter Student Father Name"
                className="block w-full rounded-md border border-gray-200 py-2 text-sm outline-2 placeholder:text-gray-500"
                defaultValue={student.father_name}
              />
            </div>
          </div>
          <div className="w-full text-sm font-medium">
            <label htmlFor="motherName" className="mb-2">
              Mother Name
            </label>
            <div className="relative mt-2">
              <input
                type="text"
                id="motherName"
                name="motherName"
                placeholder="Enter Student Mother Name"
                className="block w-full rounded-md border border-gray-200 py-2 text-sm outline-2 placeholder:text-gray-500"
                defaultValue={student.mother_name}
              />
            </div>
          </div>
        </div>
        <div className="w-full mb-5 flex justify-between items-start gap-5">
          <div className="w-full text-sm font-medium">
            <label htmlFor="contact" className="mb-2">
              Contact Number
            </label>
            <div className="relative mt-2">
              <input
                type="number"
                id="contact"
                name="contact"
                placeholder="+91 94XXXXXXXX"
                className="block w-full rounded-md border border-gray-200 py-2 text-sm outline-2 placeholder:text-gray-500"
                defaultValue={student.contact}
              />
            </div>
            <div>
              {state.errors?.contact &&
                state.errors?.contact.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
          <div className="w-full text-sm font-medium">
            <label htmlFor="village" className="mb-2">
              Village Name
            </label>
            <div className="relative mt-2">
              <input
                type="text"
                id="village"
                name="village"
                placeholder="Enter Student Village"
                className="block w-full rounded-md border border-gray-200 py-2 text-sm outline-2 placeholder:text-gray-500"
                defaultValue={student.village}
              />
            </div>
            <div aria-live="polite" aria-atomic="true">
              {state.errors?.village &&
                state.errors?.village.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </div>
        <div className="w-full mb-5 flex justify-between items-start gap-5">
          <div className="w-full text-sm font-medium">
            <label htmlFor="classStd" className="mb-2">
              Class studying
            </label>
            <div className="relative mt-2">
              <select
                id="classStd"
                name="classStd"
                className="peer block w-full rounded-md border border-gray-200 py-2 text-sm outline-2 placeholder:text-gray-500"
                defaultValue={student.class_std}
              >
                <option value="" disabled>
                  Select Studying class
                </option>
                <option value="4th Std">4th Std</option>
                <option value="5th Std">5th Std</option>
              </select>
              <div>
                {state.errors?.classStd &&
                  state.errors?.classStd.map((error: string) => (
                    <p className="mt-2 text-sm text-red-500" key={error}>
                      {error}
                    </p>
                  ))}
              </div>
            </div>
          </div>
          <div className="w-full text-sm font-medium">
            <label htmlFor="school" className="mb-2">
              School
            </label>
            <div className="relative mt-2">
              <input
                type="text"
                id="school"
                name="school"
                placeholder="Enter Student school"
                className="block w-full rounded-md border border-gray-200 py-2 text-sm outline-2 placeholder:text-gray-500"
                defaultValue={student.school}
              />
            </div>
            <div>
              {state.errors?.school &&
                state.errors?.school.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </div>

        {/* students selection status */}
        <fieldset>
          <legend className="mb-2 block text-sm font-medium">
            Set the Exam status of student
          </legend>
          <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
            <div className="flex gap-4">
              <div className="flex items-center">
                <input
                  id="disqualified"
                  name="status"
                  type="radio"
                  value="disqualified"
                  defaultChecked={student.status === "disqualified"}
                  className="h-4 w-4 border-gray-300 bg-gray-100 text-gray-600 focus:ring-2 focus:ring-gray-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-gray-600"
                />
                <label
                  htmlFor="disqualified"
                  className="ml-2 flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600 dark:text-gray-300"
                >
                  DisQualified <NoSymbolIcon className="h-4 w-4" />
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="qualified"
                  name="status"
                  type="radio"
                  value="qualified"
                  defaultChecked={student.status === "qualified"}
                  className="h-4 w-4 border-gray-300 bg-gray-100 text-gray-600 focus:ring-2 focus:ring-gray-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-gray-600"
                />
                <label
                  htmlFor="qualified"
                  className="ml-2 flex items-center gap-1.5 rounded-full bg-yellow-500 px-3 py-1.5 text-xs font-medium text-white dark:text-gray-300"
                >
                  Qualified <ClockIcon className="h-4 w-4" />
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="selected"
                  name="status"
                  type="radio"
                  value="selected"
                  defaultChecked={student.status === "selected"}
                  className="h-4 w-4 border-gray-300 bg-gray-100 text-gray-600 focus:ring-2 focus:ring-gray-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-gray-600"
                />
                <label
                  htmlFor="selected"
                  className="ml-2 flex items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white dark:text-gray-300"
                >
                  Selected <CheckIcon className="h-4 w-4" />
                </label>
              </div>
            </div>
          </div>
          <div>
            {state.errors?.status &&
              state.errors?.status.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </fieldset>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/students"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Submit</Button>
      </div>
    </form>
  );
};

export default EditStudentForm;
