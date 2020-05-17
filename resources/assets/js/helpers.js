export const formatDate = (date) => {
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    miniute: "2-digit",
  };
  return date.toLocaleString("en-EN", options);
};
