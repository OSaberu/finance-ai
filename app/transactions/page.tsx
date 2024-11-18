import { db } from "../_lib/prisma";

import { AddTransaction } from "../_components/ui/add-transaction";
import {
  translateAmount,
  translateCategory,
  translateDate,
  translatePaymentMethod,
  translateType,
} from "../_components/translate";
import { currentUser } from "@clerk/nextjs/server";
import { DeleteButton } from "../_components/ui/delete-button";
import { EditTransaction } from "../_components/ui/edit-transaction";
import { Dialog } from "../_components/ui/dialog";

export const handleClick = (id: string | undefined) => {
  const getTransaction = async (id: string | undefined) => {
    if (!id) {
      console.error("Transaction ID is required.");
      return;
    }

    try {
      const res = await fetch(`/api/transaction?id=${encodeURIComponent(id)}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error("Failed to get transaction");
      }

      const data = await res.json();
      console.log("Got transaction:", data);

      return data;
      // Optionally reset form or show success message
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const transaction = getTransaction(id).then((result) => {
    setTransactionMethod(result.paymentMethod);
    setTransactionType(result.type);
    setCategory(result.category);
    setAmount(result.amount);
    setName(result.name);
  });

  console.log(transaction);
};

const TransactionPage = async () => {
  const user = await currentUser();

  const userId = user?.id;

  const transactions = await db.transaction.findMany({
    where: { userId: user?.id },
  });

  const handleSetAmount = (event: { target: any }) => {
    const inputElement = event.target;
    const rawValue = inputElement.value.replace(/[^\d,]/g, ""); // Remove all non-numeric characters except comma

    // Save cursor position before update
    const cursorPosition = inputElement.selectionStart;

    // Check if the value is a valid number
    const numericValue = rawValue.replace(",", ".");
    const parsedValue = Number.parseFloat(numericValue);

    if (!Number.isNaN(parsedValue)) {
      setAmount(parsedValue);
    }

    // After the state has updated, restore the cursor position
    setTimeout(() => {
      inputElement.selectionStart = cursorPosition;
      inputElement.selectionEnd = cursorPosition;
    }, 0);
  };

  const handleSetName = (event: { target: { value: string } }) => [
    setName(event.target.value),
  ];

  return (
    <Dialog>
      <div className="flex flex-col gap-6 px-8">
        <div className="mt-[21px] flex flex-row items-start justify-between">
          <div className="z-10 ml-[-7px] mt-[2px] h-auto w-auto text-2xl font-bold leading-[33.6px] text-white">
            Transações
          </div>

          <AddTransaction />
        </div>

        <div className="flex w-full flex-col rounded-xl border border-white border-opacity-[0.08]">
          <div className="flex flex-row justify-between rounded-tl-[12px] rounded-tr-[12px] border-b border-white border-opacity-[0.08] bg-white bg-opacity-[0.03] pl-6">
            <span className="h-auto w-full gap-[10px] pb-4 pt-4 text-sm font-normal leading-[19.6px] text-white">
              Nome
            </span>
            <span className="h-auto w-full gap-[10px] pb-4 pt-4 text-sm font-normal leading-[19.6px] text-white">
              Tipo
            </span>
            <span className="h-auto w-full gap-[10px] pb-4 pt-4 text-sm font-normal leading-[19.6px] text-white">
              Categoria
            </span>
            <span className="h-auto w-full gap-[10px] pb-4 pt-4 text-sm font-normal leading-[19.6px] text-white">
              Método
            </span>
            <span className="h-auto w-full gap-[10px] pb-4 pt-4 text-sm font-normal leading-[19.6px] text-white">
              Data
            </span>
            <span className="h-auto w-full gap-[10px] pb-4 pt-4 text-sm font-normal leading-[19.6px] text-white">
              Valor
            </span>
          </div>

          {transactions
            .sort(
              (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime(),
            ) // Sort by date, newer to older
            .map((transaction, index, arr) => (
              <div
                key={transaction.name}
                className={`flex flex-row justify-between rounded-tl-[12px] rounded-tr-[12px] ${
                  index === arr.length - 1
                    ? ""
                    : "border-b border-white border-opacity-[0.08]"
                } pl-6`}
              >
                <span className="h-auto w-full gap-[10px] pb-4 pt-4 text-sm font-normal leading-[19.6px] text-white">
                  {transaction.name}
                </span>
                <span className="h-auto w-full gap-[10px] pb-4 pt-4 text-sm font-normal leading-[19.6px] text-white">
                  {translateType(transaction.type, false)}
                </span>
                <span className="h-auto w-full gap-[10px] pb-4 pt-4 text-sm font-normal leading-[19.6px] text-white">
                  {transaction.type === "EXPENSE"
                    ? translateCategory(transaction.category, "-")
                    : "-"}
                </span>
                <span className="h-auto w-full gap-[10px] pb-4 pt-4 text-sm font-normal leading-[19.6px] text-white">
                  {translatePaymentMethod(transaction.paymentMethod)}
                </span>
                <span className="h-auto w-full gap-[10px] pb-4 pt-4 text-sm font-normal leading-[19.6px] text-gray-500">
                  {translateDate(transaction.createdAt)}
                </span>
                <span className="h-auto w-full gap-[10px] pb-4 pt-4 text-sm font-normal leading-[19.6px] text-white">
                  {translateAmount(transaction.amount)}
                </span>
                <span className="flex h-auto w-auto flex-row items-center justify-center gap-6 px-6 py-3 text-gray-600">
                  <EditTransaction id={transaction.id} />

                  <DeleteButton id={transaction.id} />
                </span>
              </div>
            ))}
        </div>
      </div>
    </Dialog>
  );
};

export default TransactionPage;
