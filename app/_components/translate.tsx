import { Circle } from "lucide-react";

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

export const translateType = (type: string, stringOnly: boolean) => {
  if (stringOnly === true) {
    if (type === "DEPOSIT") {
      return "Ganho";
    }
    if (type === "EXPENSE") {
      return "Gasto";
    }
    if (type === "INVESTMENT") {
      return "Investimento";
    }
    if (type === "OTHER") {
      return "Selecione";
    }
  }

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
        <span className="text-xs font-bold leading-[16.8px]">Investimento</span>
      </div>
    );
  }
};

export const translateCategory = (category: string, other: string) => {
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
    return "Utilidades";
  }
  if (category === "SALARY") {
    return "Salário";
  }
  if (category === "EDUCATION") {
    return "Educação";
  }

  return other || "-";
};

export const translatePaymentMethod = (paymentMethod: string) => {
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

  return "Selecione";
};

export const translateAmount = (amount: number) => {
  const finalAmount = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2, // Ensure two decimal places
    maximumFractionDigits: 2, // Ensure no more than two decimal places
  }).format(amount);

  return finalAmount;
};

export const translateDate = (date: Date) => {
  let day = date.getDate().toString();
  if (day.length === 1) {
    day = `0${day}`;
  }

  const month = months[date.getMonth()];

  return `${day} de ${month} ${date.getFullYear()}`;
};
