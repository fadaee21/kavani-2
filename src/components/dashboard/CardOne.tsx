interface IProps {
  supplyCountInKavani: number;
}
const CardOne = ({ supplyCountInKavani }: IProps) => {
  return (
    <div className="max-w-xl  p-4  border  rounded-lg shadow-sm md:p-6 border-gray-700 bg-gray-800">
      <div className="flex justify-between items-center mb-4">
        <p className="text-lg font-semibold">پرفروش ترین کالا</p>
      </div>
      <div className="flex justify-between items-center mb-4">
        <p className="text-lg font-semibold">{supplyCountInKavani}</p>
      </div>
    </div>
  );
};

export default CardOne;
