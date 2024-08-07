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
  content: Array.from({ length: 10 }, (_, index) => ({
    code: `A${index + 1}`,
    name: `Item ${index + 1}`,
    remainQuantity: Math.floor(Math.random() * 100) + 1,
    sold: Math.floor(Math.random() * 200) + 1,
    total: Math.floor(Math.random() * 300) + 1,
  })),
};

const data = {
  labels: mockData.content.map((item) => item.name),
  datasets: [
    {
      label: "Remaining Quantity",
      data: mockData.content.map((item) => item.remainQuantity),
      backgroundColor: "rgba(255, 205, 86, 0.2)", // Yellow
      borderColor: "rgba(255, 205, 86, 1)",
      borderWidth: 1,
    },
    {
      label: "Sold",
      data: mockData.content.map((item) => item.sold),
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

const BarChart = () => {
  return <Bar data={data} options={options} />;
};

export default BarChart;

// const { data, isLoading } = useSWR(`//panel/supplier/goods/best_selling`);
