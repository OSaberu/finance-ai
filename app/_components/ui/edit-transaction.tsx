"use client";

import type { ButtonProps } from "./button";
import { ExternalLink } from "lucide-react";
import React from "react";
import { DialogTrigger } from "./dialog";
import { handleClick } from "@/app/transactions/page";

export const EditTransaction = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ id }) => {
    return (
      <DialogTrigger asChild>
        <button
          type="button"
          onClick={() => handleClick(id)}
          className="h-4 w-4 border-transparent hover:text-gray-400 active:text-gray-200"
        >
          <ExternalLink className="h-full w-full" />
        </button>
      </DialogTrigger>
    );
  },
);
EditTransaction.displayName = "EditTransaction";
