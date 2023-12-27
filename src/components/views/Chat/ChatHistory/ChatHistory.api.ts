import { axiosInstance } from "@/utils/api";

export const getMessageThreads = () => {
  return axiosInstance.get("/thread").then((res) => res.data);
};

export const deleteThread = (id: string) => {
  return axiosInstance.delete(`/thread/${id}`).then((res) => res.data);
};
