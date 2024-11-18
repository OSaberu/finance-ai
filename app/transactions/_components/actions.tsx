import { PencilIcon, Trash2Icon } from "lucide-react";

export const componentActions = () => {
  return (
    <div className="flex h-auto w-auto flex-row items-center gap-6 px-6 text-gray-500">
      <button type="button" className="duration-300 hover:text-white">
        <PencilIcon size={16} />
      </button>

      <button type="button" className="duration-300 hover:text-red-500">
        <Trash2Icon size={16} />
      </button>
    </div>
  );
};
