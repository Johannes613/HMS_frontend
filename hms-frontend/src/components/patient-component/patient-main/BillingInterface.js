import React, { useEffect, useState } from "react";
import "./BillingInterface.css";
import ReceiptIcon from "@mui/icons-material/Receipt";
import { jsPDF } from "jspdf";

const BillingInterface = () => {
    
  const [service, setService] = useState("consultation");
  const [cost, setCost] = useState(200.0);
  const [totalAmount, setTotalAmount] = useState(0.0);
  const [insuranceCoverage, setInsuranceCoverage] = useState(0.0);
  const [patientInfo, setPatientInfo] = useState([]);

  useEffect(()=>{
        const fetchPatientInfo = async () => {
            try {
                const response = await fetch('http://localhost:5000/trendData/patientInfo');
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const result = await response.json();
                setPatientInfo(result);
                console.log('Fetched data:', result);
            } catch (error) {
                console.error('Error fetching patient info:', error);
            }
        }
        fetchPatientInfo();
    },[])

  const patientName = (patientInfo[0]?.first_name + " " + patientInfo[0]?.last_name) || "John Doe";
  const provider = patientInfo[0]?.insurance_name || "ABC Insurance";
  const coveragePercent = parseFloat(patientInfo[0]?.insurance_coverage || 50);

  const handleCalculate = () => {
    const updatedTotal = parseFloat(cost) * 1.15;
    setTotalAmount(updatedTotal.toFixed(2));
    setInsuranceCoverage(0.0);
  };

  const handleApplyInsurance = () => {
    const coverage = (parseFloat(totalAmount) * coveragePercent) / 100;
    setInsuranceCoverage(coverage.toFixed(2));
  };

  const amountDue = (
    parseFloat(totalAmount) - parseFloat(insuranceCoverage)
  ).toFixed(2);

  const generatePdf = () => {
    if (parseFloat(totalAmount) === 0) {
      alert("Please calculate the total before generating the invoice.");
      return;
    }
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Invoice", 14, 22);

    doc.setFontSize(12);
    doc.text(`Patient Name: ${patientName}`, 14, 40);
    doc.text(`Service: ${service}`, 14, 50);
    doc.text(`Cost: $${cost}`, 14, 60);
    doc.text(`Total Charges (with Tax): $${totalAmount}`, 14, 70);
    doc.text(`Insurance Provider: ${provider}`, 14, 80);
    doc.text(`Coverage (%): ${coveragePercent}%`, 14, 90);
    doc.text(`Insurance Coverage: $${insuranceCoverage}`, 14, 100);
    doc.text(`Amount Due: $${amountDue}`, 14, 110);

    doc.save(`Invoice_${patientName.replace(" ", "_")}.pdf`);
  };

  return (
    <div className="billing-interface">
      <h3>
        <ReceiptIcon className="icons-appts" /> Billing Section
      </h3>
      <div className="billing-cards-wrapper">
        <div className="billing-card">
          <h3>Calculate Charges</h3>

          <label>Service</label>
          <select
            value={service}
            onChange={(e) => {
              const selected = e.target.value;
              setService(selected);
              const costs = {
                consultation: 200,
                labTest: 150,
                appointment: 100,
                followUp: 100,
                xRay: 180,
              };
              const newCost = costs[selected] || 0;
              setCost(newCost);
              setTotalAmount((newCost * 1.15).toFixed(2));
              setInsuranceCoverage(0.0);
            }}
          >
            <option value="consultation">Consultation</option>
            <option value="labTest">Lab Test</option>
            <option value="appointment">Appointment Fee</option>
            <option value="followUp">Follow-up</option>
            <option value="xRay">X-Ray</option>
          </select>

          <label>Cost ($)</label>
          <input
            type="number"
            value={cost}
            onChange={(e) => {
              const newCost = parseFloat(e.target.value) || 0;
              setCost(newCost);
              setTotalAmount((newCost * 1.15).toFixed(2));
              setInsuranceCoverage(0.0);
            }}
          />

          <label>Total Amount with Tax ($)</label>
          <input type="number" value={totalAmount} readOnly />

          <button onClick={handleCalculate}>Calculate</button>
        </div>

        <div className="billing-card">
          <h3>Apply Insurance</h3>

          <label>Insurance Provider</label>
          <input type="text" value={provider} readOnly />

          <label>Coverage (%)</label>
          <input type="number" value={coveragePercent} readOnly />

          <div className="result">
            Insurance Coverage
            <br />${insuranceCoverage}
          </div>

          <button onClick={handleApplyInsurance}>Apply</button>
        </div>

        <div className="billing-card">
          <h3>Generate Invoice</h3>
          <p>
            <strong>Patient Name:</strong>
            <br />
            {patientName}
          </p>
          <p>
            <strong>Total Charges:</strong>
            <br />${totalAmount}
          </p>
          <p>
            <strong>Insurance Coverage:</strong>
            <br />${insuranceCoverage}
          </p>
          <p>
            <strong>Amount Due ($):</strong>
            <br />${amountDue}
          </p>
          <button onClick={generatePdf}>Generate Invoice</button>
        </div>
      </div>
    </div>
  );
};

export default BillingInterface;
