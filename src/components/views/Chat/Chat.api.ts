import { axiosInstance } from "@/utils/api";
import { AddMessageToThreadPayload } from "./Chat.types";

export const getThreadMessages = (threadId: string) => {
  return axiosInstance.get(`/thread/${threadId}`).then((res) => res.data);
};

export const addMessageToThread = (data: AddMessageToThreadPayload) => {
  return axiosInstance.post("/thread/message", data).then((res) => res.data);
};
