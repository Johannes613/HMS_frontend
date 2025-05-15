import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area
} from "recharts";
import "./ProgressAnalytics.css";

export default function HospitalStatsAnalytics() {
  const [appointmentData, setAppointmentData] = useState([]);
  const [doctorStatsData, setDoctorStatsData] = useState([]);

  useEffect(() => {
    const mockAppointments = [
      { day: "Mon", appointments: 40 },
      { day: "Tue", appointments: 52 },
      { day: "Wed", appointments: 47 },
      { day: "Thu", appointments: 60 },
      { day: "Fri", appointments: 55 },
      { day: "Sat", appointments: 65 },
      { day: "Sun", appointments: 50 },
    ];

    const mockDoctors = [
      { day: "Mon", doctors: 10 },
      { day: "Tue", doctors: 12 },
      { day: "Wed", doctors: 11 },
      { day: "Thu", doctors: 13 },
      { day: "Fri", doctors: 12 },
      { day: "Sat", doctors: 14 },
      { day: "Sun", doctors: 11 },
    ];

    setAppointmentData(mockAppointments);
    setDoctorStatsData(mockDoctors);
  }, []);

  return (
    <div className="hospital-stats-analytics">
      {/* <h2 className="hospital-title">Hospital Activity Analytics</h2> */}

      <div className="charts-wrapper">
        {/* Chart 1: Appointments Trend */}
        <div className="chart-box">
          <h4 className="chart-heading">Appointments in the Last 7 Days</h4>
          <ResponsiveContainer width="102%" height={200}>
            <LineChart data={appointmentData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
              <XAxis dataKey="day" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip formatter={(val) => `${val} appointments`} />
              <Area
                type="monotone"
                dataKey="appointments"
                stroke="#17a2b8"
                fill="#17a2b833"
              />
              <Line
                type="monotone"
                dataKey="appointments"
                stroke="#17a2b8"
                strokeWidth={2}
                dot={{ stroke: "#fff", strokeWidth: 2, r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Chart 2: Doctors on Duty Trend */}
        <div className="chart-box">
          <h4 className="chart-heading">Doctors on Duty (Last 7 Days)</h4>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={doctorStatsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
              <XAxis dataKey="day" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip formatter={(val) => `${val} doctors`} />
              <Area
                type="monotone"
                dataKey="doctors"
                stroke="#28a745"
                fill="#28a74533"
              />
              <Line
                type="monotone"
                dataKey="doctors"
                stroke="#28a745"
                strokeWidth={2}
                dot={{ stroke: "#fff", strokeWidth: 2, r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
