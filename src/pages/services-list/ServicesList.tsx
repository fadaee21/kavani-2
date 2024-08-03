import TableContent from "@/components/registered-accounts/TableContent";
import { PrimaryButtons } from "@/components/ui-kit/buttons/PrimaryButtons";
import { LoadingSpinnerButton } from "@/components/ui-kit/LoadingSpinner";
import Pagination from "@/components/ui-kit/Pagination";
import { TextField } from "@/components/ui-kit/TextField";
import router from "@/routes";
import axiosPrivate from "@/services/axios";
import handleError from "@/validator/showError";
import { useState } from "react";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import MagnifyingGlass from "@/assets/icons/magnifying-glass.svg?react";

const PAGE_SIZE = 20;
const fetcherPost = (url: string, { arg }: { arg: { name: string } }) =>
  axiosPrivate.post(url, arg).then((res) => res.data);
const ServicesList = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState({
    name: "",
  });
  const {
    trigger,
    isMutating,
    data: searchData,
  } = useSWRMutation(
    `/service/search/${page - 1}/${PAGE_SIZE}`,
    fetcherPost
  );

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
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

  const { data, isLoading } = useSWR<ResponseData<IServiceAll>>(
    `/service/get/all/${page - 1}/${PAGE_SIZE}`
  );

  const totalElements = searchData
    ? searchData.body.totalElements
    : data?.body.totalElements || 0;

  return (
    <div className="w-full">
      <div className="flex justify-end flex-col-reverse gap-5 md:gap-0 md:flex-row items-end md:items-center md:justify-between">
        <form className="md:w-1/2 w-full" onSubmit={handleSearch}>
          <div className="md:flex justify-start items-center  space-x-2  transform md:scale-75 origin-right">
            <TextField
              placeholder="نام"
              state={search.name}
              onChange={handleChange}
              name="name"
              id="name"
              className="ml-5"
            />
            <PrimaryButtons className="rounded-xl" type="submit">
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

export default ServicesList;

const headers = [
  { key: "name", label: "نام سرویس" },
  { key: "kolName", label: "سرویس دهنده" },
  { key: "servicePrice", label: "قیمت سرویس" },
  { key: "discount", label: "درصد تخفیف" },
  { key: "kavaniPercentage", label: "درصد کاوانی" },
  { key: "prepayment", label: "میزان پیش پرداخت" },
];
