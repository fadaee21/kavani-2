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

export default function ListBoxSelectLogin({
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
          "relative cursor-default select-none py-2 pl-3 pr-3  text-slate-300",
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
        <Label className="block w-full mb-1 text-sm font-medium leading-6  text-slate-300 whitespace-nowrap">
          {label}
        </Label>

        <div className="relative w-full">
          <ListboxButton
            className={clsx(
              "relative w-full h-14 rounded-2xl border-0 py-1.5 pl-10 pr-3 block shadow-sm ring-inset placeholder:text-gray-400 text-md leading-6 bg-[#FFFFFF1A]  text-gray-400  ring-gray-600 focus:ring-0 focus:ring-inset focus:ring-indigo-500",
              disabled && "opacity-50 cursor-not-allowed"
            )}
          >
            <span className="flex items-center">
              <span className="ml-3 block truncate">
                {selected?.label ?? placeholder}
              </span>
            </span>
            <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2">
              <ChevronDown
                className="h-5 w-5 text-slate-400"
                aria-hidden="true"
              />
            </span>
          </ListboxButton>
          <ListboxOptions className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md  bg-gray-700 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {items.map(renderItem)}
          </ListboxOptions>
        </div>
        {description && (
          <p className="text-sm  text-slate-400">
            {description}
          </p>
        )}
      </Listbox>
    </div>
  );
}
