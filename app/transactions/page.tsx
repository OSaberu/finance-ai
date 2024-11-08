import { db } from "../_lib/prisma";

import { ExternalLink, Trash2 } from "lucide-react";
import { AddTransaction } from "../_components/ui/add-transaction";
import {
  translateAmount,
  translateCategory,
  translateDate,
  translatePaymentMethod,
  translateType,
} from "../_components/translate";

const TransactionPage = async () => {
  const transactions = await db.transaction.findMany({});

  return (
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
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
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
                {translateType(transaction.type)}
              </span>
              <span className="h-auto w-full gap-[10px] pb-4 pt-4 text-sm font-normal leading-[19.6px] text-white">
                {translateCategory(transaction.category)}
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
                <button
                  type="button"
                  className="h-4 w-4 border-transparent hover:text-gray-400 active:text-gray-200"
                >
                  <ExternalLink className="h-full w-full" />
                </button>

                <button
                  type="button"
                  className="h-4 w-4 border-transparent hover:text-red-500 active:text-red-600"
                >
                  <Trash2 className="h-full w-full" />
                </button>
              </span>
            </div>
          ))}
      </div>
    </div>
  );
};

export default TransactionPage;
