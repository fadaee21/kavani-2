import axios from "axios";

// const BASE_URL = "http://31.14.123.22:8082/v1";
const BASE_URL = "https://admin-kavani.nova724.com/v1";

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  timeout: 5000,
});
export default axiosPrivate;

export const fetcherPost = (url: string) =>
  axiosPrivate.post(url).then((res) => res.data);
// For fetching data, you should use `useAxiosPrivate` along with `useSWR` to properly configure the request.
