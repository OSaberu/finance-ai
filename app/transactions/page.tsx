import { db } from "../_lib/prisma";

import { ArrowDownUp, Circle } from "lucide-react";
import { Button } from "../_components/ui/button";

const TransactionPage = async () => {
  const transactions = await db.transaction.findMany({});

  const months = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  const translateType = (type: string) => {
    if (type === "DEPOSIT") {
      return (
        <div className="flex h-auto w-[69px] flex-row items-center justify-center gap-[7px] rounded-xl bg-green-600 bg-opacity-[0.08] px-2 py-[2px] text-green-600">
          <Circle fill="#38a169" stroke="0" width={12} height={12} />
          <span className="text-xs font-bold leading-[16.8px]">Ganho</span>
        </div>
      );
    }
    if (type === "EXPENSE") {
      return (
        <div className="flex h-auto w-[69px] flex-row items-center justify-center gap-[7px] rounded-xl bg-red-600 bg-opacity-[0.08] px-2 py-[2px] text-red-600">
          <Circle fill="#e53e3e" stroke="0" width={12} height={12} />
          <span className="text-xs font-bold leading-[16.8px]">Gasto</span>
        </div>
      );
    }
    if (type === "INVESTMENT") {
      return (
        <div className="flex h-auto min-w-[69px] max-w-[105px] flex-row items-center justify-center gap-[7px] rounded-xl bg-white bg-opacity-[0.08] px-2 py-[2px] text-white">
          <Circle fill="#ffffff" stroke="0" width={12} height={12} />
          <span className="text-xs font-bold leading-[16.8px]">
            Investimento
          </span>
        </div>
      );
    }
  };

  const translateCategory = (category: string) => {
    if (category === "HOUSING") {
      return "Moradia";
    }
    if (category === "TRANSPORTATION") {
      return "Transporte";
    }
    if (category === "FOOD") {
      return "Alimentação";
    }
    if (category === "ENTERTAINMENT") {
      return "Lazer";
    }
    if (category === "HEALTH") {
      return "Saúde";
    }
    if (category === "UTILITY") {
      return "Utilidade";
    }
    if (category === "SALARY") {
      return "Salário";
    }
    if (category === "EDUCATION") {
      return "Educação";
    }

    return "-";
  };

  const translatePaymentMethod = (paymentMethod: string) => {
    if (paymentMethod === "CREDIT_CARD") {
      return "Cartão de Crédito";
    }
    if (paymentMethod === "DEBIT_CARD") {
      return "Cartão de Débito";
    }
    if (paymentMethod === "BANK_TRANSFER") {
      return "Empréstimo";
    }
    if (paymentMethod === "BANK_SLIP") {
      return "Boleto";
    }
    if (paymentMethod === "CASH") {
      return "Dinheiro";
    }
    if (paymentMethod === "PIX") {
      return "Pix";
    }

    return "Outro";
  };

  const translateAmount = (amount: number) => {
    const finalAmount = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2, // Ensure two decimal places
      maximumFractionDigits: 2, // Ensure no more than two decimal places
    }).format(amount);

    return finalAmount;
  };

  const translateDate = (date: Date) => {
    let day = date.getDate().toString();
    if (day.length === 1) {
      day = `0${day}`;
    }

    const month = months[date.getMonth()];

    return `${day} de ${month} ${date.getFullYear()}`;
  };

  return (
    <div className="flex flex-col gap-6 px-8">
      <div className="mt-[21px] flex flex-row items-start justify-between">
        <div className="z-10 ml-[-7px] mt-[2px] h-auto w-auto text-2xl font-bold leading-[33.6px] text-white">
          Transações
        </div>

        <Button className="z-10 h-auto w-auto rounded-[100px] px-4 py-2">
          Adicionar Transação <ArrowDownUp size={4} />
        </Button>
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
            </div>
          ))}
      </div>
    </div>
  );
};

export default TransactionPage;
