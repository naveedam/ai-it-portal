"use client";

import { useState } from "react";
import { calculateTax } from "@/lib/taxEngine";

export default function Home() {
  const [income, setIncome] = useState(1000000);
  const [deductions, setDeductions] = useState(150000);
  const [regime, setRegime] = useState<"old" | "new">("new");

  const result = calculateTax({ income, deductions, regime });

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow">
        <h1 className="text-2xl font-bold mb-4">
          AI Assisted IT Calculator
        </h1>

        <input
          type="number"
          value={income}
          onChange={(e) => setIncome(Number(e.target.value))}
          className="w-full p-2 border mb-3"
          placeholder="Total Income"
        />

        <input
          type="number"
          value={deductions}
          onChange={(e) => setDeductions(Number(e.target.value))}
          className="w-full p-2 border mb-3"
          placeholder="Deductions (Old regime only)"
        />

        <select
          value={regime}
          onChange={(e) =>
            setRegime(e.target.value as "old" | "new")
          }
          className="w-full p-2 border mb-4"
        >
          <option value="new">New Regime</option>
          <option value="old">Old Regime</option>
        </select>

        <div className="bg-gray-50 p-4 rounded">
          <p>Taxable Income: ₹{result.taxableIncome}</p>
          <p>Tax: ₹{result.tax}</p>
          <p>Cess (4%): ₹{result.cess}</p>
          <p className="font-bold">
            Total Tax: ₹{result.totalTax}
          </p>
        </div>
      </div>
    </div>
  );
}