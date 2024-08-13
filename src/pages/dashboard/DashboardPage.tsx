import { LoadingSpinnerPage } from "@/components/ui-kit/LoadingSpinner";
import useSWR from "swr";
import {
  AllCards,
  ChartBestSelling,
  ChartDiversity,
  ChartNotSold,
} from "@components/dashboard/componentExports";
import { Suspense } from "react";
const DashboardPage = () => {
  const { data, isLoading } = useSWR<ResponseDataNoArray<IStatusGoodSupplier>>(
    `/panel/supplier/status`
  );
  if (isLoading) {
    return <LoadingSpinnerPage />;
  }
  return (
    <>
      <AllCards data={data} />
      <Suspense fallback={<span>.</span>}>
        <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
          <div className="col-span-12 md:col-span-6 border-gray-700 bg-gray-800 p-4 rounded-lg shadow-md">
            <ChartBestSelling />
          </div>
          <div className="col-span-12 md:col-span-6 border-gray-700 bg-gray-800 p-4 rounded-lg shadow-md">
            <ChartNotSold />
          </div>
          <div className="col-span-12 md:col-span-6 border-gray-700 bg-gray-800 p-4 rounded-lg shadow-md">
            <ChartDiversity />
          </div>
        </div>
      </Suspense>
    </>
  );
};
export default DashboardPage;
