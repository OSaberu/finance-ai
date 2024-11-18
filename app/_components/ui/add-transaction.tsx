"use client";

import { Button } from "./button";
import { ArrowDownUp } from "lucide-react";

export function AddTransaction() {
  return (
    <Button className="z-10 h-auto w-auto rounded-[100px] px-4 py-2">
      Adicionar Transação <ArrowDownUp size={4} />
    </Button>
  );
}
