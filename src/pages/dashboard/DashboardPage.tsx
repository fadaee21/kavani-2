import CardFour from "@/components/dashboard/CardFour";
import CardOne from "@/components/dashboard/CardOne";
import CardThree from "@/components/dashboard/CardThree";
import CardTwo from "@/components/dashboard/CardTwo";
import ChartOne from "@/components/dashboard/ChartOne";
import ChartThree from "@/components/dashboard/ChartThree";
import ChartTwo from "@/components/dashboard/ChartTwo";
// import useSWR from "swr";

const DashboardPage = () => {
  // const { data, isLoading } = useSWR(`/panel/supplier/status`);

  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <CardOne supplyCountInKavani={content.supplyCountInKavani} />
        <CardTwo bestSoldSupplyName={content.bestSoldSupplyName} />
        <CardThree soldCount={content.soldCount} />
        <CardFour position={content.position} />
      </div>
      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <div className="col-span-6 border-gray-700 bg-gray-800 p-4 rounded-lg shadow-md">
          <ChartOne />
        </div>
        <div className="col-span-6 border-gray-700 bg-gray-800 p-4 rounded-lg shadow-md">
          <ChartThree />
        </div>
        <div className="col-span-6 border-gray-700 bg-gray-800 p-4 rounded-lg shadow-md">
          <ChartTwo />
        </div>
      </div>
    </>
  );
};

export default DashboardPage;

const content = {
  supplyCountInKavani: 30,
  bestSoldSupplyName: "string",
  soldCount: 0,
  position: 0,
};
