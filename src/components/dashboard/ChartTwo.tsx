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

ChartJS.register(
  CategoryScale,
  LinearScale,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const mockData = {
  content: [
    { name: "Item 1", total: 100 },
    { name: "Item 3", total: 200 },
    { name: "Item 4", total: 250 },
    { name: "Item 2", total: 150 },
    { name: "Item 5", total: 300 },
  ],
};

const data = {
  labels: mockData.content.map((item) => item.name),
  datasets: [
    {
      label: "Total Quantity",
      data: mockData.content.map((item) => item.total),
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
      ],
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
      text: "پای مربوطه به تنوع کالا",
      color: "#F9FAFB", // Tailwind text-gray-50
    },
    tooltip: {
      bodyColor: "#F9FAFB", // Tailwind text-gray-50
      titleColor: "#F9FAFB", // Tailwind text-gray-50
    },
  },
};

const ChartTwo = () => {
  return <Doughnut data={data} options={options} />;
};

export default ChartTwo;
