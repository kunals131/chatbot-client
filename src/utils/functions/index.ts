import moment from "moment";

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

export function convertToRelativeTime(isoTime: string) {
  const postTime = moment(isoTime);
  const now = moment();

  const seconds = now.diff(postTime, "seconds");
  if (seconds < 60) {
    return `${seconds}s ago`;
  } else if (seconds < 3600) {
    const minutes = Math.floor(seconds / 60);
    return `${minutes}m ago`;
  } else if (seconds < 86400) {
    const hours = Math.floor(seconds / 3600);
    return `${hours}h ago`;
  } else {
    const days = Math.floor(seconds / 86400);
    return `${days}d ago`;
  }
}
