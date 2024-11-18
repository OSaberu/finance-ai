import { db } from "../_lib/prisma";

import { AddTransaction } from "../_components/ui/add-transaction";
import { currentUser } from "@clerk/nextjs/server";
import { DataTable } from "../_components/ui/data-table";
import { transactionColumns } from "./_columns";

const TransactionPage = async () => {
  const user = await currentUser();

  const transactions = await db.transaction.findMany({
    where: { userId: user?.id },
  });

  return (
    <div className="flex flex-col gap-6 px-8">
      <div className="mt-[21px] flex flex-row items-start justify-between">
        <div className="z-10 ml-[-7px] mt-[2px] h-auto w-auto text-2xl font-bold leading-[33.6px] text-white">
          Transações
        </div>

        <AddTransaction />
      </div>

      <DataTable columns={transactionColumns} data={transactions} />
    </div>
  );
};

export default TransactionPage;
