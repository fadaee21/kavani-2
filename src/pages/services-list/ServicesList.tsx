import TableContent from "@/components/registered-accounts/TableContent";
import { PrimaryButtons } from "@/components/ui-kit/buttons/PrimaryButtons";
import Pagination from "@/components/ui-kit/Pagination";
import router from "@/routes";
import { useState } from "react";
import useSWR from "swr";
const PAGE_SIZE = 20;

const ServicesList = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useSWR(
    `/service/get/all/${page - 1}/${PAGE_SIZE}`
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
  { key: "kolName", label: "سرویس دهنده" },
  { key: "serviceId", label: "نام سرویس" },
  { key: "servicePrice", label: "قیمت سرویس" },
  { key: "discount", label: "درصد تخفیف" },
  { key: "kavaniPercentage", label: "درصد کاوانی" },
  { key: "prepayment", label: "میزان پیش پرداخت" },
];
