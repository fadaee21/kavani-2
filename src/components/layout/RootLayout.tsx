import { Outlet } from "react-router-dom";
import Sidebar from "../sidebar/Sidebar";
import { ToastContainer } from "react-toastify";
function RootLayout() {
  return (
    <Sidebar>
      <Outlet />
      <ToastContainer
        position="bottom-right"
        autoClose={2500}
        rtl
        className={"sm:w-96 w-full "} //TODO:change the style for different theme
      />
    </Sidebar>
  );
}

export default RootLayout;
// NOTE: The ToastContainer component is used in the Login page as well. If you change the style here, you should also modify it there.
