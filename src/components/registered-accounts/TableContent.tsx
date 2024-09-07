import { LoadingSpinnerTable } from "../ui-kit/LoadingSpinner";

interface IHeader<T> {
  key: keyof T;
  label: string;
}

interface IProps<T> {
  headers: IHeader<T>[];
  data?: T[];
  totalElements?: number;
  isLoading?: boolean;
  emptyText: string;
  primaryKey: keyof T;
}

const TableContent = <T,>({
  headers,
  data,
  totalElements,
  isLoading,
  emptyText,
  primaryKey,
}: IProps<T>) => {
  return (
    <div className="inline-block  w-full py-2 align-middle">
      <div className="overflow-x-auto w-full  border-b border-gray-600 shadow sm:rounded-lg bg-[#FFFFFF1A]">
        <table className="min-w-full divide-y divide-gray-600">
          <thead className="bg-gray-600 ">
            <tr>
              {headers.map((header) => (
                <th
                  key={String(header.key)}
                  scope="col"
                  className="px-6 py-3 text-xs font-medium tracking-wider text-nowrap text-center uppercase text-gray-50"
                >
                  {header.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-gray-700 divide-y divide-gray-600">
            {isLoading ? (
              <tr>
                <td
                  colSpan={headers.length}
                  className="px-6 py-4 text-center whitespace-nowrap"
                >
                  <LoadingSpinnerTable />
                </td>
              </tr>
            ) : totalElements === 0 || !data ? (
              <tr>
                <td
                  colSpan={headers.length}
                  className="px-6 py-4 text-center whitespace-nowrap"
                >
                  <div className="text-sm text-gray-50">{emptyText}</div>
                </td>
              </tr>
            ) : (
              data.map((item) => (
                <tr key={String(item[primaryKey])}>
                  {renderRow(item, headers)}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableContent;

const renderRow = <T,>(item: T, headers: IHeader<T>[]) => {
  return (
    <>
      {headers.map(({ key }) => (
        <td
          className="px-6 py-4 text-center whitespace-nowrap"
          key={String(key)}
        >
          <div className="text-sm text-gray-50">
            {item[key] ? String(item[key]) : "-"}
          </div>
        </td>
      ))}
    </>
  );
};
