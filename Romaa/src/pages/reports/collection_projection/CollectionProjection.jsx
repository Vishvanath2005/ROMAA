import React from "react";
import Title from "../../../components/Title";
import { barchartData } from "../../../components/Data";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const CollectionProjection = () => {
  return (
    <div>
     <div className="mb-3">
       <Title
        title="Reports"
        sub_title="Collection Projection"
        page_title="Collection Projection"
      />
     </div>
      <div className="bg-white rounded-md">
        <div className=" flex justify-between items-center p-5 ">
          <p className="text-lg font-bold">Collection Projection</p>
        </div>
        <div className="flex items-center ">
          <ResponsiveContainer width={1020} height={500}>
            <BarChart
              data={barchartData}
              margin={{ top: 20, right: 30, left: 10, bottom: 40 }}
              barGap={10}
              barCategoryGap="20%"
            >
              <XAxis dataKey="project" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} />
              <Tooltip />
              <Bar dataKey="daysA" fill="#e2b343" name="Days A"/>
              <Bar dataKey="daysB" fill="#70c36b" name="Days B" />
            </BarChart>
          </ResponsiveContainer>
          <div className="">
            <p>X - Day</p>
            <p>y - Project</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectionProjection;
