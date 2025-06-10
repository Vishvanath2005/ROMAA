import React, { useEffect, useState } from "react";
import ButtonBg from "../../../components/Button";
import Title from "../../../components/Title";
import { SupplierOutstandingData } from "../../../components/Data";
import { TbFileExport } from "react-icons/tb";
import { BiFilterAlt } from "react-icons/bi";
import { ChevronDown, ChevronUp } from "lucide-react";
import { HiArrowsUpDown } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { useSearch } from "../../../components/SearchBar";
import Pagination from "../../../components/Pagination";
import Filters from "../../../components/Filters";

const SupplierOutstanding = () => {
  const { searchTerm } = useSearch();
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterModal, setFilterModal] = useState(false);
  const [expandedRow, setExpandedRow] = useState(null);

  const [filterParams, setFilterParams] = useState({
    fromdate: "",
    todate: "",
  });

  const toggleRow = (index) => {
    setExpandedRow(expandedRow === index ? null : index);
  };

  const navigate = useNavigate();

  const itemsPerPage = 10;

  const handleFilter = ({ fromdate, todate }) => {
    setFilterParams({ fromdate, todate });
    setFilterModal(false);
    setCurrentPage(1);
  };

  useEffect(() => {
    const lowerSearchTerm = searchTerm.toString().toLowerCase();
    const fromDate = filterParams.fromdate
      ? new Date(filterParams.fromdate)
      : null;
    const toDate = filterParams.todate ? new Date(filterParams.todate) : null;

    const filtered = SupplierOutstandingData.filter((item) => {
      const matchesSearch = Object.values(item).some((value) => {
        const lowerValue = value.toString().toLowerCase();
        return (
          lowerValue.includes(lowerSearchTerm) ||
          (!isNaN(searchTerm) && lowerValue.includes(searchTerm))
        );
      });
      const formattedDate = item.date
        ? item.date.split("-").reverse().join("-")
        : null;

      const itemDate = formattedDate ? new Date(formattedDate) : null;

      const matchesDate =
        (!fromDate || (itemDate && !isNaN(itemDate) && itemDate >= fromDate)) &&
        (!toDate || (itemDate && !isNaN(itemDate) && itemDate <= toDate));

      return matchesSearch && matchesDate;
    });

    setFilteredData(filtered);
  }, [searchTerm, filterParams]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className="font-roboto-flex flex flex-col h-full">
      <div className="lg:flex lg:justify-between">
        <Title
          title="Finance"
          sub_title="Supplier Outstanding"
          page_title="Supplier Outstanding"
        />
        <div className="my-2 flex flex-wrap items-center  gap-2">
          <ButtonBg
            button_icon={<TbFileExport size={23} />}
            button_name="Export"
            bgColor="bg-white"
            textColor="text-darkest-blue"
          />
          <ButtonBg
            button_icon={<BiFilterAlt size={23} />}
            button_name="Filter"
            bgColor="bg-white"
            textColor="text-darkest-blue"
            onClick={() => setFilterModal(true)}
          />
        </div>
      </div>

      <div className="mt-4 overflow-y-auto no-scrollbar h-11/12">
        <div className="overflow-auto no-scrollbar">
          <table className="w-full whitespace-nowrap">
            <thead>
              <tr className="font-semibold text-sm bg-white border-b-4 border-light-blue">
                <th className="p-3.5 rounded-l-lg">S.no</th>
                {["Date", "Supplier", "Amount"].map((heading) => (
                  <th key={heading} className="p-3">
                    <h1 className="flex items-center justify-center gap-2">
                      {heading} <HiArrowsUpDown size={18} />
                    </h1>
                  </th>
                ))}
                <th className="pr-2 rounded-r-lg"></th>
              </tr>
            </thead>

            <tbody className="text-greyish  text-sm font-light">
              {paginatedData.length > 0 ? (
                paginatedData.map((data, index) => {
                  const globalIndex = startIndex + index;
                  return (
                    <React.Fragment key={globalIndex}>
                      <tr className="border-b-[3px] bg-white border-light-blue text-center">
                        <td className="rounded-l-lg py-3">{globalIndex + 1}</td>
                        <td>{data.date}</td>
                        <td>{data.supplier}</td>
                        <td>{data.amount}</td>
                        <td className="rounded-r-lg">
                          <button
                            onClick={() => toggleRow(globalIndex)}
                            className="cursor-pointer bg-blue-200  text-lg mr-2 rounded-sm p-0.5 text-blue-600"
                          >
                            {expandedRow === globalIndex ? (
                              <ChevronUp />
                            ) : (
                              <ChevronDown />
                            )}
                          </button>
                        </td>
                      </tr>

                      {expandedRow === globalIndex && (
                        <tr>
                          <td colSpan="5" className="px-10 py-1">
                            <div className=" bg-white p-2 py-4 rounded-md">
                              <table className="w-full text-left text-sm">
                                <thead className="bg-indigo-200 font-semibold">
                                  <tr className="border-b-[3px] border-white ">
                                    <th className="py-2 px-4 ">Bill</th>
                                    <th className="py-2 px-4">Amount</th>
                                    <th className="py-2 px-4">Particles</th>
                                  </tr>
                                </thead>
                                <tbody className="bg-gray-200">
                                  <tr>
                                    <td className="py-2 px-4 ">{data.bill}</td>
                                    <td className="py-2 px-4">
                                      {data.innerAmount}
                                    </td>
                                    <td className="py-2 px-4 ">
                                      {data.particles}
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-10 text-gray-500">
                    No matching results found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Pagination
        totalItems={filteredData.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
      {filterModal && (
        <Filters
          onclose={() => setFilterModal(false)}
          onFilter={handleFilter}
        />
      )}
    </div>
  );
};

export default SupplierOutstanding;
