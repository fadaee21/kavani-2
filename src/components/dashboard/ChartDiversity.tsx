import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { LoadingSpinnerTable } from "../ui-kit/LoadingSpinner";
import useSWR from "swr";

ChartJS.register(
  CategoryScale,
  LinearScale,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

// const mockData = {
//   content: [
//     { name: "Item 1", total: 100 },
//     { name: "Item 3", total: 200 },
//     { name: "Item 4", total: 250 },
//     { name: "Item 2", total: 150 },
//     { name: "Item 5", total: 300 },
//   ],
// };

const ChartDiversity = () => {
  const { data, isLoading, error } = useSWR<ResponseData<IDiversity>>(
    `/panel/supplier/goods/diversity/0/100`,
    {}
  );
  if (isLoading) {
    return <LoadingSpinnerTable />;
  }

  const chartData = {
    labels: data?.body.content.map((item) => item.name),
    datasets: [
      {
        label: "Total Quantity",
        data: data?.body.content.map((item) => item.total),
        backgroundColor,
        borderColor,
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false, // Hide the legend
      },
      title: {
        display: true, // Show the title
        text: "پای مربوطه به تنوع کالا",
        color: "#F9FAFB", // Tailwind text-gray-50
      },
      tooltip: {
        bodyColor: "#F9FAFB", // Tailwind text-gray-50
        titleColor: "#F9FAFB", // Tailwind text-gray-50
      },
    },
  };

  if (error) {
    return <p>{error.message ?? "error"}</p>;
  }

  return <Doughnut data={chartData} options={options} />;
};

export default ChartDiversity;

const backgroundColor = [
  "rgba(255, 99, 132, 0.2)", // Red
  "rgba(54, 162, 235, 0.2)", // Blue
  "rgba(255, 206, 86, 0.2)", // Yellow
  "rgba(75, 192, 192, 0.2)", // Green
  "rgba(153, 102, 255, 0.2)", // Purple
  "rgba(255, 159, 64, 0.2)", // Orange
  "rgba(199, 199, 199, 0.2)", // Grey
  "rgba(255, 99, 71, 0.2)", // Tomato
  "rgba(144, 238, 144, 0.2)", // Light Green
  "rgba(173, 216, 230, 0.2)", // Light Blue
];

const borderColor = [
  "rgba(255, 99, 132, 1)", // Red
  "rgba(54, 162, 235, 1)", // Blue
  "rgba(255, 206, 86, 1)", // Yellow
  "rgba(75, 192, 192, 1)", // Green
  "rgba(153, 102, 255, 1)", // Purple
  "rgba(255, 159, 64, 1)", // Orange
  "rgba(199, 199, 199, 1)", // Grey
  "rgba(255, 99, 71, 1)", // Tomato
  "rgba(144, 238, 144, 1)", // Light Green
  "rgba(173, 216, 230, 1)", // Light Blue
];
