export const truncateLabel = (label: string, wordsSize: number) => {
  const words = label.split(" ");
  return words.length > 3 ? `${words.slice(0, wordsSize).join(" ")}...` : label;
};
