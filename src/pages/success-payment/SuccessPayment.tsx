import CheckCircle from "@/assets/icons/check-circle-green-micro.svg?react";
import { useSearchParams } from "react-router-dom";
const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const isPaid = searchParams.get("isPaid");
  const voucher = searchParams.get("voucher");

  // console.log({ isPaid, voucher });

  if (isPaid === "false") {
    return <div>پرداخت ناموفق</div>; //TODO:give better style for this part
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-16 rounded shadow-md text-center">
        <CheckCircle className="mx-auto mb-4 w-16 h-16 text-green-400" />
        <h2 className="text-xl mb-2">پرداخت شما با موفقیت انجام شد.</h2>
        <p className="text-lg text-gray-600 mb-4">با تشکر از خرید شما</p>
        <p className="text-lg text-gray-600 mb-4">کد تخفیف: {voucher}</p>
      </div>
    </div>
  );
};

export default PaymentSuccess;
