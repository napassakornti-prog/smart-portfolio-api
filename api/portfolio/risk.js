export default function handler(req, res) {
  res.status(200).json({
    riskLevel: "Moderate-High",
    comment: "Tech-heavy portfolio with growth exposure"
  });
}