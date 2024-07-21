import Dashboard from "@/assets/icons/dashboard.svg?react";
import Team from "@/assets/icons/team.svg?react";


// 1:SUPERUSER
// 2:user
const navList = [
  {
    id: "1a",
    name: "داشبورد",
    href: "/SUPERUSER",
    index: true,
    icon: Dashboard,
    role: "SUPERUSER",
  },
  {
    id: "2a",
    name: "لیست ثبت نام ها",
    href: "/SUPERUSER/registered-account",
    icon: Team,
    role: "SUPERUSER",
  },
 
  {
    id: "3a",
    name: "ثبت نام",
    href: "/SUPERUSER/new-register",
    icon: Team,
    role: "SUPERUSER",
  },
 

 
  // {
  //   id: "3a",
  //   name: "پروژه‌ها",
  //   href: "/SUPERUSER/projects",
  //   icon: Projects,
  //   role: "SUPERUSER",
  // },
  //   {
  //     id: 4,
  //     name: "تقویم",
  //     href: "/SUPERUSER/calendar",
  //     icon: Calendar,
  //   },
  //   {
  //     id: 5,
  //     name: "گزارش‌ها",
  //     href: "/SUPERUSER/report",
  //     icon: Reports,
  //   },
  //   {
  //     id: 6,
  //     name: "اسناد",
  //     href: "/SUPERUSER/document",
  //     icon: Document,
  //   },
];

export default navList;
