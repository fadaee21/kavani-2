import TableContent from "@/components/registered-accounts/TableContent";
import { PrimaryButtons } from "@/components/ui-kit/buttons/PrimaryButtons";
import router from "@/routes";
// import TableContentAccounts from "@/components/registered-accounts/TableContentAccounts";

const KolLIst = () => {
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

export default KolLIst;

const headers = [
  { key: "", label: "نام" },
  { key: "", label: "نام رسمی" },
  { key: "", label: "آدرس" },
];
