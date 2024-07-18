import { useState } from "react";
import { mutate } from "swr";
import { TextField } from "@/components/login/TextField";
import { PrimaryButtons } from "@/components/ui-kit/buttons/PrimaryButtons";
import axiosPrivate from "@/services/axios";
import ReturnButton from "@/components/ui-kit/buttons/ReturnButton";
import { toast } from "react-toastify";
import router from "@/routes";
import axios from "axios";
import ListBoxSelect from "@/components/ui-kit/select-box/ListBoxSelect";
import { ACTIVITIES_FIELD } from "@/const/registerNewUser";
import { personPaymentSchema } from "@/validator/personPaymentSchema";
import alertErr from "@/validator/showError";

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
        router.navigate("/superuser/registered-account");
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
    <div className="max-w-xl mx-auto p-4 my-3 bg-white border border-gray-300 rounded-lg shadow-sm md:p-6 dark:border-gray-700 dark:bg-gray-800">
      <div className="flex justify-between items-center mb-4">
        <p className="text-lg font-semibold">ثبت جدید</p>
        <ReturnButton />
      </div>
      <div className="flex flex-col justify-start items-start w-full">
        <TextField
          id="name"
          placeholder="نام"
          label="نام"
          onChange={handleChange}
          state={personPayment.name}
        />
        <div className="w-full my-5">
          <TextField
            id="lastName"
            placeholder="نام خانوادگی"
            label="نام خانوادگی"
            onChange={handleChange}
            state={personPayment.lastName}
          />
        </div>
        <div className="w-full mb-5">
          <TextField
            id="amount"
            placeholder="مبلغ"
            label="مبلغ"
            onChange={handleChange}
            state={personPayment.amount}
          />
        </div>
        <TextField
          id="mobile"
          placeholder="شماره تماس"
          label="شماره تماس"
          onChange={handleChange}
          state={personPayment.mobile}
        />
        <ListBoxSelect
          items={ACTIVITIES_FIELD}
          selected={selected}
          setSelected={setSelected}
          label="نوع فعالیت"
          placeholder="انتخاب نوع فعالیت"
          className="w-full my-5"
        />
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 sm:space-x-4 w-full">
          <PrimaryButtons
            onClick={registerNewPerson}
            fullWidth
            className="my-10"
            disabled={disableButton}
          >
            ثبت
          </PrimaryButtons>
        </div>
      </div>
    </div>
  );
};

export default NewRegister;
