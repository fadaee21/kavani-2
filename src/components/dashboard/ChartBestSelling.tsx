import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import useSWR from "swr";
import { LoadingSpinnerTable } from "../ui-kit/LoadingSpinner";
// import Pagination from "../ui-kit/Pagination";
// import { useState } from "react";
// const PAGE_SIZE = 7;
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// const mockData = {
//   content: Array.from({ length: 10 }, (_, index) => ({
//     code: `A${index + 1}`,
//     name: `Item ${index + 1}`,
//     remainQuantity: Math.floor(Math.random() * 100) + 1,
//     sold: Math.floor(Math.random() * 200) + 1,
//     total: Math.floor(Math.random() * 300) + 1,
//   })),
// };

const ChartBestSelling = () => {
  // const [page, setPage] = useState(1);

  const { data, isLoading, error } = useSWR<ResponseData<IBestSelling>>(
    `/panel/supplier/goods/best_selling`
    // `/panel/supplier/goods/best_selling/${page - 1}/${PAGE_SIZE}`
  );
  if (isLoading) {
    return <LoadingSpinnerTable />;
  }
  // const totalElements = data?.body.totalElements || 0;
  const chartData = {
    labels: data?.body.content.map((item) => item.name),
    datasets: [
      {
        label: "Remaining Quantity",
        data: data?.body.content.map((item) => item.remainQuantity),
        backgroundColor: "rgba(255, 205, 86, 0.2)", // Yellow
        borderColor: "rgba(255, 205, 86, 1)",
        borderWidth: 1,
      },
      {
        label: "Sold",
        data: data?.body.content.map((item) => item.sold),
        backgroundColor: "rgba(75, 192, 192, 0.2)", // Green
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const, // Use one of the allowed values and cast it as const
      },
      title: {
        display: true,
        text: "وضعیت تعداد 10 کالای پرفروش در انبار و فروشگاه",
        color: "#F9FAFB", // Tailwind text-gray-50
      },
      tooltip: {
        bodyColor: "#F9FAFB", // Tailwind text-gray-50
        titleColor: "#F9FAFB", // Tailwind text-gray-50
      },
    },
    scales: {
      x: {
        stacked: true,
        ticks: {
          color: "#F9FAFB", // Tailwind text-gray-50
          display: false,
        },
      },
      y: {
        stacked: true,
        ticks: {
          color: "#F9FAFB", // Tailwind text-gray-50
        },
      },
    },
  };

  if (error) {
    return <p>{error.message ?? "error"}</p>;
  }
  return (
    <>
      <Bar data={chartData} options={options} />
      {/* <Pagination
        currentPage={page}
        onPageChange={(value) => setPage(value)}
        pageSize={PAGE_SIZE}
        totalCount={totalElements}
      /> */}
    </>
  );
};

export default ChartBestSelling;

// const { data, isLoading } = useSWR(`//panel/supplier/goods/best_selling`);
