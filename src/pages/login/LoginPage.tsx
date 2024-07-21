import { TextFieldLogin } from "@/components/login/TextFieldLogin";
import CheckboxOne from "@/components/ui-kit/CheckBox";
import { LoadingSpinnerButton } from "@/components/ui-kit/LoadingSpinner";
// import MySwitch from "@/components/ui-kit/MySwitch";
import { PrimaryButtonsLogin } from "@/components/ui-kit/buttons/PrimaryButtonsLogin";
import { useAuth } from "@/hooks/context/useAuth";
import useLogin from "@/hooks/useLogin";
import { useEffect, useRef, useState } from "react";

// Import the background image
import backgroundImage from "@/assets/images/flat-wall-concrete-with-black-hole-middle.png";
import kavaniLogo from "@/assets/images/kavani.png";
import ListBoxSelectLogin from "@/components/ui-kit/select-box/ListBoxSelectLogin";
import { LOGIN_ROLE } from "@/const/loginRole";

export default function LoginPage() {
  const { setAuth } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [loginInfo, setLoginInfo] = useState({
    username: import.meta.env.VITE_APP_USERNAME || "",
    password: import.meta.env.VITE_APP_PASSWORD || "",
  });
  const [selected, setSelected] = useState<SelectedOption | null>(null);
  const { persist, setPersist } = useAuth();
  const userRef = useRef<HTMLInputElement>(null);

  useEffect(() => userRef.current?.focus(), []);

  useEffect(() => {
    setAuth((i: any) => {
      return {
        ...i,
        roles: selected?.value,
      };
    });
  }, [selected]);

  const { errRes, handleSubmit, loading } = useLogin({...loginInfo,role:selected?.value});

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoginInfo({
      ...loginInfo,
      [event.target.name]: event.target.value,
    });
  };

  const eye = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
      />
    </svg>
  );

  const eyeSlash = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
      />
    </svg>
  );

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center bg-[#27282B] relative"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="absolute top-1/2 left-0 transform translate-x-1/2 -translate-y-1/2 ">
        <img src={kavaniLogo} alt="kavani logo" />
      </div>
      {/* <div
        className="absolute top-0 right-0 "
        style={{ backgroundImage: `url(${kavaniLogo})` }}
        aria-hidden="true"
      ></div> */}
      <div className="w-1/2 flex items-end justify-center flex-col p-6 ml-auto rounded-md md:p-8">
        <div className="w-full max-w-sm mx-auto">
          {/* <img
            className="w-auto h-12 mx-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          /> */}
          <h2 className="mt-10 font-[Cinema] text-2xl font-bold leading-9 tracking-tight text-center text-gray-50 sm:text-2xl xl:text-3xl">
            ورود به حساب کاربری
          </h2>
        </div>

        <div className="w-full max-w-sm mx-auto">
          <form className="space-y-8" onSubmit={handleSubmit}>
            <div className="space-y-8">
              <TextFieldLogin
                required
                autoComplete="off"
                ref={userRef}
                id="username"
                onChange={handleChange}
                state={loginInfo.username}
                placeholder="نام کاربری"
                label=""
              />
              <TextFieldLogin
                required
                autoComplete="off"
                type={showPassword ? "text" : "password"}
                id="password"
                onChange={handleChange}
                state={loginInfo.password}
                label=""
                placeholder="رمز ورود"
                icon={showPassword ? eyeSlash : eye}
                onClick={() => setShowPassword(!showPassword)}
              />
              <ListBoxSelectLogin
                items={LOGIN_ROLE}
                selected={selected}
                setSelected={setSelected}
                label=""
                placeholder="نوع کاربری"
                className="w-full my-5"
              />
            </div>

            <PrimaryButtonsLogin type="submit" disabled={loading} fullWidth>
              {loading ? <LoadingSpinnerButton /> : "ورود"}
            </PrimaryButtonsLogin>
            <CheckboxOne
              isChecked={persist}
              onChange={() => setPersist(!persist)}
              label="مرا به خاطر بسپار"
            />
          </form>
          {errRes && errRes.length > 0 ? (
            <ul className="p-2 mt-4 text-xs font-medium list-disc list-inside rounded-lg shadow-sm max-h-16 bg-rose-50 dark:bg-rose-950">
              {errRes.map((error, index) => (
                <li className="text-rose-950 dark:text-rose-50" key={index}>
                  {error}
                </li>
              ))}
            </ul>
          ) : (
            <div className="w-full h-10 mt-1" />
          )}
        </div>
      </div>
    </div>
  );
}
