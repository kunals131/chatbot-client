export const parseArrayValue = (value?: string) => {
  if (value) {
    try {
      return JSON.parse(value)?.join(",");
    } catch {
      return value;
    }
  }
  return "-";
};
