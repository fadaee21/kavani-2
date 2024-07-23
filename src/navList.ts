import Dashboard from "@/assets/icons/dashboard.svg?react";
import Team from "@/assets/icons/team.svg?react";

// Kavani routes
const kavaniRoutes = [
  {
    id: "1a",
    name: "لیست ثبت نام ها",
    href: "/kvn/registered-account",
    icon: Team,
    role: "KAVANI",
  },
  {
    id: "2a",
    name: "ثبت نام",
    href: "/kvn/new-register",
    icon: Team,
    role: "KAVANI",
  },
];

// Good Supplier routes
const goodSupplierRoutes = [
  {
    id: "1b",
    name: "داشبورد",
    href: "/kvn",
    index: true,
    icon: Dashboard,
    role: "GOOD_SUPPLIER",
  },
];

// Services Supplier routes
const kolRoutes = [
  {
    id: "1c",
    name: "لیست ثبت نام ها",
    href: "/kvn/registered-account",
    icon: Team,
    role: "KOL",
  },
];

// Combine all routes
const navList = [...kavaniRoutes, ...goodSupplierRoutes, ...kolRoutes];

export default navList;
