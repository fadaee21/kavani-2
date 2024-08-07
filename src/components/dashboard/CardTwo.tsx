interface IProps {
  bestSoldSupplyName: string;
}
const CardTwo = ({ bestSoldSupplyName }: IProps) => {
  return (
    <div className="max-w-xl  p-4  border  rounded-lg shadow-sm md:p-6 border-gray-700 bg-gray-800">
      <div className="flex justify-between items-center mb-4">
        <p className="text-lg font-semibold">تعداد کالاها نزد کاوانی</p>
      </div>
      <div className="flex justify-between items-center mb-4">
        <p className="text-lg font-semibold">{bestSoldSupplyName}</p>
      </div>
    </div>
  );
};

export default CardTwo;
