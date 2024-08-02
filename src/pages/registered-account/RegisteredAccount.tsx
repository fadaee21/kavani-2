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

const PAGE_SIZE = 20;
const fetcherPost = (url: string, { arg }: { arg: { name: string } }) =>
  axiosPrivate.post(url, arg).then((res) => res.data);

const RegisteredAccount = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState({
    name: "",
    status: "UNREGISTERED",
  });
  const {
    trigger,
    isMutating,
    data: searchData,
  } = useSWRMutation(`/kol/search/${page - 1}/${PAGE_SIZE}`, fetcherPost);

  const handleSearch = async () => {
    try {
      await trigger(search);
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
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  }
  return (
    <div className="w-full">
      <div className="flex justify-end flex-col-reverse gap-5 md:gap-0 md:flex-row items-end md:items-center md:justify-between">
        <div className="md:w-1/3 w-full">
          <TextField
            placeholder="جستجو"
            state={search.name}
            onChange={handleChange}
            name="name"
            id="name"
            className="ml-5"
            icon={isMutating ? <LoadingSpinnerButton /> : <MagnifyingGlass />}
            onClick={handleSearch}
            onKeyDown={handleKeyDown}
          />
        </div>
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
          data={searchData ? searchData.body.content : data?.body?.content}
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
  { key: "", label: "نوع فعالیت" },
  { key: "voucher", label: "کد تخفیف" },
];
