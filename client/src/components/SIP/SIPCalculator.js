import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import "./SIPCalculator.css";

ChartJS.register(ArcElement, Tooltip, Legend);

const SIPCalculator = () => {
  const [principal, setPrincipal] = useState();
  const [months, setMonths] = useState();
  const [returnRate, setReturnRate] = useState();
  const [name, setName] = useState("");
  const [sipData, setSipData] = useState([]);

  const data = {
    labels: ["Invested Amount", "Estimated Return"],
    datasets: [
      {
        data: sipData,
        backgroundColor: ["dodgerblue", "blue"],
      },
    ],
  };

  const options = {};

  const setUserDetails = async () => {
    const token = localStorage.getItem("token");
    var base64Url = token.split(".")[1];
    var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    var jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    const parsed = await JSON.parse(jsonPayload);
    setName(parsed.name);
  };

  const calculateSIP = async (e) => {
    e.preventDefault();
    const res = await fetch(
      `${process.env.REACT_APP_SERVER_URL}/api/calculate`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          p: principal,
          i: returnRate / 100 / 12,
          n: months,
          r: returnRate,
        }),
      }
    );
    const sip = await res.json();
    console.log(sip);
    const { return_amt, invested_amount } = sip;
    setSipData([Math.round(invested_amount), Math.round(return_amt)]);
  };

  useEffect(() => {
    setUserDetails();
  }, []);
  return (
    <div className="dashboard">
      <nav>Hi {name}!</nav>
      <div className="header">Calculate SIP</div>
      <div className="calculator">
        <div className="sip-fields">
          <form className="sip-form" onSubmit={calculateSIP}>
            <label htmlFor="p">Investment Amout (Rs.)</label>
            <input
              id="p"
              className="input-fields"
              type="number"
              value={principal}
              onChange={(e) => setPrincipal(e.target.value)}
              required
            />
            <label htmlFor="n">Time Period (Months)</label>
            <input
              id="n"
              className="input-fields"
              type="number"
              value={months}
              onChange={(e) => setMonths(e.target.value)}
              required
            />
            <label htmlFor="r">Expected Return Rate (%)</label>
            <input
              id="r"
              className="input-fields"
              type="number"
              value={returnRate}
              onChange={(e) => {
                setReturnRate(e.target.value);
              }}
              required
            />
            <label htmlFor="i">Compound Rate</label>
            <input
              id="i"
              className="input-fields"
              type="number"
              value={returnRate / 100 / 12}
              readOnly
            />
            <button className="calculate-btn" type="submit">
              Calculate
            </button>
          </form>
        </div>
        <div className="graph">
          <div className="doughnut">
            <Doughnut data={data} options={options} />
          </div>
          {sipData.length > 0 ? (
            <div className="details">
              <div className="col-1">
                <div className="inv-amt">
                  Invested Amount:{" "}
                  <span>Rs. {sipData[0].toLocaleString("en-IN")}</span>
                </div>
                <div className="inv-amt">
                  Estimated Return:{" "}
                  <span>Rs. {sipData[1].toLocaleString("en-IN")}</span>
                </div>
              </div>
              <div className="total-amt">
                Total Amount:{" "}
                <span className="total">
                  Rs. {(sipData[0] + sipData[1]).toLocaleString("en-IN")}
                </span>
              </div>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SIPCalculator;
