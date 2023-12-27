import { EngineerSearchResult } from "../Chat.types";

export const prepareSuggestedRecords = (
  records: any[]
): EngineerSearchResult[] => {
  return records.map((record: any) => {
    return {
      ...record,
      id: record?.id,
      score: record?.score,
      ftAvailability: record?.metadata?.fullTimeAvailability ? "Yes" : "No",
      ptAvailability: record?.metadata?.partTimeAvailability ? "Yes" : "No",
      ftSalary: record?.metadata?.fullTimeSalary,
      ptSalary: record?.metadata?.partTimeSalary,
      skills: record?.metadata?.Skills?.join(", "),
      email: record?.email,
      name: record?.name,
    };
  });
};
