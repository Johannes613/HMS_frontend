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

function VisitTrendChart() {
  const [formattedData, setFormattedData] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [selectedGender, setSelectedGender] = useState("All");
  const [selectedAgeGroup, setSelectedAgeGroup] = useState("All");
  const [patientData, setPatientData] = useState([]);
  const [genders, setGenders] = useState(["All"]);
  const [ageGroups, setAgeGroups] = useState(["All"]);

  const colors = [
    "#8884d8", "#82ca9d", "#ffc658", "#ff7f50", "#a0522d",
    "#8a2be2", "#2e8b57", "#00bcd4", "#f44336",
  ];

  useEffect(() => {
    const fetchVisitTrend = async () => {
      try {
        const response = await fetch('http://localhost:5000/trendData/patientVisitTrend');
        if (!response.ok) throw new Error('Failed to fetch data');
        const result = await response.json();
        setPatientData(result);

        const genderOptions = ["All", ...Array.from(new Set(result.map(d => d.Gender)))];
        const ageGroupOptions = ["All", ...Array.from(new Set(result.map(d => d.AgeGroup)))];
        setGenders(genderOptions);
        setAgeGroups(ageGroupOptions);

        loadFilteredData(result, selectedGender, selectedAgeGroup);
      } catch (error) {
        console.error('Error fetching visit trend data:', error);
      }
    };
    fetchVisitTrend();
  }, []);

  useEffect(() => {
    loadFilteredData(patientData, selectedGender, selectedAgeGroup);
  }, [selectedGender, selectedAgeGroup]);

  const loadFilteredData = (data, gender, ageGroup) => {
    if (!data || data.length === 0) return;

    let filtered = data;

    if (gender !== "All") {
      filtered = filtered.filter(d => d.Gender === gender);
    }
    if (ageGroup !== "All") {
      filtered = filtered.filter(d => d.AgeGroup === ageGroup);
    }

    const deptSet = new Set(filtered.map((item) => item.Department));
    setDepartments(Array.from(deptSet));

    setFormattedData(transformDataForChart(filtered));
  };

  const transformDataForChart = (data) => {
  const grouped = {};

  data.forEach(({ Year, Month, Department, Visit_Count }) => {
    const label = `${Month} ${Year}`;
    if (!grouped[label]) {
      grouped[label] = { date: label, Year, Month };
    }
    if (!grouped[label][Department]) {
      grouped[label][Department] = 0;
    }
    grouped[label][Department] += Visit_Count;
  });

  const monthOrder = {
    January: 1, February: 2, March: 3, April: 4, May: 5, June: 6,
    July: 7, August: 8, September: 9, October: 10, November: 11, December: 12,
  };

  return Object.values(grouped).sort((a, b) => {
    if (a.Year !== b.Year) return a.Year - b.Year;
    return monthOrder[a.Month] - monthOrder[b.Month];
  }).map(({ Year, Month, ...rest }) => rest); 
};

  return (
    <div className="bar-chart-container" >
      <h2>Patient Visit Trends Over Past 3 Years</h2>

      <div style={{ marginBottom: 20 }}>
        <label>
          Gender:{" "}
          <select
            value={selectedGender}
            onChange={(e) => setSelectedGender(e.target.value)}
            style={{ marginRight: 20 }}
            className="filter-select"
          >
            {genders.map((g) => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>
        </label>

        <label>
          Age Group:{" "}
          <select
            value={selectedAgeGroup}
            onChange={(e) => setSelectedAgeGroup(e.target.value)}
            className="filter-select"
          >
            {ageGroups.map((a) => (
              <option key={a} value={a}>{a}</option>
            ))}
          </select>
        </label>
      </div>

      <ResponsiveContainer width="100%" height={450}>
        <BarChart
          data={formattedData}
          margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" angle={-45} textAnchor="end" height={80} />
          <YAxis />
          <Tooltip />
          <Legend />
          {departments.map((dept, index) => (
            <Bar
              key={dept}
              dataKey={dept}
              fill={colors[index % colors.length]}
              name={dept}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>

      <div className="chart-description" style={{ marginTop: 20 }}>
        <p>
          This chart shows patient visits over months and years broken down by department.
          Use the dropdowns above to filter by gender and age group.
        </p>
      </div>
    </div>
  );
}

export default VisitTrendChart;
