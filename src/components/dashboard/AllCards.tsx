import CardTwo from "./CardTwo";
import CardThree from "./CardThree";
import CardFour from "./CardFour";
import CardOne from "./CardOne";

const AllCards = ({
  data,
}: {
  data?: ResponseDataNoArray<IStatusGoodSupplier>;
}) => {
  return (
    <div className="w-full grid grid-cols-1 gap-4 md:grid-cols-2  2xl:gap-7.5">
      <CardOne bestSoldSupplyName={data?.body.bestSoldSupplyName ?? ""} />
      <CardTwo supplyCountInKavani={data?.body.supplyCountInKavani ?? -1} />
      <CardThree soldCount={data?.body.soldCount ?? -1} />
      <CardFour position={data?.body.position ?? -1} />
    </div>
  );
};

export default AllCards;
