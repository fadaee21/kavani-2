import CheckboxOne from "@/components/ui-kit/CheckBox";
import { LoadingSpinnerButton } from "@/components/ui-kit/LoadingSpinner";
import { useAuth } from "@/hooks/context/useAuth";
// import useLogin from "@/hooks/useLogin";
import { useEffect, useRef, useState } from "react";
import backgroundImage from "@/assets/images/flat-wall-concrete-with-black-hole-middle.png";
import backgroundImageMobile from "@/assets/images/flat-wall-concrete-with-black-hole-middle-mobile.png";
import kavaniLogo from "@/assets/images/kavani.png";
import ListBoxSelect from "@/components/ui-kit/ListBoxSelect";
import { LOGIN_ROLE } from "@/const/loginRole";
import { TextField } from "@/components/ui-kit/TextField";
import { PrimaryButtons } from "@/components/ui-kit/buttons/PrimaryButtons";
import useLogin from "@/hooks/useLogin";
import { ToastContainer } from "react-toastify";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [loginInfo, setLoginInfo] = useState({
    username: import.meta.env.VITE_APP_USERNAME || "",
    password: import.meta.env.VITE_APP_PASSWORD || "",
  });
  const [selectedRole, setSelectedRole] = useState<SelectedOption | null>(null);
  const { persist, setPersist } = useAuth();
  const userRef = useRef<HTMLInputElement>(null);

  useEffect(() => userRef.current?.focus(), []);

  const { handleSubmit, loading } = useLogin({
    ...loginInfo,
    role: selectedRole?.value,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoginInfo({
      ...loginInfo,
      [event.target.name]: event.target.value,
    });
  };

  const renderForm = () => (
    <form className="space-y-8 w-full" onSubmit={handleSubmit}>
      <div className="space-y-8">
        <TextField
          required
          autoComplete="off"
          ref={userRef}
          id="username"
          onChange={handleChange}
          state={loginInfo.username}
          placeholder="نام کاربری"
        />
        <TextField
          required
          autoComplete="off"
          type={showPassword ? "text" : "password"}
          id="password"
          onChange={handleChange}
          state={loginInfo.password}
          placeholder="رمز ورود"
          icon={showPassword ? eyeSlash : eye}
          onClick={() => setShowPassword(!showPassword)}
        />
        <ListBoxSelect
          items={LOGIN_ROLE}
          selected={selectedRole}
          setSelected={setSelectedRole}
          label=""
          placeholder="نوع کاربری"
          className="w-full my-5 text-sm"
        />
      </div>

      <PrimaryButtons
        type="submit"
        disabled={loading}
        className="rounded-3xl w-full"
      >
        {loading ? <LoadingSpinnerButton /> : "ورود"}
      </PrimaryButtons>
      <CheckboxOne
        isChecked={persist}
        onChange={() => setPersist(!persist)}
        label="مرا به خاطر بسپار"
      />
    </form>
  );

  return (
    <>
      <div
        className="md:flex items-center justify-center min-h-screen bg-cover bg-bottom bg-zinc-800 relative hidden "
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="absolute top-1/2 left-0 transform translate-x-1/2 -translate-y-1/2 scale-75 xl:scale-100">
          <img src={kavaniLogo} alt="kavani logo" />
        </div>
        <div className="w-1/2 flex items-end justify-center flex-col p-6 ml-auto rounded-md md:p-8">
          <div className="w-full max-w-sm mx-auto">
            <h2 className="my-4 font-[Cinema] text-2xl font-bold leading-9 tracking-tight text-center text-gray-50 sm:text-2xl md:text-4xl">
              ورود به حساب کاربری
            </h2>
          </div>
          <div className="w-full max-w-sm mx-auto">{renderForm()}</div>
        </div>
      </div>

      <div
        className="md:hidden items-center justify-start min-h-screen bg-no-repeat bg-contain bg-bottom bg-[#27282B] relative flex flex-col"
        style={{ backgroundImage: `url(${backgroundImageMobile})` }}
      >
        <div className="w-11/12 max-w-96 flex-col justify-center items-start gap-9 mt-16 inline-flex">
          {renderForm()}
        </div>
        <div className="transform scale-50 absolute left-1/2  -translate-x-1/2 translate-y-14 bottom-0  ">
          <img src={kavaniLogo} alt="kavani logo" />
        </div>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={2500}
        rtl
        className={"sm:w-96 w-full "}
      />
    </>
  );
}
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
