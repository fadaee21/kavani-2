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
import useSWRMutation from "swr/mutation";
import axiosPrivate from "@/services/axios";

interface IService {
  kolId: string;
  name: string;
  servicePrice: string;
  discount: string;
  kavaniPercentage: string;
  prepayment: string;
}
const fetcherPost = (url: string, { arg }: { arg: IService }) =>
  axiosPrivate.post(url, arg).then((res) => res.data);

const NewService = () => {
  const { trigger, isMutating } = useSWRMutation(`/service/add`, fetcherPost);

  // const [selected, setSelected] = useState<SelectedOption | null>(null);
  // const [loading, setLoading] = useState(false);
  const [service, setService] = useState<IService>({
    kolId: "", //"سرویس دهنده یافت نشد"
    name: "",
    servicePrice: "",
    discount: "",
    kavaniPercentage: "",
    prepayment: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setService({
      ...service,
      [name]: value,
    });
  };

  const registerNewPerson = async () => {
    console.log({ service });
    try {
      await trigger(service);
    } catch (err) {
      console.error(err);
    }
  };
  const disableButton = Object.values(service).some((value) => value === "");
  return (
    <div className="max-w-xl mx-auto  scale-90 p-4  border  rounded-lg shadow-sm md:p-6 border-gray-700 bg-gray-800">
      <div className="flex justify-between items-center mb-4">
        <p className="text-lg font-semibold">ثبت سرویس جدید</p>
        <ReturnButton />
      </div>

      <div className="flex flex-col justify-start items-start w-full space-y-5 my-10">
        <TextField
          id="kolId"
          placeholder="kolId"
          onChange={handleChange}
          state={service.kolId}
          inputClass="w-full"
        />
        <TextField
          id="name"
          placeholder="نام سرویس"
          onChange={handleChange}
          state={service.name}
          inputClass="w-full"
        />
        <TextField
          id="servicePrice"
          placeholder="قیمت سرویس"
          onChange={handleChange}
          state={service.servicePrice}
        />
        <TextField
          id="discount"
          placeholder="درصد تخفیف"
          onChange={handleChange}
          state={service.discount}
        />
        <TextField
          id="kavaniPercentage"
          placeholder="درصد کاوانی"
          onChange={handleChange}
          state={service.kavaniPercentage}
        />
        <TextField
          id="prepayment"
          placeholder="میزان پیش پرداخت"
          onChange={handleChange}
          state={service.prepayment}
        />
      </div>

      <PrimaryButtons
        onClick={registerNewPerson}
        className="w-full rounded-3xl "
        disabled={disableButton || isMutating}
      >
        {isMutating ? <LoadingSpinnerButton /> : "ثبت سرویس"}
      </PrimaryButtons>
    </div>
  );
};

export default NewService;
