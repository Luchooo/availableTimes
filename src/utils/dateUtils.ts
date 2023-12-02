export const getFmHour = (dateMs: number): string => {
  const date = new Date(dateMs);
  const hours = date.getHours();
  const minutes = date.getMinutes();

  return `${hours}:${minutes < 10 ? "0" : ""}${minutes}`;
};
