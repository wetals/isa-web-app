import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";
import { useISAContext } from "../context/ISAContext";

const ISATable: React.FC = () => {
  const { isas } = useISAContext();

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product</TableHead>
            <TableHead>Payment Type</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Frequency</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isas.map((isa, index) => (
            <TableRow key={index}>
              <TableCell>{isa.fundType}</TableCell>
              <TableCell>{isa.paymentType}</TableCell>
              <TableCell>£{isa.amount.toFixed(2)}</TableCell>
              <TableCell>{isa.frequency || " - "}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default ISATable;
