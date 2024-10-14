import React from "react";
import { useISAContext } from "../context/ISAContext";
import ISATable from "../components/ISATable";
import PortfolioSummary from "../components/PortfolioSummary";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const HomePage: React.FC = () => {
  const { isas } = useISAContext();

  return (
    <div>
      <PortfolioSummary />
      {isas.length > 0 ? (
        <ISATable />
      ) : (
        <div>
          <p className="text-gray-600 mb-4">
            You don't currently have any active ISAs within your account. Click
            on the button below to apply.
          </p>
          <div>
          <Button asChild className="rounded-full px-8 py-3 bg-black text-white hover:bg-gray-800">
            <Link to="/apply">Apply for ISA</Link>
          </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
