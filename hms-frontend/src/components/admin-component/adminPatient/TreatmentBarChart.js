import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

function TreatmentBarChart({ year }) {
  const [formattedData, setFormattedData] = useState([]);
  const allKeys = new Set();
  //  treatment types
  const [treatments, setTreatments] = useState([]);
  const colors = [
    "#8884d8",
    "#82ca9d",
    "#ffc658",
    "#ff7f50",
    "#a0522d",
    "#8a2be2",
    "#2e8b57",
  ]; // Add more if needed
  useEffect(() => {
    fetchTreatmentProcedures();
  }, [year]);
  const transformDataForChart = (data) => {
    const result = {};

    data.forEach(({ Month_Name, description, count }) => {
      if (!result[Month_Name]) {
        result[Month_Name] = { month: Month_Name };
      }
      result[Month_Name][description] = count;
    });

    return Object.values(result); // Convert object to array
  };

  const fetchTreatmentProcedures = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/four-six/treatment-procedures",
        {
          params: {
            year: year,
          },
        }
      );
      const data = response.data;
      console.log(data);
      allKeys.clear();
      data.map((item) => {
        allKeys.add(item.description);
      });
      setFormattedData([]);
      setTreatments(Array.from(allKeys));
      setFormattedData(transformDataForChart(data));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    console.log(treatments);
  }, [treatments]);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={formattedData}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        {treatments?.map((type, index) => (
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
}
export default TreatmentBarChart;