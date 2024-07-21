import ChevronLeft from "@/assets/icons/chevron-left.svg?react";
import router from "@/routes";

const ReturnButtonLogin = () => {
  const handleNavigate = () => {
    router.navigate(-1);
  };

  return (
    <button
      onClick={handleNavigate}
      className={
        "w-28 flex items-center justify-center py-2 rounded-md shadow-md whitespace-nowrap bg-[#FD4718] hover:bg-[#FD4718]/90   text-gray-50"
      }
    >
      بازگشت
      <ChevronLeft className="w-4 h-4 mr-4" />
    </button>
  );
};

export default ReturnButtonLogin;
