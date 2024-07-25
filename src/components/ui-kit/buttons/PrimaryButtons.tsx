import clsx from "clsx";
import { Button } from "@headlessui/react";

export const PrimaryButtons: React.FC<
  React.ComponentPropsWithoutRef<typeof Button>
> = ({ children, className, disabled, ...rest }) => {
  const buttonStyle = clsx(
    {
      "bg-gray-400 text-gray-500 cursor-not-allowed": disabled,
      "bg-[#FD4718] hover:bg-[#FD4718]/90 text-gray-800": !disabled,
      "flex justify-center px-4 py-3 text-sm font-semibold text-white shadow-md whitespace-nowrap":
        true,
    },
    className
  );
  return (
    <Button className={buttonStyle} disabled={disabled} {...rest}>
      {children}
    </Button>
  );
};
