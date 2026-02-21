export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { monthlyInvestment, annualReturn, years } = req.body;

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