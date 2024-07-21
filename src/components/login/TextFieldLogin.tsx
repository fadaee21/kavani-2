import React, { InputHTMLAttributes, ReactNode, forwardRef } from "react";
import clsx from "clsx/lite";

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  state: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  id: string;
  label: string;
  icon?: ReactNode;
  onClick?: () => void;
  labelClass?: string;
  inputClass?: string;
}

export const TextFieldLogin = forwardRef<HTMLInputElement, IProps>(
  (
    {
      state,
      onChange,
      label,
      id,
      onClick,
      icon,
      labelClass,
      inputClass,
      className, // Get the className prop
      ...rest
    },
    ref
  ) => {
    const labelClasses = clsx(
      "block w-full mb-1 text-sm font-medium leading-6 text-gray-900 text-slate-300 whitespace-nowrap",
      labelClass
    );
    const inputClasses = clsx(
      "w-full h-14 rounded-2xl border-0 py-1.5 block shadow-sm ring-inset placeholder-gray-400 text-gray-50 text-lg leading-6 pl-10 bg-[#FFFFFF1A]  ring-gray-300 ring-gray-600 focus:ring-0 focus:ring-inset  focus:ring- focus:ring-indigo-500",
      inputClass
    );

    return (
      <>
        <label htmlFor={id} className={labelClasses}>
          {label}
        </label>
        <div className={`relative w-full ${className}`}>
          <input
            className={inputClasses}
            value={state}
            onChange={onChange}
            id={id}
            name={id}
            ref={ref}
            {...rest}
          />
          {icon && (
            <button
              onClick={onClick}
              type="button"
              aria-label={label}
              className="absolute inset-y-0 left-0 pl-3 flex items-center cursor-default"
            >
              {icon}
            </button>
          )}
        </div>
      </>
    );
  }
);
