import AllCards from "@/components/dashboard/AllCards";
import ChartBestSelling from "@/components/dashboard/ChartBestSelling";
import ChartNotSold from "@/components/dashboard/ChartNotSold";
import ChartDiversity from "@/components/dashboard/ChartDiversity";
import { LoadingSpinnerPage } from "@/components/ui-kit/LoadingSpinner";
import useSWR from "swr";

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
      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <div className="col-span-6 border-gray-700 bg-gray-800 p-4 rounded-lg shadow-md">
          <ChartBestSelling />
        </div>
        <div className="col-span-6 border-gray-700 bg-gray-800 p-4 rounded-lg shadow-md">
          <ChartNotSold />
        </div>
        <div className="col-span-6 border-gray-700 bg-gray-800 p-4 rounded-lg shadow-md">
          <ChartDiversity />
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
