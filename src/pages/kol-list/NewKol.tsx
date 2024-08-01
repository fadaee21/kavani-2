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
import axiosPrivate from "@/services/axios";
import useSWRMutation from "swr/mutation";
import router from "@/routes";
import { toast } from "react-toastify";
interface IKole {
  name: string;
  officialName: string;
  address: string;
}
const fetcherPost = (url: string, { arg }: { arg: IKole }) =>
  axiosPrivate.post(url, arg).then((res) => res.data);

const NewKol = () => {
  const { trigger, isMutating } = useSWRMutation(`/kol/add`, fetcherPost);

  const [kol, setKol] = useState<IKole>({
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
    try {
      const res = await trigger(kol);
      // console.log({ res });
      if (res.is_successful) {
        router.navigate("/kvn/kol-list");
        toast.success("سرویس دهنده با موفقیت ثبت شد");
      }
    } catch (err) {
      console.error(err);
    }
  };
  const disableButton = Object.values(kol).some((value) => value === "");
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
          id="address"
          placeholder="آدرس"
          onChange={handleChange}
          state={kol.address}
        />
      </div>

      <PrimaryButtons
        onClick={registerNewPerson}
        className="w-full rounded-3xl "
        disabled={disableButton || isMutating}
      >
        {isMutating ? <LoadingSpinnerButton /> : "ثبت سرویس دهنده"}
      </PrimaryButtons>
    </div>
  );
};

export default NewKol;
