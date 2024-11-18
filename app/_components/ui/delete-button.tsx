"use client";

import { Trash2 } from "lucide-react";
import React from "react";
import type { ButtonProps } from "./button";
export const handleDelete = async (id: string | undefined) => {
  const transactionData = {
    id: id,
  };
  try {
    const res = await fetch("/api/transaction", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(transactionData), // Send the form data as JSON
    });

    if (!res.ok) {
      throw new Error("Failed to delete transaction");
    }

    const data = await res.json();
    console.log("Transaction deleted:", data);
    // Optionally reset form or show success message
  } catch (error) {
    console.error("Error:", error);
  }

  window.location.reload();
};

export const DeleteButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ id }, ref) => {
    return (
      <button
        onClick={() => handleDelete(id)}
        type="button"
        ref={ref}
        className="h-4 w-4 border-transparent hover:text-red-500 active:text-red-600"
      >
        <Trash2 className="h-full w-full" />
      </button>
    );
  },
);
DeleteButton.displayName = "DeleteButton";
