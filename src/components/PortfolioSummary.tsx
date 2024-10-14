import React from "react";
import { useISAContext } from "../context/ISAContext";
import { Separator } from "@/components/ui/separator"

const PortfolioSummary: React.FC = () => {
  const { isas } = useISAContext();
  const currentYear = new Date().getFullYear();
  const financialYear = `${currentYear}/${currentYear + 1}`;
  const totalAmount = isas.reduce((sum, isa) => sum + isa.amount, 0);

  return (
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl font-bold">Portfolio Summary</h2>
      <div className="flex h-5 items-center space-x-4 text-sm">
      <span>{`Current Financial Year ${financialYear}`}</span>
      <Separator orientation="vertical" />
      <span>{`£${totalAmount.toFixed(2)}`}</span>
      </div>
    </div>
  );
};

export default PortfolioSummary;
