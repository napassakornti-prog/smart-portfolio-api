const express = require("express");
const serverless = require("serverless-http");

const app = express();
app.use(express.json());

// ==========================
// 1. Calculate Portfolio
// ==========================
app.post("/portfolio/calculate", (req, res) => {
  const { invested, current, years } = req.body;

  const profit = current - invested;
  const percent = (profit / invested) * 100;
  const cagr = (Math.pow(current / invested, 1 / years) - 1) * 100;

  res.json({
    totalInvested: invested,
    totalCurrent: current,
    profit: profit,
    profitPercent: percent.toFixed(2),
    cagr: cagr.toFixed(2)
  });
});

// ==========================
// 2. DCA Simulation
// ==========================
app.post("/portfolio/dca", (req, res) => {
  const { monthlyInvestment, annualReturn, years } = req.body;

  const months = years * 12;
  const monthlyRate = annualReturn / 12 / 100;

  let futureValue = 0;

  for (let i = 0; i < months; i++) {
    futureValue = (futureValue + monthlyInvestment) * (1 + monthlyRate);
  }

  res.json({
    totalInvested: monthlyInvestment * months,
    futureValue: futureValue.toFixed(2)
  });
});

// ==========================
// 3. Risk Analysis
// ==========================
app.get("/portfolio/risk", (req, res) => {
  res.json({
    riskLevel: "Moderate-High",
    comment: "Tech-heavy portfolio with growth exposure"
  });
});

module.exports = serverless(app);