"use client";

import { Calendar, ChevronDown, Trash2, X } from "lucide-react";
import { Button } from "./button";
import { DialogClose, DialogContent, DialogTrigger } from "./dialog";
import {
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@radix-ui/react-dropdown-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import {
  translateAmount,
  translateCategory,
  translatePaymentMethod,
  translateType,
} from "../translate";
import { handleDelete } from "./delete-button";

export const EditContent = () => {
  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    setAddingTransaction(true);

    const transactionData = {
      name: name,
      type: transactionType,
      amount: amount,
      category: category,
      paymentMethod: transactionMethod,
      userId: userId,
    };
    try {
      const res = await fetch("/api/transaction", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(transactionData), // Send the form data as JSON
      });

      if (!res.ok) {
        throw new Error("Failed to create transaction");
      }

      const data = await res.json();
      console.log("Transaction created:", data);
      handleAddTransaction();
      // Optionally reset form or show success message
    } catch (error) {
      console.error("Error:", error);
    }

    setAddingTransaction(false);
    window.location.reload();
  };

  return (
    <DialogContent className="left-[48.65%] bg-transparent">
      <div className="h-screen w-screen -translate-x-1/2 -translate-y-1/2 bg-transparent pb-3 pt-6 backdrop-blur-sm">
        <div className="absolute bottom-[2%] right-[1%] z-20 flex h-[97%] w-[390px] min-w-[390px] max-w-[390px] transform flex-col items-center justify-start gap-6 rounded-[16px] bg-[#141414] p-5">
          <span className="w-full justify-end text-xl font-bold leading-6 text-white">
            Transação
            <DialogClose className="content-center items-center justify-center opacity-100 hover:text-red-600 hover:opacity-100 focus:outline-none focus:ring-0 focus:ring-ring focus:ring-offset-0">
              <X width={20} height={20} />
            </DialogClose>
          </span>

          <div className="h-auto w-full border border-white border-opacity-[0.03] bg-transparent" />

          <DropdownMenuLabel className="flex h-auto w-full flex-col gap-2 bg-transparent text-sm font-bold leading-[19.6px] text-white">
            Título
            <input
              value={name}
              onChange={handleSetName}
              className="h-10 w-full gap-2 rounded-xl border border-white border-opacity-[0.08] bg-transparent px-4 py-2 text-sm font-normal leading-[19.6px] text-white placeholder-gray-500"
              placeholder="Título"
            />
          </DropdownMenuLabel>
          <DropdownMenuLabel className="flex h-auto w-full flex-col gap-2 bg-transparent text-sm font-bold leading-[19.6px] text-white">
            Valor
            <input
              value={translateAmount(amount)}
              onChange={handleSetAmount}
              className="h-10 w-full gap-2 rounded-xl border border-white border-opacity-[0.08] bg-transparent px-4 py-2 text-sm font-normal leading-[19.6px] text-white placeholder-gray-500"
              placeholder="R$ 0.000,00"
            />
          </DropdownMenuLabel>

          <DropdownMenu>
            <DropdownMenuLabel className="flex h-auto w-full flex-col gap-2 bg-transparent text-sm font-bold leading-[19.6px] text-white">
              Tipo da transação
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  className="flex h-10 w-full flex-row items-center justify-between gap-2 rounded-xl border border-white border-opacity-[0.08] bg-transparent px-4 py-2 text-center text-sm font-normal leading-[19.6px] text-white"
                >
                  {translateType(transactionType, true)}
                  <ChevronDown />
                </button>
              </DropdownMenuTrigger>
            </DropdownMenuLabel>

            <DropdownMenuContent className="min-h-60 min-w-[385px] border-transparent bg-transparent">
              <DropdownMenuRadioGroup
                value={transactionType}
                onValueChange={setTransactionType}
                className="h-full w-auto justify-evenly gap-4 bg-transparent px-4 py-2 text-sm font-normal leading-[19.6px] text-white"
              >
                <DropdownMenuRadioItem
                  className="h-full w-full border border-white border-opacity-[0.08] bg-zinc-900 bg-opacity-80 px-7 py-2 text-center text-sm font-normal leading-[19.6px] text-white"
                  value="DEPOSIT"
                >
                  Ganho
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem
                  className="h-full w-full border border-white border-opacity-[0.08] bg-zinc-900 bg-opacity-80 px-7 py-2 text-center text-sm font-normal leading-[19.6px] text-white"
                  value="EXPENSE"
                >
                  Gasto
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem
                  className="h-full w-full border border-white border-opacity-[0.08] bg-zinc-900 bg-opacity-80 px-7 py-2 text-center text-sm font-normal leading-[19.6px] text-white"
                  value="INVESTMENT"
                >
                  Investimento
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuLabel className="flex h-auto w-full flex-col gap-2 bg-transparent text-sm font-bold leading-[19.6px] text-white">
              Método de pagamento
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  className="flex h-10 w-full flex-row items-center justify-between gap-2 rounded-xl border border-white border-opacity-[0.08] bg-transparent px-4 py-2 text-center text-sm font-normal leading-[19.6px] text-white"
                >
                  {translatePaymentMethod(transactionMethod)}
                  <ChevronDown />
                </button>
              </DropdownMenuTrigger>
            </DropdownMenuLabel>

            <DropdownMenuContent className="min-h-60 min-w-[385px] border-transparent bg-transparent">
              <DropdownMenuRadioGroup
                value={transactionMethod}
                onValueChange={setTransactionMethod}
                className="h-full w-auto justify-evenly gap-4 bg-transparent px-4 py-2 text-sm font-normal leading-[19.6px] text-white"
              >
                <DropdownMenuRadioItem
                  className="h-full w-full border border-white border-opacity-[0.08] bg-zinc-900 bg-opacity-80 px-7 py-2 text-center text-sm font-normal leading-[19.6px] text-white"
                  value="CREDIT_CARD"
                >
                  Cartão de Crédito
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem
                  className="h-full w-full border border-white border-opacity-[0.08] bg-zinc-900 bg-opacity-80 px-7 py-2 text-center text-sm font-normal leading-[19.6px] text-white"
                  value="DEBIT_CARD"
                >
                  Cartão de Débito
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem
                  className="h-full w-full border border-white border-opacity-[0.08] bg-zinc-900 bg-opacity-80 px-7 py-2 text-center text-sm font-normal leading-[19.6px] text-white"
                  value="BANK_TRANSFER"
                >
                  Empréstimo
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem
                  className="h-full w-full border border-white border-opacity-[0.08] bg-zinc-900 bg-opacity-80 px-7 py-2 text-center text-sm font-normal leading-[19.6px] text-white"
                  value="BANK_SLIP"
                >
                  Boleto
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem
                  className="h-full w-full border border-white border-opacity-[0.08] bg-zinc-900 bg-opacity-80 px-7 py-2 text-center text-sm font-normal leading-[19.6px] text-white"
                  value="PIX"
                >
                  Pix
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem
                  className="h-full w-full border border-white border-opacity-[0.08] bg-zinc-900 bg-opacity-80 px-7 py-2 text-center text-sm font-normal leading-[19.6px] text-white"
                  value="CASH"
                >
                  Dinheiro
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          {transactionType === "EXPENSE" && (
            <DropdownMenu>
              <DropdownMenuLabel className="flex h-auto w-full flex-col gap-2 bg-transparent text-sm font-bold leading-[19.6px] text-white">
                Categoria
                <DropdownMenuTrigger asChild>
                  <button
                    type="button"
                    className="flex h-10 w-full flex-row items-center justify-between gap-2 rounded-xl border border-white border-opacity-[0.08] bg-transparent px-4 py-2 text-center text-sm font-normal leading-[19.6px] text-white"
                  >
                    {translateCategory(category, "Selecione")}
                    <ChevronDown />
                  </button>
                </DropdownMenuTrigger>
              </DropdownMenuLabel>

              <DropdownMenuContent className="min-h-60 min-w-[385px] border-transparent bg-transparent">
                <DropdownMenuRadioGroup
                  value={category}
                  onValueChange={setCategory}
                  className="h-full w-auto justify-evenly gap-4 bg-transparent px-4 py-2 text-sm font-normal leading-[19.6px] text-white"
                >
                  <DropdownMenuRadioItem
                    className="h-full w-full border border-white border-opacity-[0.08] bg-zinc-900 bg-opacity-80 px-7 py-2 text-center text-sm font-normal leading-[19.6px] text-white"
                    value="HOUSING"
                  >
                    Moradia
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem
                    className="h-full w-full border border-white border-opacity-[0.08] bg-zinc-900 bg-opacity-80 px-7 py-2 text-center text-sm font-normal leading-[19.6px] text-white"
                    value="TRANSPORTATION"
                  >
                    Transporte
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem
                    className="h-full w-full border border-white border-opacity-[0.08] bg-zinc-900 bg-opacity-80 px-7 py-2 text-center text-sm font-normal leading-[19.6px] text-white"
                    value="FOOD"
                  >
                    Alimentação
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem
                    className="h-full w-full border border-white border-opacity-[0.08] bg-zinc-900 bg-opacity-80 px-7 py-2 text-center text-sm font-normal leading-[19.6px] text-white"
                    value="ENTERTAINMENT"
                  >
                    Lazer
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem
                    className="h-full w-full border border-white border-opacity-[0.08] bg-zinc-900 bg-opacity-80 px-7 py-2 text-center text-sm font-normal leading-[19.6px] text-white"
                    value="HEALTH"
                  >
                    Saúde
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem
                    className="h-full w-full border border-white border-opacity-[0.08] bg-zinc-900 bg-opacity-80 px-7 py-2 text-center text-sm font-normal leading-[19.6px] text-white"
                    value="UTILITY"
                  >
                    Utilidades
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem
                    className="h-full w-full border border-white border-opacity-[0.08] bg-zinc-900 bg-opacity-80 px-7 py-2 text-center text-sm font-normal leading-[19.6px] text-white"
                    value="SALARY"
                  >
                    Salário
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem
                    className="h-full w-full border border-white border-opacity-[0.08] bg-zinc-900 bg-opacity-80 px-7 py-2 text-center text-sm font-normal leading-[19.6px] text-white"
                    value="EDUCATION"
                  >
                    Educação
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem
                    className="h-full w-full border border-white border-opacity-[0.08] bg-zinc-900 bg-opacity-80 px-7 py-2 text-center text-sm font-normal leading-[19.6px] text-white"
                    value="OTHER"
                  >
                    Outro
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          <DropdownMenuLabel className="flex h-auto w-full flex-col gap-2 bg-transparent text-sm font-bold leading-[19.6px] text-white">
            Data
            <div className="flex h-10 w-full flex-row items-center justify-start gap-2 rounded-xl border border-white border-opacity-[0.08] bg-transparent px-4 py-2 text-center text-sm font-normal leading-[19.6px] text-white placeholder-gray-500">
              <Calendar size={16} />
              {date}
            </div>
          </DropdownMenuLabel>

          <div className="h-auto w-full justify-end gap-5 px-5">
            <button
              type="button"
              onClick={() => handleDelete(id)}
              className="flex h-auto w-auto flex-row gap-2 rounded-[8px] px-3 py-1 text-xs font-bold leading-[16.8px] text-red-500 duration-150 hover:text-red-400"
            >
              Deletar Transação
              <Trash2 width={16} height={16} />
            </button>
          </div>

          <div className="h-full w-full content-end justify-end">
            <div className="flex h-auto w-full flex-row justify-between gap-3">
              <DialogTrigger asChild>
                <Button
                  type="reset"
                  className="h-auto w-full gap-2 rounded-xl bg-zinc-900 px-4 py-2 hover:bg-zinc-800"
                >
                  Cancelar
                </Button>
              </DialogTrigger>

              <Button
                disabled={
                  name === "" ||
                  amount <= 0 ||
                  transactionType === "OTHER" ||
                  transactionMethod === "OTHER" ||
                  addingTransaction === true
                }
                type="submit"
                onClick={handleSubmit}
                className="h-auto w-full gap-2 rounded-xl bg-green-600 px-4 py-2 hover:bg-green-500 disabled:pointer-events-none disabled:opacity-60"
              >
                Salvar
              </Button>
            </div>
          </div>
        </div>
      </div>
    </DialogContent>
  );
};
