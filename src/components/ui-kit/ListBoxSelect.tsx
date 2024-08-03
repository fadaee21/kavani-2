import React from "react";
import {
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import ChevronDown from "@/assets/icons/chevron-down.svg?react";
import clsx from "clsx";

interface IProps {
  selected: SelectedOption | null;
  setSelected: React.Dispatch<React.SetStateAction<SelectedOption | null>>;
  items: SelectedOption[];
  className?: string;
  label?: string;
  description?: string;
  disabled?: boolean;
  placeholder?: string;
}

export default function ListBoxSelect({
  items,
  selected,
  setSelected,
  label,
  description,
  disabled,
  className,
  placeholder,
}: IProps) {
  const renderItem = (item: SelectedOption) => (
    <ListboxOption
      key={item.value}
      value={item}
      className={({ active, selected }) =>
        clsx(
          "relative cursor-default select-none py-2 pl-3 pr-3  placeholder-gray-400 text-gray-50",
          active ? "bg-[#FD4718] text-white" : "",
          selected ? "font-semibold" : "font-normal"
        )
      }
    >
      {({ selected }) => (
        <div className="flex items-center">
          <span
            className={clsx(
              "ml-3 block truncate",
              selected ? "font-semibold" : "font-normal"
            )}
          >
            {item.label}
          </span>
        </div>
      )}
    </ListboxOption>
  );

  return (
    <div className={clsx("w-full", className)}>
      <Listbox value={selected} onChange={setSelected} disabled={disabled}>
        {label && (
          <Label className="block w-full mb-1 text-sm font-medium leading-6   text-gray-50 whitespace-nowrap">
            {label}
          </Label>
        )}

        <div className="relative w-full">
          <ListboxButton
            className={clsx(
              "relative w-full h-12 md:h-16 rounded-3xl border-0 py-1.5 pl-10 pr-3 block shadow-sm ring-inset  text-gray-50 text-md leading-6 bg-[#FFFFFF1A]   ring-gray-600 focus:ring-0 outline-none",
              disabled && "opacity-50 cursor-not-allowed"
            )}
          >
            <span className="flex items-center text-md leading-6">
              {selected?.label ? (
                <span
                  className={clsx(
                    "ml-3 block truncate text-gray-50 "
                    // selected ? "font-semibold" : "font-normal"
                  )}
                >
                  {selected?.label}
                </span>
              ) : (
                <span className="ml-3 block truncate text-gray-400 ">
                  {selected?.label ?? placeholder}
                </span>
              )}
            </span>
            <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2">
              <ChevronDown
                className="h-5 w-5 text-slate-400"
                aria-hidden="true"
              />
            </span>
          </ListboxButton>
          <ListboxOptions className="absolute z-10 max-h-56 w-full overflow-auto rounded-md  bg-gray-700 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {items.map(renderItem)}
          </ListboxOptions>
        </div>
        {description && (
          <p className="text-sm  text-slate-400">{description}</p>
        )}
      </Listbox>
    </div>
  );
}
