import { axiosInstance } from "@/utils/api";

export const fetchMessageData = (id: string) => {
  return axiosInstance.get(`/thread/message/${id}`).then((res) => res.data);
};
