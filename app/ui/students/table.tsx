import { fetchFilteredStudents } from "@/app/lib/data";
import StudentStatus from "./status";
import { DeleteStudent, UpdateStudent } from "./buttons";

export default async function StudentsInfoTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const students = await fetchFilteredStudents(query, currentPage);
  return (
    <div className="w-full">
      <div className="mt-6 flow-root">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden rounded-md bg-gray-50 p-2 md:pt-0">
              <div className="md:hidden">
                {students?.map((student) => (
                  <div
                    key={student.id}
                    className="mb-2 w-full rounded-md bg-white p-4"
                  >
                    <div className="flex items-center justify-between border-b pb-4">
                      <div>
                        <div className="mb-2 flex items-center">
                          <p>{student.name}</p>
                        </div>
                        <p className="text-sm text-gray-500">
                          {student.class_std}
                        </p>
                      </div>
                      <StudentStatus status={student.status} />
                    </div>
                    <div className="flex w-full items-center justify-between border-b py-5">
                      <div className="flex w-1/2 flex-col">
                        <p className="text-xs">School</p>
                        <p className="font-medium">{student.school}</p>
                      </div>
                      <div className="flex w-1/2 flex-col items-end">
                        <p className="text-xs">Village</p>
                        <p className="font-medium">{student.village}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <table className="hidden min-w-full rounded-md text-gray-900 md:table">
                <thead className="rounded-md bg-gray-50 text-left text-sm font-normal">
                  <tr>
                    <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                      Name
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Class
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      School
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Village
                    </th>
                    <th scope="col" className="px-4 py-5 font-medium">
                      Status
                    </th>
                    <th scope="col" className="px-4 py-5 font-medium">
                      Contact
                    </th>
                    <th scope="col" className="relative py-3 pl-6 pr-3">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>

                <tbody className="bg-white">
                  {students.map((student) => (
                    <tr
                      key={student.id}
                      className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                    >
                      <td className="whitespace-nowrap bg-white py-5 pl-4 pr-3 text-sm text-black group-first-of-type:rounded-md group-last-of-type:rounded-md sm:pl-6">
                        <p>{student.name}</p>
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {student.class_std}
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {student.school}
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {student.village}
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm group-first-of-type:rounded-md group-last-of-type:rounded-md">
                        <StudentStatus status={student.status} />
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {student.contact}
                      </td>
                      <td className="whitespace-nowrap py-3 pl-6 pr-3">
                        <div className="flex justify-end gap-3">
                          <UpdateStudent id={student.id} />
                          <DeleteStudent id={student.id} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
