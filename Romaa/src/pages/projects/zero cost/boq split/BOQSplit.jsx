import { BOQSplitData } from "../../../../components/Data";
import Table from "../../../../components/Table";

const Columns = [
  { label: "Item Description", key: "itemdesc" },
  { label: "Quantity", key: "quantity" },
  { label: "Unit", key: "unit" },
  { label: "Rate", key: "rate" },
  { label: "Amount", key: "amount" },
  { label: "Materials", key: "materials" },
  { label: "Machinery", key: "machinery" },
  {
    label: "Fuel",
    key: "fuel",
    render: (item) => (
      <span
        className={` ${item.varqty < 0 ? "text-red-500 font-semibold" : ""}`}
      >
        {`₹ ${item.fuel}`}
      </span>
    ),
  },
];

const BOQSplit = () => {
  return (
    <Table
      contentMarginTop="mt-0"
      endpoint={BOQSplitData}
      columns={Columns}
      exportModal={false}
    />
  );
};

export default BOQSplit;
