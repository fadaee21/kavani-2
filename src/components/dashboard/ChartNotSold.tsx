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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ChartNotSold = () => {
  const { data, isLoading, error } = useSWR<ResponseData<INotSold>>(
    `/panel/supplier/goods/not_sold/0/100`
  );
  if (isLoading) {
    return <LoadingSpinnerTable />;
  }

  const chartData = {
    labels: data?.body.content.map((item) => item.name),
    datasets: [
      {
        label: "Remaining Quantity",
        data: data?.body.content.map((item) => item.remainingQuantity),
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
        position: "top" as const,
        labels: {
          color: "#F9FAFB",
        },
      },
      title: {
        display: true,
        text: "کالاهای بدون فروش در هفته گذشته",
        color: "#F9FAFB",
      },
      tooltip: {
        bodyColor: "#F9FAFB",
        titleColor: "#F9FAFB",
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#F9FAFB",
          display: false,
        },
      },
      y: {
        ticks: {
          color: "#F9FAFB",
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
    </>
  );
};

export default ChartNotSold;
