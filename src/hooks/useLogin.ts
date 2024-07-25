import alertErr from "@/validator/showError";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "./context/useAuth";
import { loginInfoSchema } from "@/validator/loginInfoSchema";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { axiosInstance } from "@/services/axios";
import axios from "axios";

type TLoginInfo = {
  username: string;
  password: string;
  role?: string; //FIXME: change this to correct role type
};
const useLogin = ({ password: pwd, username: user, role }: TLoginInfo) => {
  const [errRes, setErrRes] = useState<string[]>();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from =
    location.state?.from?.pathname || role === "KAVANI" || role === "KOL"
      ? "/kvn/registered-account"
      : "/kvn";

  const { setAuth } = useAuth();
  useEffect(() => {
    setErrRes([]);
  }, [pwd, user]);
  console.log({ role });
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    try {
      loginInfoSchema.safeParse({ pwd, user, role });
      const response = await axiosInstance.post("/panel/login", {
        password: pwd,
        username: user,
        role,
      });
      // console.log(response);
      if (response.status === 200) {
        const accessToken = response.data.body.access_token;
        const refreshToken = response.data.body.refresh_token;
        const userInfo = jwtDecode<MyJwtPayload>(accessToken);
        Cookies.set("refreshToken", refreshToken, {
          path: "/",
          expires: 0.5,
          secure: false, //TODO: Set this to true once the SSL configuration has been successfully completed and verified.
          sameSite: "strict",
        });
        console.log({ userInfo });
        setAuth({
          user: userInfo.username,
          roles: userInfo.roles[0],
          accessToken,
          pwd: "",
        });
        navigate(from, { replace: true });
      }
      console.log(response.status);

      setErrRes([]);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const { code, message } = error.response?.data.body || {};
        if (code === "3000") {
          setErrRes(["پسورد و یا رمز عبور اشتباه است"]);
        } else {
          setErrRes([message]);
        }
      } else {
        const err = alertErr(error);
        setErrRes(err); //TODO: i need the helper function to handle errors from server as its schema, no just show error from ZOD validation and wrong password
        setTimeout(() => setErrRes([]), 6000);
      }
    } finally {
      setLoading(false);
    }
  };

  return { errRes, handleSubmit, loading };
};

export default useLogin;
