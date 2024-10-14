import React, { createContext, useState, useContext, ReactNode } from "react";

interface ISA {
  fundType: string;
  paymentType: string;
  amount: number;
  frequency?: string;
  startDate?: string;
  endDate?: string;
}

interface ISAContextType {
  isas: ISA[];
  addISA: (isa: ISA) => void;
}

const ISAContext = createContext<ISAContextType | undefined>(undefined);

const useISAContext = () => {
  const context = useContext(ISAContext);

  if (!context) {
    throw new Error("use context with provider");
  }

  return context;
};

export const ISAProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isas, setISAs] = useState<ISA[]>([]);

  const addISA = (isa: ISA) => {
    setISAs((previousISA) => [...previousISA, isa]);
  };

  return (
    <ISAContext.Provider value={{ isas, addISA }}>
      {children}
    </ISAContext.Provider>
  );
};

export { useISAContext };
