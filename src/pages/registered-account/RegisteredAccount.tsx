import TableContent from "@/components/registered-accounts/TableContent";
// import TableContentAccounts from "@/components/registered-accounts/TableContentAccounts";

const RegisteredAccount = () => {
  const fetchUrl = (page: number, pageSize: number) =>
    `/panel/accounts/get/registered/${page}/${pageSize}`;
  return (
    <div className="flex flex-col">
      <TableContent headers={headers} fetchUrl={fetchUrl} />
    </div>
  );
};

export default RegisteredAccount;

const headers = [
  { key: "first_name", label: "نام" },
  { key: "last_name", label: "نام خانوادگی" },
  { key: "mobile", label: "موبایل" },
  { key: "voucher", label: "کد تخفیف" },
];

