import { useState } from "react";
import useSWR from "swr";
import Pagination from "../ui-kit/Pagination";
import { LoadingSpinnerTable } from "../ui-kit/LoadingSpinner";

interface IProps {
  selectedOption: {
    value: string;
    label: string;
  } | null;
}

const pageSize = 20;

const TableContent = ({ selectedOption }: IProps) => {
  const [page, setPage] = useState(1);
  const selectedOptionValue = selectedOption?.value;
  const { data, isLoading } = useSWR<ResponseData<User>>(
    `/panel/accounts/get/${selectedOptionValue}/${page - 1}/${pageSize}`
  );
  const totalElements = data?.body.totalElements || 0;

  return (
    <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
        <div className="overflow-hidden border-b border-gray-600 shadow sm:rounded-lg bg-[#FFFFFF1A]">
          <table className="min-w-full divide-y divide-gray-600">
            <thead className="bg-gray-600">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-xs font-medium tracking-wider text-center uppercase text-gray-50"
                >
                  نام
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 whitespace-nowrap text-xs font-medium tracking-wider text-center uppercase text-gray-50"
                >
                  نام خانوادگی
                </th>

                <th
                  scope="col"
                  className="px-6 py-3 text-xs font-medium tracking-wider text-center uppercase text-gray-50"
                >
                  موبایل
                </th>

                <th
                  scope="col"
                  className="px-6 py-3 text-xs font-medium tracking-wider text-center uppercase text-gray-50"
                >
                  کد تخفیف
                </th>
              </tr>
            </thead>
            <tbody className="bg-gray-700 divide-y divide-gray-600">
              {isLoading ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-4 text-center whitespace-nowrap"
                  >
                    <LoadingSpinnerTable />
                  </td>
                </tr>
              ) : totalElements === 0 || !data ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-4 text-center whitespace-nowrap"
                  >
                    <div className="text-sm text-gray-50">
                      هیچ کاربری یافت نشد
                    </div>
                  </td>
                </tr>
              ) : (
                data.body.content.map((user) => {
                  const {
                    first_name,
                    last_name,
                    mobile,

                    id,
                    voucher,
                  } = user;
                  return (
                    <tr key={id}>
                      <td className="px-6 py-4 text-center whitespace-nowrap">
                        <div className="text-sm text-gray-50">
                          {first_name || "-"}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center whitespace-nowrap">
                        <div className="text-sm text-gray-50">
                          {last_name || "-"}
                        </div>
                      </td>

                      <td className="px-6 py-4 text-center whitespace-nowrap">
                        <div className="text-sm text-gray-50">
                          {mobile || "-"}
                        </div>
                      </td>

                      <td className="px-6 py-4 text-center whitespace-nowrap">
                        <div className="text-sm text-gray-50">
                          {voucher || "-"}
                        </div>
                      </td>
                    </tr>
                  );
                })
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
