import { useState } from "react";
import { TextField } from "@/components/ui-kit/TextField";
import { PrimaryButtons } from "@/components/ui-kit/buttons/PrimaryButtons";
import ReturnButton from "@/components/ui-kit/buttons/ReturnButton";
import { LoadingSpinnerButton } from "@/components/ui-kit/LoadingSpinner";
import useSWRMutation from "swr/mutation";
import axiosPrivate from "@/services/axios";
import useSWR from "swr";
import ListBoxSelect from "@/components/ui-kit/ListBoxSelect";
import { toast } from "react-toastify";
import router from "@/routes";

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
  const { data } = useSWR<ResponseData<IKolGetAll>>(`/kol/get/all/0/100`);
  const [selected, setSelected] = useState<SelectedOption | null>(null);
  const [service, setService] = useState<IService>({
    kolId: "",
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
      const res = await trigger(service);
      if (res.is_successful) {
        router.navigate("/kvn/services-list");
        toast.success("سرویس  با موفقیت ثبت شد");
      }
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
          id="name"
          placeholder="نام سرویس"
          onChange={handleChange}
          state={service.name}
          inputClass="w-full"
        />
        {data ? (
          <ListBoxSelect
            items={data.body.content.map((kol) => ({
              label: kol.name,
              value: kol.id.toString(),
            }))}
            selected={selected}
            setSelected={setSelected}
            disabled={false}
            placeholder="سرویس دهنده"
          />
        ) : (
          <ListBoxSelect
            items={[]}
            selected={selected}
            setSelected={setSelected}
            placeholder={"سرویس دهنده"}
          />
        )}
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
