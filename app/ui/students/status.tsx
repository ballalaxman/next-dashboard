import {
  CheckIcon,
  ClockIcon,
  NoSymbolIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import React from "react";

const StudentStatus = ({ status }: { status: string }) => {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full px-2 py-1 text-xs",
        {
          "bg-gray-100 text-gray-500": status === "disqualified",
          "bg-yellow-300 text-gray-700": status === "qualified",
          "bg-green-500 text-white": status === "selected",
        }
      )}
    >
      {status === "disqualified" ? (
        <>
          Disqualified
          <NoSymbolIcon className="ml-1 w-4 text-gray-500" />
        </>
      ) : null}
      {status === "qualified" ? (
        <>
          Qualified
          <ClockIcon className="ml-1 w-4 text-gray-500" />
        </>
      ) : null}
      {status === "selected" ? (
        <>
          Selected
          <CheckIcon className="ml-1 w-4 text-white" />
        </>
      ) : null}
    </span>
  );
};

export default StudentStatus;
