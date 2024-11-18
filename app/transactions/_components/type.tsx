import { Circle } from "lucide-react";

export const componentDeposit = () => {
  return (
    <div className="flex h-auto w-[69px] flex-row items-center justify-between rounded-full bg-green-500 bg-opacity-[0.08] px-2 text-xs font-bold leading-[16.8px] text-green-500">
      <Circle width={8} height={8} className="fill-green-500" />
      <span>Ganho</span>
    </div>
  );
};

export const componentExpense = () => {
  return (
    <div className="flex h-auto w-[65px] flex-row items-center justify-between rounded-full bg-red-600 bg-opacity-[0.08] px-2 text-xs font-bold leading-[16.8px] text-red-600">
      <Circle width={8} height={8} className="fill-red-600" />
      <span>Gasto</span>
    </div>
  );
};

export const componentInvestment = () => {
  return (
    <div className="flex h-auto w-[105px] flex-row items-center justify-between rounded-full bg-white bg-opacity-[0.08] px-2 text-xs font-bold leading-[16.8px] text-white">
      <Circle width={8} height={8} className="fill-white" />
      <span>Investimento</span>
    </div>
  );
};
