import TableContent from "@/components/registered-accounts/TableContent";
// import TableContentAccounts from "@/components/registered-accounts/TableContentAccounts";

const KolLIst = () => {
  const fetchUrl = (page: number, pageSize: number) =>
    `/panel/accounts/get/registered/${page}/${pageSize}`;
  return (
    <div className="flex flex-col">
      <TableContent headers={headers} fetchUrl={fetchUrl} />
    </div>
  );
};

export default KolLIst;

const headers = [
  { key: "", label: "نام" },
  { key: "", label: "نام رسمی" },
  { key: "", label: "آدرس" },
];
