import navList from "@/navList";
import { useAuth } from "@/hooks/context/useAuth";
import Dropdown from "../ui-kit/Dropdown";
import Avatar from "../ui-kit/Avatar";
// import Settings from "@/assets/icons/settings.svg?react";
import Bell from "@/assets/icons/bell.svg?react";
import Bars3 from "@/assets/icons/bars-3.svg?react";
import SlideOver from "./SlideOver";
import { useState } from "react";
import ArrowLongRight from "@/assets/icons/arrow-right.svg?react";
import NavLinkItem from "./NavLinkItem";
import logoOrange from "@/assets/images/logo-orange-final.png";

function Sidebar({ children }: TChildren) {
  const [open, setOpen] = useState(false);
  const { auth } = useAuth();

  const sidebarContent = (
    <aside className="fixed top-0 bottom-0 z-10 flex flex-col h-screen px-6 pb-4 bg-[#27282B] w-72 shrink-0">
      <div className="flex items-center justify-between h-16">
        <img src={logoOrange} alt="kavani logo" className="h-24 mt-4" />
        <button
          type="button"
          className="outline-none"
          onClick={() => setOpen(false)}
        >
          <ArrowLongRight
            className="block w-6 h-6 md:hidden text-gray-50"
            aria-hidden="true"
          />
        </button>
      </div>
      <nav className="flex flex-col flex-1 mt-6 mb-3 text-gray-50">
        <ul className="flex flex-col flex-1 gap-y-7" role="list">
          <li>
            <ul>
              {navList
                .filter((item) => item.role === auth?.roles)
                .map((item) => (
                  <li key={item.id}>
                    <NavLinkItem item={item} setOpen={setOpen} />
                  </li>
                ))}
            </ul>
          </li>
          {/* <li className="mt-auto">
            <NavLinkItem
              item={{
                name: "تنظیمات",
                href: "/settings",
                icon: Settings,
              }}
              setOpen={setOpen}
            />
          </li> */}
        </ul>
      </nav>
    </aside>
  );

  return (
    <div className="flex justify-start w-full overflow-x-hidden">
      <SlideOver
        setOpen={setOpen}
        open={open}
        sidebarContent={sidebarContent}
      />
      <div className="w-full min-h-screen mr-0 md:mr-72 bg-[#27282B]">
        <header className="flex items-center justify-end w-full h-16 pr-5 text-gray-50 ">
          <Bars3
            className="w-5 h-5 ml-auto cursor-pointer md:hidden"
            onClick={() => setOpen(!open)}
          />

          {auth?.roles === "KAVANI" ? (
            <p className="text-sm font-medium ml-auto">
              به پنل کاربری کاوانی خوش آمدید
            </p>
          ) : (
            <p className="text-sm font-medium ml-auto">
              کاربر {auth?.user} به پنل کاربری کاوانی خوش آمدید
            </p>
          )}

          <Bell
            className="w-5 h-5 cursor-pointer"
            onClick={() => console.log("bell")}
          />
          <div className="flex items-center pr-4 mr-4 border-r-2 ">
            <Avatar />
            <Dropdown auth={auth} />
          </div>
        </header>
        <div
          className="min-w-full bg-zinc-700"
          style={{ minHeight: "calc(100vh - 4rem)" }}
        >
          <main className="container py-10 mx-auto">
            <div className="px-8 text-gray-50">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
