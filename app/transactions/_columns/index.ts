"use client";

import { TransactionType, type Transaction } from "@prisma/client";
import type { ColumnDef } from "@tanstack/react-table";
import {
  componentDeposit,
  componentExpense,
  componentInvestment,
} from "../_components/type";
import { componentDate } from "../_components/date";
import { componentActions } from "../_components/actions";
import {
  TRANSACTION_CATEGORY_LABELS,
  TRANSACTION_PAYMENT_METHOD_LABELS,
} from "@/app/_constants/transactions";

export const transactionColumns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "type",
    header: "Tipo",
    cell: ({ row: { original: transaction } }) => {
      if (transaction.type === TransactionType.DEPOSIT) {
        return componentDeposit();
      }
      if (transaction.type === TransactionType.EXPENSE) {
        return componentExpense();
      }
      if (transaction.type === TransactionType.INVESTMENT) {
        return componentInvestment();
      }
    },
  },
  {
    accessorKey: "category",
    header: "Categoria",
    cell: ({ row: { original: transaction } }) => {
      if (transaction.type !== TransactionType.EXPENSE) {
        return "-";
      }
      return TRANSACTION_CATEGORY_LABELS[transaction.category];
    },
  },
  {
    accessorKey: "paymentMethod",
    header: "Método",
    cell: ({ row: { original: transaction } }) => {
      return TRANSACTION_PAYMENT_METHOD_LABELS[transaction.paymentMethod];
    },
  },
  {
    accessorKey: "date",
    header: "Data",
    cell: ({ row: { original: transaction } }) => {
      return componentDate(transaction.createdAt);
    },
  },
  {
    accessorKey: "amount",
    header: "Valor",
    cell: ({ row: { original: transaction } }) => {
      return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
        minimumFractionDigits: 2, // Ensure two decimal places
        maximumFractionDigits: 2, // Ensure no more than two decimal places
      }).format(Number(transaction.amount));
    },
  },
  {
    accessorKey: "actions",
    header: "",
    cell: () => {
      return componentActions();
    },
  },
];
