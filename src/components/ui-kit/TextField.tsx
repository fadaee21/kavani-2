import React, { InputHTMLAttributes, ReactNode, forwardRef } from "react";
import { Field, Input, Label } from "@headlessui/react";
import clsx from "clsx/lite";

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  state: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  id: string;
  label?: string;
  icon?: ReactNode;
  onClick?: () => void;
  labelClass?: string;
  inputClass?: string;
}

export const TextField = forwardRef<HTMLInputElement, IProps>(
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
      "block w-full mb-1 text-sm font-medium leading-6 text-slate-300 whitespace-nowrap",
      labelClass
    );
    const inputClasses = clsx(
      "w-full h-12 md:h-16 rounded-3xl border-0 py-1.5 block shadow-sm ring-inset placeholder-gray-400 text-gray-50 text-lg leading-6 pl-10 bg-[#FFFFFF1A]  ring-gray-300 ring-gray-600 focus:ring-0 ",
      inputClass
    );

    return (
      <div className={`relative w-full ${className}`}>
        <Field>
          {label && (
            <Label htmlFor={id} className={labelClasses}>
              {label}
            </Label>
          )}

          <Input
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
              className="absolute inset-y-0 left-0 pl-3 min-w-10 flex items-center cursor-pointer text-gray-400 focus:ring-0 outline-none z-10 "
            >
              {icon}
            </button>
          )}
        </Field>
      </div>
    );
  }
);
