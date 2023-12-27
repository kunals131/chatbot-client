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

export const readJson = (json?: any) => {
  try {
    const string = JSON.stringify(json);
    const response = JSON.parse(string);

    return JSON.stringify(response, null, " ");
  } catch (exception) {
    return "";
  }
};
