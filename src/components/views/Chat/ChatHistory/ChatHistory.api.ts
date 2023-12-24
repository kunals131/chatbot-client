import { axiosInstance } from "@/utils/api";

export const getMessageThreads = () => {
  return axiosInstance.get("/thread").then((res) => res.data);
};
