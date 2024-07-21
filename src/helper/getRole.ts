export const getRole = (roles: Role[] | undefined): Role => {
  if (!roles) return "SUPERUSER";
  const roleSet = new Set(roles);
  if (roleSet.has("SUPERUSER")) return "SUPERUSER";
  if (roleSet.has("serviceProvider")) return "serviceProvider";
  if (roleSet.has("supplierGoods")) return "supplierGoods";
  return "SUPERUSER";
};
