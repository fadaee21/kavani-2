import { useCallback } from "react";
import { useAuth } from "./useAuth";
import Cookies from "js-cookie";
import { axiosInstance } from "@/services/axios";
import {jwtDecode} from "jwt-decode";
// import { getRole } from "@/helper/getRole";

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = useCallback(async () => {
    const refreshToken = Cookies.get("refreshToken");
    if (!refreshToken) throw new Error("No refresh token available");

    const response = await axiosInstance.post("/auths/refresh", { refresh_token: refreshToken });
    const { access_token: accessToken } = response.data.body;
    const userInfo = jwtDecode<MyJwtPayload>(accessToken);
console.log({userInfo})
    setAuth({
      user: userInfo.username,
      pwd: "",
      roles: userInfo.roles[0],
      accessToken,
    });

    return accessToken;
  }, [setAuth]);

  return refresh;
};

export default useRefreshToken;
