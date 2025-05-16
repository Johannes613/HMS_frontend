import React, { useEffect } from "react";
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

function TreatmentBarChart({ data }) {
  // dummy treatment types
  const treatmentTypes = [
    "Appendectomy surgery",

    "General health checkup",
    "Physical therapy session",
    "Root canal Surgery",
    "Root canal procedure",
    "Skin allergy treatment",
    "Surgery",
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


  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        {treatmentTypes?.map((type, index) => (
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
// Example usage:
