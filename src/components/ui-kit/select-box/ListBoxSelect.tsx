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
          "relative cursor-default select-none py-2 pl-3 pr-3 text-gray-900 dark:text-slate-300",
          active ? "bg-indigo-600 text-white" : "",
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
        <Label className="block text-sm font-medium leading-6 text-gray-900 dark:text-slate-300">
          {label}
        </Label>

        <div className="relative ">
          <ListboxButton
            className={clsx(
              "relative w-full cursor-default rounded-md bg-white dark:bg-gray-700 py-1.5 pl-3 pr-3 text-left text-gray-900 dark:text-slate-300 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6",
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
                className="h-5 w-5 text-gray-400 dark:text-slate-400"
                aria-hidden="true"
              />
            </span>
          </ListboxButton>
          <ListboxOptions className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white dark:bg-gray-700 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {items.map(renderItem)}
          </ListboxOptions>
        </div>
        {description && (
          <p className="text-sm text-gray-500 dark:text-slate-400">
            {description}
          </p>
        )}
      </Listbox>
    </div>
  );
}
