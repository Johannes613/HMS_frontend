import axios from "axios";
import React from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

const data = [
  {
    month: "January",
    total_supply: 300,
    Drug_Name: "Metformin",
  },
  {
    month: "February",
    total_supply: 250,
    Drug_Name: "Metformin",
  },
  {
    month: "March",
    total_supply: 280,
    Drug_Name: "Metformin",
  },
];
const colors = [
  "#8884d8",
  "#82ca9d",
  "#ffc658",
  "#ff7f50",
  "#a0522d",
  "#8a2be2",
  "#2e8b57",
]; // Add more if needed

const DrugSupplyChart = ({ year }) => {
  const [supplyData, setSupplyData] = React.useState([]);
  const [drugs, setDrugs] = React.useState([]);
  //trasform data for chart
  const allKeys = new Set();
  const transformDataForChart = (data) => {
    const result = {};

    data.forEach(({ month, Drug_Name, total_supply }) => {
      if (!result[month]) {
        result[month] = { month: month };
      }
      result[month][Drug_Name] = total_supply;
    });

    return Object.values(result); // Convert object to array
  };

  const fetchSupplyData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/four-six/supply-trend",
        {
          params: {
            year: year,
          },
        }
      );
      const data = response.data;

      allKeys.clear();
      data.map((item) => {
        allKeys.add(item.Drug_Name);
      });
      setDrugs(Array.from(allKeys));
      setSupplyData([]);
      setSupplyData(transformDataForChart(data));
      //   setSupplyData(formattedData);
    } catch (error) {
      console.error("Error fetching supply data:", error);
    }
  };
  React.useEffect(() => {
    fetchSupplyData();
  }, [year]);

  React.useEffect(() => {
    console.log(drugs);
  }, [drugs]);
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={supplyData}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        {drugs?.map((type, index) => (
          <Bar
            key={type}
            dataKey={type}
            fill={colors[index % colors.length]}
            name={type}
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
};

export default DrugSupplyChart;
