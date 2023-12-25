import { axiosInstance } from "@/utils/api";
import { RegisterApiPayload } from "./RegisterForm.types";

export const registerUser = (data: RegisterApiPayload) => {
  return axiosInstance.post("/auth/register", data).then((res) => res.data);
};
