import { axiosInstance } from "@/utils/api";
import { LoginApiPayload } from "./LoginForm.types";

export const loginUser = (data: LoginApiPayload) => {
  return axiosInstance.post("/auth/login", data).then((res) => res.data);
};
