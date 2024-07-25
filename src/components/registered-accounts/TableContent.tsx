// File path: components/TableContent.tsx

import { Key, useState } from "react";
import useSWR from "swr";
import Pagination from "../ui-kit/Pagination";
import { LoadingSpinnerTable } from "../ui-kit/LoadingSpinner";

interface IProps {
  headers: { key: string; label: string }[];
  fetchUrl: (page: number, pageSize: number) => string;
  pageSize?: number;
}

const TableContent = ({ headers, fetchUrl, pageSize = 20 }: IProps) => {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useSWR(fetchUrl(page - 1, pageSize));
  const totalElements = data?.body.totalElements || 0;

  return (
    <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
        <div className="overflow-hidden border-b border-gray-600 shadow sm:rounded-lg bg-[#FFFFFF1A]">
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
                    <div className="text-sm text-gray-50">
                      هیچ کاربری یافت نشد
                    </div>
                  </td>
                </tr>
              ) : (
                data.body.content.map(
                  (item: { id: Key | null | undefined }) => (
                    <tr key={item.id}>{renderRow(item, headers)}</tr>
                  )
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
      <Pagination
        currentPage={page}
        onPageChange={(value) => setPage(value)}
        pageSize={pageSize}
        totalCount={totalElements}
      />
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
