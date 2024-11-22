export const format = (date: Date) => {
  if (
    date.getMonth() === new Date().getMonth() &&
    date.getFullYear() === new Date().getFullYear()
  ) {
    if (date.getDate() === new Date().getDate() - 1) {
      return "Ontem";
    }
    if (date.getDate() === new Date().getDate()) {
      return "Hoje";
    }
  }

  const final = date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return final;
};
