export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { invested, current, years } = req.body;

  const profit = current - invested;
  const percent = (profit / invested) * 100;
  const cagr = (Math.pow(current / invested, 1 / years) - 1) * 100;

  res.status(200).json({
    totalInvested: invested,
    totalCurrent: current,
    profit,
    profitPercent: percent.toFixed(2),
    cagr: cagr.toFixed(2)
  });
}