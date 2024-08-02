import TableContent from "@/components/registered-accounts/TableContent";
import { PrimaryButtons } from "@/components/ui-kit/buttons/PrimaryButtons";
import Pagination from "@/components/ui-kit/Pagination";
import { TextField } from "@/components/ui-kit/TextField";
import MagnifyingGlass from "@/assets/icons/magnifying-glass.svg?react";
import router from "@/routes";
import { useState } from "react";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import axiosPrivate from "@/services/axios";
import { LoadingSpinnerButton } from "@/components/ui-kit/LoadingSpinner";
import handleError from "@/validator/showError";

const PAGE_SIZE = 20;
const fetcherPost = (url: string, { arg }: { arg: { name: string } }) =>
  axiosPrivate.post(url, arg).then((res) => res.data);

const KolLIst = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState({
    name: "",
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

  const { data, isLoading } = useSWR<ResponseData<IKolGetAll>>(
    `/kol/get/all/${page - 1}/${PAGE_SIZE}`
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
      <div className="flex flex-col">
        <TableContent
          headers={headers}
          data={searchData ? searchData.body.content : data?.body?.content}
          isLoading={isLoading}
          totalElements={totalElements}
          emptyText={
            searchData
              ? "سرویس دهنده ای با این مشخصات پیدا نشد"
              : "هیچ سرویس دهنده ای ثبت نشده است"
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

export default KolLIst;

const headers = [
  { key: "name", label: "نام" },
  { key: "officialName", label: "نام رسمی" },
  { key: "address", label: "آدرس" },
];
