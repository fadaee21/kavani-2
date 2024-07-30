interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  isChecked: boolean;
  label?: string;
}

const CheckboxOne = ({ isChecked, label, ...rest }: IProps) => {
  return (
    <div>
      <label
        htmlFor="checkboxLabelOne"
        className="flex items-center text-xs text-gray-50 cursor-pointer select-none sm:text-sm dark:text-slate-300"
      >
        <div className="relative">
          <input
            type="checkbox"
            id="checkboxLabelOne"
            className="sr-only"
            {...rest}
          />
          <div
            className={`flex ml-2 mr-1 h-5 w-5 items-center justify-center rounded-md ring-2 ring-gray-300 dark:ring-gray-600 `}
          >
            <span
              className={`h-4 w-4 rounded-md ${
                isChecked
                  ? "bg-orange-600 dark:bg-orange-600 "
                  : "bg-white dark:bg-gray-300"
              }`}
            ></span>
          </div>
        </div>
        {label}
      </label>
    </div>
  );
};

export default CheckboxOne;
