export default function handler(req, res) {

  let monthlyInvestment, annualReturn, years;

  if (req.method === "POST") {
    ({ monthlyInvestment, annualReturn, years } = req.body);
  }

  if (req.method === "GET") {
    monthlyInvestment = Number(req.query.monthlyInvestment);
    annualReturn = Number(req.query.annualReturn);
    years = Number(req.query.years);
  }

  if (!monthlyInvestment || !annualReturn || !years) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const months = years * 12;
  const monthlyRate = annualReturn / 12 / 100;

  let futureValue = 0;

  for (let i = 0; i < months; i++) {
    futureValue = (futureValue + monthlyInvestment) * (1 + monthlyRate);
  }

  res.status(200).json({
    totalInvested: monthlyInvestment * months,
    futureValue: futureValue.toFixed(2)
  });
}
