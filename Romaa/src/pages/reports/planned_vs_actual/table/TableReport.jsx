
import { tableData } from "../../../../components/Data";
import Table from "../../../../components/Table";

const tablecolumn = [
  { key: "projectName", label: "Project Name" },
  { key: "projectPlanned", label: "Project Planned" },
  { key: "pendingWork", label: "Pending work" },
  { key: "variance", label: "Variance" },
];


const TableReport = () => {
  return (
    <div className="font-roboto-flex flex flex-col h-full">
      <Table
        ExportModal={false}
        endpoint={tableData}
        columns={tablecolumn}  
        onExport={() => console.log("Exporting...")}
        addButtonLabel={null}
        addButtonIcon={null}
        exportModal={false}
      />
    </div>
  );
};

export default TableReport;