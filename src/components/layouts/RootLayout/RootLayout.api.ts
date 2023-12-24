import { axiosInstance } from "@/utils/api";

export const verifyAuth = () => {
  return axiosInstance.post("/auth/verify-auth");
};
