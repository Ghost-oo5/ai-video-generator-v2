import { LoadingSpinnerProps } from "@/app/types";
import React from "react";

export const LoadingSpinner = ({ message }: LoadingSpinnerProps) => {
  return (
    <div className="flex flex-col justify-center items-center my-8 p-4 bg-slate-700/50 rounded-lg">
      <svg
        className="animate-spin h-12 w-12 text-sky-500"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
      {message && <p className="mt-3 text-slate-300 text-sm">{message}</p>}
      <span className="sr-only">Loading content...</span>
    </div>
  );
};
