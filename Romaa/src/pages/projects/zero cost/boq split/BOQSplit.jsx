import { BOQSplitData } from "../../../../components/Data";
import Table from "../../../../components/Table";


const Columns = [
  { label: "Item Description", key: "itemdesc" },
  { label: "Quantity", key: "quantity" },
  { label: "Unit", key: "unit" },
  { label: "Rate", key: "rate" },
  { label: "Amount", key: "amount" },
];

const BOQSplit = () => {


  return (
    <Table
    contentMarginTop="mt-0"
      endpoint={BOQSplitData}
      columns={Columns}
      routepoint={"viewboqsplit"}
      exportModal={false}
    />
  );
};

export default BOQSplit;
