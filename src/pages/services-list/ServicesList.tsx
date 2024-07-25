import TableContent from "@/components/registered-accounts/TableContent";
import { PrimaryButtons } from "@/components/ui-kit/buttons/PrimaryButtons";
import router from "@/routes";
// import TableContentAccounts from "@/components/registered-accounts/TableContentAccounts";

const ServicesList = () => {
  const fetchUrl = (page: number, pageSize: number) =>
    `/panel/accounts/get/registered/${page}/${pageSize}`;
  return (
    <>
      <PrimaryButtons
        className="rounded-xl mr-auto mb-5"
        onClick={() => router.navigate("new")}
      >
        ثبت جدید
      </PrimaryButtons>
      <div className="flex flex-col">
        <TableContent headers={headers} fetchUrl={fetchUrl} />
      </div>
    </>
  );
};

export default ServicesList;

const headers = [
  { key: "", label: "kol" },
  { key: "", label: "نام سرویس" },
  { key: "", label: "قیمت سرویس" },
  { key: "", label: "درصد تخفیف" },
  { key: "", label: "درصد کاوانی" },
  { key: "", label: "میزان پیش پرداخت" },
];
