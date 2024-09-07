import { saveAs } from "file-saver";
import { utils, write, WorkBook } from "xlsx";
import { useState } from "react";
import axiosPrivate from "@/services/axios";
import { PrimaryButtons } from "./ui-kit/buttons/PrimaryButtons";
import DownloadIcon from "@/assets/icons/arrow-down-tray.svg?react";
import { LoadingSpinnerButton } from "./ui-kit/LoadingSpinner";

interface ExcelExportProps {
  fileName: string;
  linkAll: string;
  useIn: string;
}

const ExcelExport = ({ fileName, linkAll, useIn }: ExcelExportProps) => {
  const [loading, setLoading] = useState(false);
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  const exportToCSV = (
    apiData: Record<string, string>[] | undefined,
    fileName: string
  ) => {
    if (!apiData) return;
    const ws = utils.json_to_sheet(apiData);
    const wb: WorkBook = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    saveAs(data, fileName + fileExtension);
  };

  const exportAllFunc = async () => {
    setLoading(true);
    try {
      const response = await axiosPrivate.get(linkAll);
      const allData = await response.data;
      switch (useIn) {
        case "reg": {
          console.log({ allData });
          const resContent: IRegisteredUser[] = allData.body.content;
          const ad = resContent.map((i) => {
            const {
              first_name,
              last_name,
              mobile,
              email,
              voucher,
              status,
              serviceName,
            } = i;

            return {
              "نام و نام خانوادگی":
                (first_name ?? "-") + " " + (last_name ?? "-"),
              موبایل: mobile ?? "-",
              ایمیل: email ?? "-",
              "نام سرویس": serviceName ?? "-",
              وضعیت: status === "REGISTERED" ? "موفق" : "ناموفق",
              "کد تخفیف": voucher ?? "-",
            };
          });
          // console.log(ad);
          exportToCSV(ad, fileName);
          break;
        }
        default:
          break;
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PrimaryButtons
      onClick={exportAllFunc}
      disabled={loading}
      className="ml-auto bg-secondary text-white font-bold py-2 px-4 flex items-center justify-center rounded-xl"
    >
      {loading ? (
        <LoadingSpinnerButton />
      ) : (
        <DownloadIcon
          className="block size-6 text-gray-50"
          aria-hidden="true"
        />
      )}
      خروجی اکسل
    </PrimaryButtons>
  );
};

export default ExcelExport;
