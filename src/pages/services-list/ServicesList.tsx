import TableContent from "@/components/registered-accounts/TableContent";
import { PrimaryButtons } from "@/components/ui-kit/buttons/PrimaryButtons";
import Pagination from "@/components/ui-kit/Pagination";
import router from "@/routes";
import { useState } from "react";
import useSWR from "swr";
import { fetcherPost } from "@/services/axios";
const PAGE_SIZE = 20;

const ServicesList = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useSWR(
    `/service/search/${page - 1}/${PAGE_SIZE}`,
    fetcherPost
  );

  const totalElements = data?.body.totalElements || 0;
  return (
    <div className="w-full">
      <div className="flex justify-end">
        <PrimaryButtons
          className="rounded-xl mb-5"
          onClick={() => router.navigate("new")}
        >
          ثبت جدید
        </PrimaryButtons>
      </div>
      <div className="flex flex-col">
        <TableContent
          headers={headers}
          data={data?.body?.content}
          isLoading={isLoading}
          totalElements={totalElements}
          emptyText="هیچ سرویسی یافت نشد"
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
  { key: "", label: "kol" },
  { key: "", label: "نام سرویس" },
  { key: "", label: "قیمت سرویس" },
  { key: "", label: "درصد تخفیف" },
  { key: "", label: "درصد کاوانی" },
  { key: "", label: "میزان پیش پرداخت" },
];
