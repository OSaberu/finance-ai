export const componentDate = (date: Date) => {
  return (
    <span className="text-gray-600">
      {date.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })}
    </span>
  );
};
