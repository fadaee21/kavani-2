import TableContent from "@/components/registered-accounts/TableContent";
import { PrimaryButtons } from "@/components/ui-kit/buttons/PrimaryButtons";
import { LoadingSpinnerButton } from "@/components/ui-kit/LoadingSpinner";
import Pagination from "@/components/ui-kit/Pagination";
import router from "@/routes";
import axiosPrivate from "@/services/axios";
import handleError from "@/validator/showError";
import { lazy, useState } from "react";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import MagnifyingGlass from "@/assets/icons/magnifying-glass.svg?react";
import { TextField } from "@/components/ui-kit/TextField";
import ListBoxSelect from "@/components/ui-kit/ListBoxSelect";
import { useAuth } from "@/hooks/context/useAuth";

const ExcelExport = lazy(() => import("@components/ExportToExcel"));

const PAGE_SIZE = 10;
const fetcherPost = (
  url: string,
  { arg }: { arg: { name: string | undefined; status: string | undefined } }
) => axiosPrivate.post(url, arg).then((res) => res.data);

const transformStatus: (data: IRegisteredUser[]) => IRegisteredUser[] = (
  data
) => {
  const transformedData = new Map<string, string>();
  data.forEach((item) => {
    transformedData.set(
      item.status,
      item.status === "REGISTERED" ? "ثبت نام موفق" : "ثبت نام ناموفق"
    );
  });
  return data.map((item) => ({
    ...item,
    status: transformedData.get(item.status) || "",
  }));
};

const RegisteredAccount = () => {
  const { auth } = useAuth();
  const [page, setPage] = useState(1);
  const [searchingMode, setSearchingMode] = useState(false);
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
  } = useSWRMutation(`/panel/accounts/search/0/100000`, fetcherPost);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await trigger({
        name: search.name.length >= 1 ? search.name : undefined,
        status: selectedSearch?.value ? selectedSearch.value : undefined,
      });
      setSearchingMode(true);
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

  const { data, isLoading } = useSWR<ResponseData<IRegisteredUser>>(
    `/panel/accounts/get/all/${page - 1}/${PAGE_SIZE}`
  );

  const totalElements = searchData
    ? searchData.body.totalElements
    : data?.body.totalElements || 0;

  const transformedData: IRegisteredUser[] = searchData
    ? transformStatus(searchData.body.content)
    : transformStatus(data?.body?.content || []);

  return (
    <div className="w-full">
      {auth?.roles === "KAVANI" && (
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
                  { value: "", label: "همه موارد" },
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
          <div className="flex gap-3 mr-auto">
            <ExcelExport
              fileName={"Registered Accounts Table"}
              // searchData={null}
              linkAll={`/panel/accounts/get/all/0/100000`}
              useIn="reg"
            />
            <PrimaryButtons
              className="rounded-xl"
              onClick={() => router.navigate("new")}
            >
              ثبت جدید
            </PrimaryButtons>
          </div>
        </div>
      )}
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
      {!searchingMode && (
        <Pagination
          currentPage={page}
          onPageChange={(value) => setPage(value)}
          pageSize={PAGE_SIZE}
          totalCount={totalElements}
        />
      )}
    </div>
  );
};

export default RegisteredAccount;

const headers: { key: keyof IRegisteredUser; label: string }[] = [
  { key: "first_name", label: "نام" },
  { key: "last_name", label: "نام خانوادگی" },
  { key: "mobile", label: "موبایل" },
  { key: "serviceName", label: "نوع فعالیت" },
  { key: "status", label: "وضعیت" },
  { key: "voucher", label: "کد تخفیف" },
];
