import React, { ChangeEvent, useState } from "react";
import AuthInput from "../AuthInput";
import { checkInputErrors } from "@/utils/functions";
import { AuthView } from "../Auth.types";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "./LoginForm.api";
import useAppStore from "@/store";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { LoginApiPayload } from "./LoginForm.types";
import { useRouter } from "next/router";

const LoginForm = ({ setAuthView }: Props) => {
  const [form, setForm] = useState<LoginApiPayload>({
    username: "",
    password: "",
  });
  const router = useRouter();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const setAuthData = useAppStore((state) => state.setAuthData);

  const { mutate: loginUserApi, isPending: loginUserLoading } = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      setAuthData(data);
      toast.success("Loggedin successfully!");
      router.push("/app");
    },
    onError: (err: AxiosError<any, any>) => {
      toast.error(err?.response?.data?.messaage || "Something went wrong!");
    },
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    const validation = checkInputErrors(form);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }
    loginUserApi(form);
  };
  return (
    <>
      <div className="text-3xl uppercase font-semibold">Login</div>
      <div className="mt-2 text-white/80">Welcome back to Mercor Chat</div>
      <div className="mt-8 w-[80%] space-y-5">
        <AuthInput
          onChange={handleInputChange}
          name="username"
          placeholder="Enter email"
          error={errors["username"]}
          label="Username / Email"
        />
        <AuthInput
          onChange={handleInputChange}
          name="password"
          placeholder="Enter Password"
          error={errors["password"]}
          label="Password"
          type="password"
        />
      </div>
      <div className="mt-8 flex items-center">
        <button
          onClick={handleSubmit}
          disabled={loginUserLoading}
          className="px-20 hover:bg-primary/60 hover:text-white transition-all font-[500] py-3 rounded-3xl bg-primary text-secondaryBgElevated"
        >
          {loginUserLoading ? "Loading..." : "Login"}
        </button>
      </div>
      <div className="mt-8 pl-2 space-y-1 text-sm ">
        <div className="opacity-70 hover:opacity-100 hover:underline cursor-pointer">
          Reset Password
        </div>
        <div
          onClick={() => setAuthView(AuthView.REGISTER)}
          className="opacity-70 hover:opacity-100 hover:underline cursor-pointer"
        >
          Create New Account
        </div>
      </div>
    </>
  );
};

type Props = {
  setAuthView: (view: AuthView) => void;
};

export default LoginForm;
