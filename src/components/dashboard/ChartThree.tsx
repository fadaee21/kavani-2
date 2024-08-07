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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const mockData = {
  content: [
    { name: "Item 1", code: "A001", remainingQuantity: 25 },
    { name: "Item 2", code: "A002", remainingQuantity: 40 },
    { name: "Item 3", code: "A003", remainingQuantity: 10 },
    { name: "Item 4", code: "A004", remainingQuantity: 55 },
    { name: "Item 5", code: "A005", remainingQuantity: 30 },
  ],
};

const data = {
  labels: mockData.content.map((item) => item.name),
  datasets: [
    {
      label: "Remaining Quantity",
      data: mockData.content.map((item) => item.remainingQuantity),
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
      labels: {
        color: "#F9FAFB", // Tailwind text-gray-50
      },
    },
    title: {
      display: true,
      text: "کالاهای بدون فروش در هفته گذشته",
      color: "#F9FAFB", // Tailwind text-gray-50
    },
    tooltip: {
      bodyColor: "#F9FAFB", // Tailwind text-gray-50
      titleColor: "#F9FAFB", // Tailwind text-gray-50
    },
  },
  scales: {
    x: {
      ticks: {
        color: "#F9FAFB", // Tailwind text-gray-50
      },
    },
    y: {
      ticks: {
        color: "#F9FAFB", // Tailwind text-gray-50
      },
    },
  },
};

const ChartThree = () => {
  // const { data, isLoading } = useSWR(`/panel/supplier/status`);
  return <Bar data={data} options={options} />;
};

export default ChartThree;
