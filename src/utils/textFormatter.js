export const SplitWords = (str) =>
  str
    .split(" ")
    .filter((item) => !!item)
    .map((item) => item.charAt(0))
    .join("");
