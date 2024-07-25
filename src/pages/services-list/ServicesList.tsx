import TableContent from "@/components/registered-accounts/TableContent";
// import TableContentAccounts from "@/components/registered-accounts/TableContentAccounts";

const ServicesList = () => {
  const fetchUrl = (page: number, pageSize: number) =>
    `/panel/accounts/get/registered/${page}/${pageSize}`;
  return (
    <div className="flex flex-col">
      <TableContent headers={headers} fetchUrl={fetchUrl} />
    </div>
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
