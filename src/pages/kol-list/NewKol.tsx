import { useState } from "react";
// import { mutate } from "swr";
// import axiosPrivate from "@/services/axios";
// import { toast } from "react-toastify";
// import router from "@/routes";
// import axios from "axios";
// import { ACTIVITIES_FIELD } from "@/const/registerNewUser";
// import { personPaymentSchema } from "@/validator/personPaymentSchema";
// import alertErr from "@/validator/showError";
import { TextField } from "@/components/ui-kit/TextField";
// import ListBoxSelect from "@/components/ui-kit/ListBoxSelect";
import { PrimaryButtons } from "@/components/ui-kit/buttons/PrimaryButtons";
import ReturnButton from "@/components/ui-kit/buttons/ReturnButton";
import { LoadingSpinnerButton } from "@/components/ui-kit/LoadingSpinner";

const NewKol = () => {
  const [selected, setSelected] = useState<SelectedOption | null>(null);
  const [loading, setLoading] = useState(false);
  const [kol, setKol] = useState({
    name: "",
    officialName: "",
    address: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setKol({
      ...kol,
      [name]: value,
    });
  };

  const registerNewPerson = async () => {
    console.log({ kol });
    // try {
    //   setLoading(true);
    //   const validatedData = personPaymentSchema.parse(kol);
    //   const res = await axiosPrivate.post("/panel/accounts/add", {
    //     ...validatedData,
    //     accountActivityType: selected?.value,
    //   });
    //   if (res.status === 200) {
    //     toast.success("پیامک به زودی برای کاربر ارسال میشود");
    //     router.navigate("/kvn/registered-account");
    //   } else {
    //     toast.error("مشکلی پیش آمد، دوباره تلاش کنید");
    //   }
    // } catch (error) {
    //   const err = alertErr(error);
    //   console.log({ err });
    //   toast.error(err?.[0]);
    //   if (axios.isAxiosError(error)) {
    //     const { code } = error.response?.data.body || {};
    //     if (code === "10") {
    //       toast.error("کاربری با این مشخصات وجود دارد");
    //       return;
    //     }
    //     toast.error("مشکلی پیش آمد، دوباره تلاش کنید");
    //   }
    // } finally {
    //   setLoading(false);
    // }
  };
  const disableButton =
    Object.values(kol).some((value) => value === "") || !selected;
  return (
    <div className="max-w-xl mx-auto  scale-90 p-4  border  rounded-lg shadow-sm md:p-6 border-gray-700 bg-gray-800">
      <div className="flex justify-between items-center mb-4">
        <p className="text-lg font-semibold">ثبت سرویس دهنده</p>
        <ReturnButton />
      </div>

      <div className="flex flex-col justify-start items-start w-full space-y-5 my-10">
        <TextField
          id="name"
          placeholder="نام"
          onChange={handleChange}
          state={kol.name}
          inputClass="w-full"
        />
        <TextField
          id="officialName"
          placeholder="نام رسمی"
          onChange={handleChange}
          state={kol.officialName}
          inputClass="w-full"
        />
        <TextField
          id="officialName"
          placeholder="آدرس"
          onChange={handleChange}
          state={kol.officialName}
        />
      </div>

      <PrimaryButtons
        onClick={registerNewPerson}
        className="w-full rounded-3xl "
        disabled={disableButton || loading}
      >
        {loading ? <LoadingSpinnerButton /> : "ثبت سرویس دهنده"}
      </PrimaryButtons>
    </div>
  );
};

export default NewKol;
