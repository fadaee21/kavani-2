import TableContent from "@/components/registered-accounts/TableContent";
import { PrimaryButtons } from "@/components/ui-kit/buttons/PrimaryButtons";
import { LoadingSpinnerButton } from "@/components/ui-kit/LoadingSpinner";
import Pagination from "@/components/ui-kit/Pagination";
import router from "@/routes";
import axiosPrivate from "@/services/axios";
import handleError from "@/validator/showError";
import { useState } from "react";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import MagnifyingGlass from "@/assets/icons/magnifying-glass.svg?react";
import { TextField } from "@/components/ui-kit/TextField";
import ListBoxSelect from "@/components/ui-kit/ListBoxSelect";

const PAGE_SIZE = 20;
const fetcherPost = (
  url: string,
  { arg }: { arg: { name: string; status: string | undefined } }
) => axiosPrivate.post(url, arg).then((res) => res.data);

// const transformStatus = (data: { status: string }[]) => {
//   return data.map((item: { status: string }) => ({
//     ...item,
//     status: item.status === "REGISTERED" ? "ثبت نام موفق" : "ثبت نام ناموفق",
//   }));
// };
const transformStatus = (data: { status: string }[]) => {
  const transformedData = new Map<string, string>();
  data.forEach((item) => {
    transformedData.set(
      item.status,
      item.status === "REGISTERED" ? "ثبت نام موفق" : "ثبت نام ناموفق"
    );
  });
  return data.map((item) => ({ ...item, status: transformedData.get(item.status) || "" }));
};

const RegisteredAccount = () => {
  const [page, setPage] = useState(1);
  const [selectedSearch, setSelectedSearch] = useState<SelectedOption | null>(
    null
  );
  const [search, setSearch] = useState({
    name: "",
  });

  const {
    trigger,
    isMutating,
    data: searchData,
  } = useSWRMutation(`/kol/search/${page - 1}/${PAGE_SIZE}`, fetcherPost);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await trigger({
        name: search.name,
        status: selectedSearch?.value ? selectedSearch.value : undefined,
      });
    } catch (err) {
      handleError(err);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setSearch({
      ...search,
      [name]: value,
    });
  };

  const { data, isLoading } = useSWR(
    `/panel/accounts/get/registered/${page - 1}/${PAGE_SIZE}`
  );

  const totalElements = searchData
    ? searchData.body.totalElements
    : data?.body.totalElements || 0;

  const transformedData = searchData
    ? transformStatus(searchData.body.content)
    : transformStatus(data?.body?.content || []);

  return (
    <div className="w-full">
      <div className="flex justify-end flex-col-reverse gap-5 md:gap-0 md:flex-row items-end md:items-center md:justify-between">
        <form className="md:w-1/2 w-full" onSubmit={handleSearch}>
          <div className="md:flex justify-start items-center space-x-2 transform md:scale-75 origin-right">
            <TextField
              placeholder="نام"
              state={search.name}
              onChange={handleChange}
              name="name"
              id="name"
              className="ml-2"
            />
            <ListBoxSelect
              items={[
                { value: "UNREGISTERED", label: "ثبت نام نشده" },
                { value: "REGISTERED", label: "ثبت نام شده" },
              ]}
              selected={selectedSearch}
              setSelected={setSelectedSearch}
              label=""
              placeholder="وضعیت"
            />
            <PrimaryButtons className="rounded-xl" onClick={handleSearch}>
              {isMutating ? (
                <div className="p-1">
                  <LoadingSpinnerButton />
                </div>
              ) : (
                <MagnifyingGlass className="w-8 h-8" />
              )}
            </PrimaryButtons>
          </div>
        </form>
        <PrimaryButtons
          className="rounded-xl"
          onClick={() => router.navigate("new")}
        >
          ثبت جدید
        </PrimaryButtons>
      </div>
      <div className="flex flex-col w-full">
        <TableContent
          headers={headers}
          data={transformedData}
          isLoading={isLoading}
          totalElements={totalElements}
          emptyText={
            searchData
              ? "دیتایی با این مشخصات یافت نشد"
              : "هنوز هیچ آیتمی ثبت نشده است"
          }
          primaryKey="id"
        />
      </div>
      <Pagination
        currentPage={page}
        onPageChange={(value) => setPage(value)}
        pageSize={PAGE_SIZE}
        totalCount={totalElements}
      />
    </div>
  );
};

export default RegisteredAccount;

const headers = [
  { key: "first_name", label: "نام" },
  { key: "last_name", label: "نام خانوادگی" },
  { key: "mobile", label: "موبایل" },
  { key: "serviceName", label: "نوع فعالیت" },
  { key: "status", label: "وضعیت" },
  { key: "voucher", label: "کد تخفیف" },
];
