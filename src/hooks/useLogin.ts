import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "./context/useAuth";
import { loginInfoSchema } from "@/validator/loginInfoSchema";
import Cookies from "js-cookie";
import useSWRMutation from "swr/mutation";
import handleError from "@/validator/showError";
import { jwtDecode } from "jwt-decode";
import axiosPrivate from "@/services/axios";

type TLoginInfo = {
  username: string;
  password: string;
  role?: string; //FIXME: change this to correct role type
};

const fetcherPost = (url: string, { arg }: { arg: TLoginInfo }) =>
  axiosPrivate.post(url, arg).then((res) => res.data);

const useLogin = ({ password: pwd, username: user, role }: TLoginInfo) => {
  const navigate = useNavigate();
  const location = useLocation();
  const from =
    location.state?.from?.pathname || role === "KAVANI" || role === "KOL"
      ? "/kvn/registered-account"
      : "/kvn";

  const { setAuth } = useAuth();
  const { trigger, isMutating } = useSWRMutation("/panel/login", fetcherPost);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      loginInfoSchema.safeParse({ pwd, user, role });
      const response = await trigger({
        password: pwd,
        username: user,
        role,
      });
      if (response.is_successful) {
        const accessToken = response.body.access_token;
        const refreshToken = response.body.refresh_token;
        const userInfo = jwtDecode<MyJwtPayload>(accessToken);
        // console.log({ accessToken, refreshToken });
        console.log({ userInfo });
        Cookies.set("refreshToken", refreshToken, {
          path: "/",
          expires: 0.5,
          secure: false, //TODO: Set this to true once the SSL configuration has been successfully completed and verified.
          sameSite: "strict",
        });
        setAuth({
          user: userInfo.username,
          roles: userInfo.roles[0],
          accessToken,
          pwd: "",
        });
        navigate(from, { replace: true });
      }
    } catch (error) {
      handleError(error);

      // if (axios.isAxiosError(error)) {
      //   const { code, message } = error.response?.data.body || {};
      //   if (code === "3000") {
      //     setErrRes(["پسورد و یا رمز عبور اشتباه است"]);
      //   } else {
      //     setErrRes([message]);
      //   }
      // }
    }
  };

  return { handleSubmit, loading: isMutating };
};

export default useLogin;
