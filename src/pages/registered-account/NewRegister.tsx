import { useState } from "react";
import axiosPrivate from "@/services/axios";
import { toast } from "react-toastify";
import router from "@/routes";
import { personPaymentSchema } from "@/validator/personPaymentSchema";
import { TextField } from "@/components/ui-kit/TextField";
import ListBoxSelect from "@/components/ui-kit/ListBoxSelect";
import { PrimaryButtons } from "@/components/ui-kit/buttons/PrimaryButtons";
import ReturnButton from "@/components/ui-kit/buttons/ReturnButton";
import { LoadingSpinnerButton } from "@/components/ui-kit/LoadingSpinner";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import handleError from "@/validator/showError";

interface IPostData {
  name: string;
  lastName: string;
  mobile: string;
  callBackUrl: string;
}

const fetcherPost = (
  url: string,
  { arg }: { arg: IPostData & { serviceName: string } }
) => axiosPrivate.post(url, arg).then((res) => res.data);

const NewRegister = () => {
  const { data } = useSWR<ResponseData<IServiceAll>>(`/service/get/all/0/100`);

  const origin = typeof window !== "undefined" && window.location.origin;
  const callBackUrl = `${origin}/success-payment`;
  const [selected, setSelected] = useState<SelectedOption | null>(null);
  const [personPayment, setPersonPayment] = useState<IPostData>({
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

  const { trigger, isMutating } = useSWRMutation(
    `/panel/accounts/add`,
    fetcherPost
  );

  const registerNewPerson = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const validatedData = personPaymentSchema.parse(personPayment);
      const res = await trigger({
        ...validatedData,
        serviceName: selected?.label || "", //TODO:it must change to service id for now backend take label
      });
      if (res.is_successful) {
        router.navigate("/kvn/registered-account");
        toast.success("سرویس  با موفقیت ثبت شد");
      }
    } catch (error) {
      handleError(error);
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
      <form onSubmit={registerNewPerson}>
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
            {data ? (
              <ListBoxSelect
                items={data.body.content.map((service) => ({
                  label: service.name,
                  value: service.serviceId.toString(),
                }))}
                selected={selected}
                setSelected={setSelected}
                disabled={false}
                placeholder="انتخاب نوع فعالیت"
              />
            ) : (
              <ListBoxSelect
                items={[]}
                selected={selected}
                setSelected={setSelected}
                placeholder={"انتخاب نوع فعالیت"}
              />
            )}
          <TextField
            id="mobile"
            placeholder="موبایل"
            onChange={handleChange}
            state={personPayment.mobile}
          />
        </div>

        <PrimaryButtons
          type="submit"
          className="w-full rounded-3xl "
          disabled={disableButton || isMutating}
        >
          {isMutating ? <LoadingSpinnerButton /> : "ثبت نام"}
        </PrimaryButtons>
      </form>
    </div>
  );
};

export default NewRegister;
