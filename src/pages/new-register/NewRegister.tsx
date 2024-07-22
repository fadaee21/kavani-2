import { useState } from "react";
import { mutate } from "swr";
import axiosPrivate from "@/services/axios";
import { toast } from "react-toastify";
import router from "@/routes";
import axios from "axios";
import { ACTIVITIES_FIELD } from "@/const/registerNewUser";
import { personPaymentSchema } from "@/validator/personPaymentSchema";
import alertErr from "@/validator/showError";
import { TextFieldLogin } from "@/components/login/TextFieldLogin";
import ListBoxSelectLogin from "@/components/ui-kit/select-box/ListBoxSelectLogin";
import { PrimaryButtonsLogin } from "@/components/ui-kit/buttons/PrimaryButtonsLogin";
import ReturnButtonLogin from "@/components/ui-kit/buttons/ReturnButtonLogin";

const NewRegister = () => {
  const origin = typeof window !== "undefined" && window.location.origin;
  const callBackUrl = `${origin}/success-payment`;

  const [selected, setSelected] = useState<SelectedOption | null>(null);
  const [personPayment, setPersonPayment] = useState({
    name: "",
    lastName: "",
    mobile: "",
    amount: "",
    callBackUrl,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPersonPayment({
      ...personPayment,
      [event.target.name]: event.target.value,
    });
  };

  const registerNewPerson = async () => {
    try {
      const validatedData = personPaymentSchema.parse(personPayment);
      const res = await axiosPrivate.post("/panel/accounts/add", {
        ...validatedData,
        aa: selected?.value,
        // TODO:change aa KEY
      });
      if (res.status === 200) {
        mutate(`/panel/banner/get/all/0/100`);
        toast.success("ثبت با موفقیت انجام شد");
        router.navigate("/kvn/registered-account");
      } else {
        toast.error("مشکلی پیش آمد، دوباره تلاش کنید");
      }
      // console.log(res.data);
    } catch (error) {
      const err = alertErr(error);
      console.log({ err });
      toast.error(err?.[0]);
      if (axios.isAxiosError(error)) {
        const { code } = error.response?.data.body || {};
        if (code === "10") {
          toast.error("کاربری با این مشخصات وجود دارد");
          return;
        }
        toast.error("مشکلی پیش آمد، دوباره تلاش کنید");
      }
    }
  };
  const disableButton =
    Object.values(personPayment).some((value) => value === "") || !selected;
  return (
    <div className="max-w-xl mx-auto  scale-90 p-4  border  rounded-lg shadow-sm md:p-6 border-gray-700 bg-gray-800">
      <div className="flex justify-between items-center mb-4">
        <p className="text-lg font-semibold">ثبت نام</p>
        <ReturnButtonLogin />
      </div>
      <div className="flex flex-col justify-start items-start w-full">
        <TextFieldLogin
          id="name"
          placeholder="نام"
          label=""
          onChange={handleChange}
          state={personPayment.name}
        />
        <div className="w-full my-5">
          <TextFieldLogin
            id="lastName"
            placeholder="نام خانوادگی"
            label=""
            onChange={handleChange}
            state={personPayment.lastName}
          />
        </div>
        <div className="w-full mb-5">
          <TextFieldLogin
            id="amount"
            placeholder="مبلغ"
            label=""
            onChange={handleChange}
            state={personPayment.amount}
          />
        </div>
        <TextFieldLogin
          id="mobile"
          placeholder="شماره تماس"
          label=""
          onChange={handleChange}
          state={personPayment.mobile}
        />
        <ListBoxSelectLogin
          items={ACTIVITIES_FIELD}
          selected={selected}
          setSelected={setSelected}
          label=""
          placeholder="انتخاب نوع فعالیت"
          className="w-full my-5"
        />
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 sm:space-x-4 w-full">
          <PrimaryButtonsLogin
            onClick={registerNewPerson}
            fullWidth
            className="my-10"
            disabled={disableButton}
          >
            ثبت
          </PrimaryButtonsLogin>
        </div>
      </div>
    </div>
  );
};

export default NewRegister;
