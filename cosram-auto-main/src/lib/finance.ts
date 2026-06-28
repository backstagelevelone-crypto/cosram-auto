interface LoanResult {
  monthlyPayment: number;
  financedAmount: number;
  downPayment: number;
  totalPayable: number;
  totalInterest: number;
  months: number;
}

/** Rată lunară — formulă anuitate (rate egale). */
export function calculateAnnuityPayment(
  principal: number,
  annualNominalRatePercent: number,
  months: number
): number {
  if (principal <= 0 || months <= 0) return 0;
  if (annualNominalRatePercent <= 0) return principal / months;

  const r = annualNominalRatePercent / 100 / 12;
  const factor = Math.pow(1 + r, months);
  return (principal * r * factor) / (factor - 1);
}

/** Rată lunară când dobânda e exprimată lunar (ex. Mogo 3,39%/lună). */
export function calculatePaymentFromMonthlyRate(
  principal: number,
  monthlyRatePercent: number,
  months: number
): number {
  if (principal <= 0 || months <= 0) return 0;
  if (monthlyRatePercent <= 0) return principal / months;

  const r = monthlyRatePercent / 100;
  const factor = Math.pow(1 + r, months);
  return (principal * r * factor) / (factor - 1);
}

export function calculateLoan(params: {
  price: number;
  downPaymentPercent: number;
  months: number;
  annualNominalRatePercent?: number;
  monthlyRatePercent?: number;
}): LoanResult {
  const downPayment = params.price * (params.downPaymentPercent / 100);
  const financedAmount = Math.max(0, params.price - downPayment);

  const monthlyPayment =
    params.monthlyRatePercent != null
      ? calculatePaymentFromMonthlyRate(
          financedAmount,
          params.monthlyRatePercent,
          params.months
        )
      : calculateAnnuityPayment(
          financedAmount,
          params.annualNominalRatePercent ?? 0,
          params.months
        );

  const totalPayable = monthlyPayment * params.months + downPayment;
  const totalInterest = totalPayable - params.price;

  return {
    monthlyPayment,
    financedAmount,
    downPayment,
    totalPayable,
    totalInterest: Math.max(0, totalInterest),
    months: params.months,
  };
}

/** Formatează suma în formatul românesc cu sufixul "lei" */
export function formatRON(value: number): string {
  return `${Math.round(value).toLocaleString("ro-RO")} lei`;
}

/** Alias pentru a preveni erori în restul proiectului unde se importă formatEuro */
export const formatEuro = formatRON;
