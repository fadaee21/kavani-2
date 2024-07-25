import { useState } from "react";
// import { mutate } from "swr";
import axiosPrivate from "@/services/axios";
import { toast } from "react-toastify";
import router from "@/routes";
import axios from "axios";
import { ACTIVITIES_FIELD } from "@/const/registerNewUser";
import { personPaymentSchema } from "@/validator/personPaymentSchema";
import alertErr from "@/validator/showError";
import { TextField } from "@/components/ui-kit/TextField";
import ListBoxSelect from "@/components/ui-kit/ListBoxSelect";
import { PrimaryButtons } from "@/components/ui-kit/buttons/PrimaryButtons";
import ReturnButton from "@/components/ui-kit/buttons/ReturnButton";
import { LoadingSpinnerButton } from "@/components/ui-kit/LoadingSpinner";

const NewRegister = () => {
  const origin = typeof window !== "undefined" && window.location.origin;
  const callBackUrl = `${origin}/success-payment`;
  const [selected, setSelected] = useState<SelectedOption | null>(null);
  const [loading, setLoading] = useState(false);
  const [personPayment, setPersonPayment] = useState({
    name: "",
    lastName: "",
    mobile: "",
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
      setLoading(true);
      const validatedData = personPaymentSchema.parse(personPayment);
      const res = await axiosPrivate.post("/panel/accounts/add", {
        ...validatedData,
        accountActivityType: selected?.value,
      });
      if (res.status === 200) {
        // mutate(`/panel/banner/get/all/0/100`);
        toast.success("پیامک به زودی برای کاربر ارسال میشود");
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
    } finally {
      setLoading(false);
    }
  };
  const disableButton =
    Object.values(personPayment).some((value) => value === "") || !selected;
  return (
    <div className="max-w-xl mx-auto  scale-90 p-4  border  rounded-lg shadow-sm md:p-6 border-gray-700 bg-gray-800">
      <div className="flex justify-between items-center mb-4">
        <p className="text-lg font-semibold">ثبت نام</p>
        <ReturnButton />
      </div>

      <div className="flex flex-col justify-start items-start w-full space-y-5 my-10">
        <TextField
          id="name"
          placeholder="نام"
          onChange={handleChange}
          state={personPayment.name}
          inputClass="w-full"
        />
        <TextField
          id="lastName"
          placeholder="نام خانوادگی"
          onChange={handleChange}
          state={personPayment.lastName}
          inputClass="w-full"
        />
        <TextField
          id="mobile"
          placeholder="موبایل"
          onChange={handleChange}
          state={personPayment.mobile}
        />
        <ListBoxSelect
          items={ACTIVITIES_FIELD}
          selected={selected}
          setSelected={setSelected}
          placeholder="انتخاب نوع فعالیت"
          className="w-full"
        />
      </div>

      <PrimaryButtons
        onClick={registerNewPerson}
        className="w-full rounded-3xl "
        disabled={disableButton || loading}
      >
        {loading ? <LoadingSpinnerButton /> : "ثبت نام"}
      </PrimaryButtons>
    </div>
  );
};

export default NewRegister;
