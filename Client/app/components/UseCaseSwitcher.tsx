import React from "react";
import { UseCaseSwitcherProps } from "../types";

export type UseCase = "suplimax" | "realEstate";

const baseButtonClass =
  "flex-1 py-3 px-4 text-sm font-medium text-center rounded-lg transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-sky-400";
const activeButtonClass = "bg-sky-600 text-white shadow-md";
const inactiveButtonClass = "bg-slate-700 text-slate-300 hover:bg-slate-600";

export const UseCaseSwitcher = ({
  currentUseCase,
  onUseCaseChange,
}: UseCaseSwitcherProps) => {
  return (
    <div
      className="flex space-x-2 p-1 bg-slate-900 rounded-lg shadow"
      role="tablist"
      aria-label="Select Use Case"
    >
      <button
        onClick={() => onUseCaseChange("suplimax")}
        className={`${baseButtonClass} ${
          currentUseCase === "suplimax"
            ? activeButtonClass
            : inactiveButtonClass
        }`}
      >
        Suplimax Marketing Video
      </button>
      <button
        onClick={() => onUseCaseChange("realEstate")}
        className={`${baseButtonClass} ${
          currentUseCase === "realEstate"
            ? activeButtonClass
            : inactiveButtonClass
        }`}
      >
        Real Estate Video Tour
      </button>
    </div>
  );
};

export default UseCaseSwitcher;
