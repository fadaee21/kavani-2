import { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  fullWidth?: boolean;
}

export const PrimaryButtonsLogin: React.FC<ButtonProps> = ({
  children,
  className,
  disabled,
  fullWidth = false,
  ...rest
}) => {
  const buttonStyle = clsx(
    {
      "bg-gray-400 text-gray-500 cursor-not-allowed": disabled,
      "bg-[#FD4718] hover:bg-[#FD4718]/90   text-gray-800 ":
        !disabled,
      "flex justify-center px-4 py-3 text-md font-semibold text-white rounded-3xl shadow-md whitespace-nowrap":
        true,
      "w-full": fullWidth,
    },
    className
  );
  return (
    <button className={buttonStyle} disabled={disabled} {...rest}>
      {children}
    </button>
  );
};
