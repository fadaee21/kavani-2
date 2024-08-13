import { lazy } from "react";

const ChartDiversity = lazy(() => import("./ChartDiversity"));
const ChartBestSelling = lazy(() => import("./ChartBestSelling"));
const ChartNotSold = lazy(() => import("./ChartNotSold"));
import AllCards from "./AllCards";

export { ChartDiversity, ChartBestSelling, ChartNotSold, AllCards };
