import { createBrowserRouter } from "react-router-dom";
import DashboardPage from "@pages/dashboard/DashboardPage";
import LoginPage from "@pages/login/LoginPage";
import RegisteredAccount from "@pages/registered-account/RegisteredAccount";
import SettingPage from "@pages/setting/SettingPage";
import RequireAuth from "@components/auth/RequireAuth";
import PersistLogin from "@components/auth/PersistLogin";
import RootLayout from "@components/layout/RootLayout";
import NotFoundPage from "@pages/not-found/NotFoundPage";
import Test from "./pages/test";
import PaymentSuccess from "./pages/success-payment/SuccessPayment";
import ServicesList from "./pages/services-list/ServicesList";
import KolLIst from "./pages/kol-list/KolLIst";

const router = createBrowserRouter([
  {
    id: "root",
    path: "/",
    // loader: protectedLoader,
    element: <PersistLogin />,
    children: [
      {
        element: <RootLayout />,
        children: [
          {
            path: "kvn",
            element: <RequireAuth allowedRoles={["GOOD_SUPPLIER"]} />,
            children: [
              {
                index: true,
                element: <DashboardPage />,
              },
            ],
          },
          {
            path: "kvn",
            element: <RequireAuth allowedRoles={["KOL", "KAVANI"]} />,
            children: [
              {
                path: "registered-account",
                element: <RegisteredAccount />,
              },
            ],
          },
          {
            path: "kvn",
            element: <RequireAuth allowedRoles={["KAVANI"]} />,
            children: [
              {
                path: "registered-account",
                element: <RegisteredAccount />,
              },
              {
                path: "services-list",
                element: <ServicesList />,
              },
              {
                path: "kol-list",
                element: <KolLIst />,
              },
            ],
          },

          // {
          //   path: "KAVANI",
          //   element: <RequireAuth allowedRoles={["KAVANI","KOL","GOOD_SUPPLIER"]} />,
          //   children: [
          //     {
          //       index: true,
          //       // element: <ProjectsPage />,
          //     },
          //   ],
          // },
          {
            path: "settings",
            element: (
              <RequireAuth allowedRoles={["KAVANI", "KOL", "GOOD_SUPPLIER"]} />
            ), //add all allowed roles
            children: [
              {
                index: true,
                element: <SettingPage />,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    index: true,
    // loader: loginLoader,
    element: <LoginPage />,
  },
  {
    path: "success-payment",
    element: <PaymentSuccess />,
  },
  {
    path: "test",
    element: <Test />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export default router;

// function protectedLoader({ request }: LoaderFunctionArgs) {
//   const token = Cookies.get("refreshToken");
//   if (!token) {
//     const params = new URLSearchParams();
//     params.set("from", new URL(request.url).pathname);
//     return redirect("/?" + params.toString());
//   }
//   return null;
// }
