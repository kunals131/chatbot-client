import { axiosInstance } from "@/utils/api";

export const verifyAuth = () => {
  return axiosInstance.get("/auth/verify-auth");
};
