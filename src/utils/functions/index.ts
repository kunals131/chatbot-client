export const checkInputErrors = (valueObj: any) => {
  let errors: Record<string, string> = {};
  Object.keys(valueObj).forEach((key) => {
    if (!valueObj[key]) {
      errors[key] = `${key} is required`;
    }
  });
  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
};
