import { LoadingSpinnerTable } from "../ui-kit/LoadingSpinner";

interface IProps {
  headers: { key: string; label: string }[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any[];
  totalElements?: number;
  isLoading?: boolean;
  emptyText: string;
  primaryKey: string;
}

const TableContent = ({
  headers,
  data,
  totalElements,
  isLoading,
  emptyText,
  primaryKey,
}: IProps) => {
  return (
    <div className="inline-block  w-full py-2 align-middle">
      <div className="overflow-x-auto w-full  border-b border-gray-600 shadow sm:rounded-lg bg-[#FFFFFF1A]">
        <table className="min-w-full divide-y divide-gray-600">
          <thead className="bg-gray-600">
            <tr>
              {headers.map((header) => (
                <th
                  key={header.key}
                  scope="col"
                  className="px-6 py-3 text-xs font-medium tracking-wider text-center uppercase text-gray-50"
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
                <tr key={item[primaryKey]}>{renderRow(item, headers)}</tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableContent;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const renderRow = (item: any, headers: { key: string; label: string }[]) => {
  return (
    <>
      {Object.values(headers).map(({ key }) => (
        <td className="px-6 py-4 text-center whitespace-nowrap" key={key}>
          <div className="text-sm text-gray-50">{item[key] || "-"}</div>
        </td>
      ))}
    </>
  );
};
