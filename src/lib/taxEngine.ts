export type TaxRegime = "old" | "new";

interface TaxInput {
  income: number;
  deductions: number;
  regime: TaxRegime;
}

export function calculateTax({ income, deductions, regime }: TaxInput) {
  let taxableIncome =
    regime === "old" ? income - deductions : income;

  if (taxableIncome < 0) taxableIncome = 0;

  let tax = 0;

  if (regime === "new") {
    if (taxableIncome <= 300000) tax = 0;
    else if (taxableIncome <= 600000)
      tax = (taxableIncome - 300000) * 0.05;
    else if (taxableIncome <= 900000)
      tax = 15000 + (taxableIncome - 600000) * 0.10;
    else if (taxableIncome <= 1200000)
      tax = 45000 + (taxableIncome - 900000) * 0.15;
    else if (taxableIncome <= 1500000)
      tax = 90000 + (taxableIncome - 1200000) * 0.20;
    else
      tax = 150000 + (taxableIncome - 1500000) * 0.30;
  } else {
    if (taxableIncome <= 250000) tax = 0;
    else if (taxableIncome <= 500000)
      tax = (taxableIncome - 250000) * 0.05;
    else if (taxableIncome <= 1000000)
      tax = 12500 + (taxableIncome - 500000) * 0.20;
    else
      tax = 112500 + (taxableIncome - 1000000) * 0.30;
  }

  // Rebate 87A (basic version)
  if (taxableIncome <= 700000 && regime === "new") {
    tax = 0;
  }

  const cess = tax * 0.04;
  const totalTax = tax + cess;

  return {
    taxableIncome,
    tax,
    cess,
    totalTax,
  };
}