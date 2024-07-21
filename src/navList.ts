import Dashboard from "@/assets/icons/dashboard.svg?react";
import Team from "@/assets/icons/team.svg?react";

// Kavani routes
const kavaniRoutes = [
  {
    id: "1a",
    name: "داشبورد",
    href: "/kavani_user",
    index: true,
    icon: Dashboard,
    role: "KAVANI",
  },
  {
    id: "2a",
    name: "لیست ثبت نام ها",
    href: "/kavani_user/registered-account",
    icon: Team,
    role: "KAVANI",
  },
  {
    id: "3a",
    name: "ثبت نام",
    href: "/kavani_user/new-register",
    icon: Team,
    role: "KAVANI",
  },
];

// Good Supplier routes
const goodSupplierRoutes = [
  {
    id: "1b",
    name: "داشبورد",
    href: "/kavani_user",
    index: true,
    icon: Dashboard,
    role: "GOOD_SUPPLIER",
  },
  {
    id: "2b",
    name: "لیست ثبت نام ها",
    href: "/kavani_user/registered-account",
    icon: Team,
    role: "GOOD_SUPPLIER",
  },
  {
    id: "3b",
    name: "ثبت نام",
    href: "/kavani_user/new-register",
    icon: Team,
    role: "GOOD_SUPPLIER",
  },
];

// Kol routes
const kolRoutes = [
  {
    id: "1c",
    name: "داشبورد",
    href: "/kavani_user",
    index: true,
    icon: Dashboard,
    role: "KOL",
  },
  {
    id: "2c",
    name: "لیست ثبت نام ها",
    href: "/kavani_user/registered-account",
    icon: Team,
    role: "KOL",
  },
  {
    id: "3c",
    name: "ثبت نام",
    href: "/kavani_user/new-register",
    icon: Team,
    role: "KOL",
  },
];

// Combine all routes
const navList = [
  ...kavaniRoutes,
  ...goodSupplierRoutes,
  ...kolRoutes,
];

export default navList;
