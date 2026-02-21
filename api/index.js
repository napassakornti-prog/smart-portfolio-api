export default function handler(req, res) {
  const { method, url } = req;

  // ==========================
  // 1. Risk (GET)
  // ==========================
  if (method === "GET" && url === "/api/portfolio/risk") {
    return res.status(200).json({
      riskLevel: "Moderate-High",
      comment: "Tech-heavy portfolio with growth exposure"
    });
  }

  // ==========================
  // 2. Calculate Portfolio (POST)
  // ==========================
  if (method === "POST" && url === "/api/portfolio/calculate") {
    const { invested, current, years } = req.body;

    const profit = current - invested;
    const percent = (profit / invested) * 100;
    const cagr = (Math.pow(current / invested, 1 / years) - 1) * 100;

    return res.status(200).json({
      totalInvested: invested,
      totalCurrent: current,
      profit: profit,
      profitPercent: percent.toFixed(2),
      cagr: cagr.toFixed(2)
    });
  }

  // ==========================
  // 3. DCA Simulation (POST)
  // ==========================
  if (method === "POST" && url === "/api/portfolio/dca") {
    const { monthlyInvestment, annualReturn, years } = req.body;

    const months = years * 12;
    const monthlyRate = annualReturn / 12 / 100;

    let futureValue = 0;

    for (let i = 0; i < months; i++) {
      futureValue = (futureValue + monthlyInvestment) * (1 + monthlyRate);
    }

    return res.status(200).json({
      totalInvested: monthlyInvestment * months,
      futureValue: futureValue.toFixed(2)
    });
  }

  // ==========================
  // 404
  // ==========================
  return res.status(404).json({ message: "Not found" });
}