import clsx from "clsx";
import { Button } from "@headlessui/react";

export const PrimaryButtons: React.FC<
  React.ComponentPropsWithoutRef<typeof Button>
> = ({ children, className, disabled, ...rest }) => {
  const buttonStyle = clsx(
    {
      "bg-gray-400 text-gray-500 cursor-not-allowed": disabled,
      "bg-orange-600 hover:bg-orange-600/90 text-gray-800": !disabled,
      "flex justify-center h-12 p-3 rounded-3xl text-sm font-semibold text-white shadow-md whitespace-nowrap justify-center items-center gap-2 inline-flex":
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
