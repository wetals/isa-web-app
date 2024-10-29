import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useISAContext } from "../context/ISAContext";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { z } from "zod";

const amountError =
  "Maximum ISA allowance for the current tax year is £20,000.00";

const ApplyForm = () => {
  const { isas, addISA } = useISAContext();
  const navigate = useNavigate();

  const [fundType, setFundType] = useState("");
  const [paymentType, setPaymentType] = useState("One-off payment");
  const [amount, setAmount] = useState<number | "">("");
  const [frequency, setFrequency] = useState("");
  const [error, setError] = useState("");

  const schema = z.object({
    fundType: z.string().min(1, "Fund type is required"),
    paymentType: z.string().min(1, "Payment type is required"),
    amount: z
      .number()
      .min(1, "Amount must be greater than zero")
      .max(20000, amountError),
    frequency: z.string().optional(),
  });

  const handleSave = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      schema.parse({
        fundType,
        paymentType,
        amount: amount === "" ? undefined : Number(amount),
        frequency: paymentType === "Recurring payment" ? frequency : undefined,
      });

      const totalAmount =
        isas.reduce((sum, isa) => sum + isa.amount, 0) + (amount as number);

      if (totalAmount > 20000) {
        setError(amountError);
        return;
      }

      addISA({ fundType, paymentType, amount: amount as number, frequency });
      navigate("/");
    } catch (e) {
      if (e instanceof z.ZodError) {
        setError(e.errors.map((err) => err.message).join(", "));
      }
    }
  };

  return (
    <form className="space-y-4 max-w-2xl" onSubmit={(e) => e.preventDefault()}>
      <div className="space-y-2">
        <Label htmlFor="fund-type">Choose Fund Type</Label>
        <Select value={fundType} onValueChange={setFundType}>
          <SelectTrigger className="w-full" aria-label="FundType">
            <SelectValue placeholder="Select a fund" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Corporate Bonds">Corporate Bonds</SelectItem>
            <SelectItem value="Income Fund">Income Fund</SelectItem>
            <SelectItem value="Property">Property</SelectItem>
            <SelectItem value="Equities Fund">Equities Fund</SelectItem>
            <SelectItem value="Retirement Fund">Retirement Fund</SelectItem>
            <SelectItem value="Tesla Shares">Tesla Shares</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Payment Type</Label>
        <RadioGroup value={paymentType} onValueChange={setPaymentType}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="One-off payment" id="one-off-payment" />
            <Label htmlFor="one-off-payment">One-off payment</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="Recurring payment" id="recurring-payment" />
            <Label htmlFor="recurring-payment">Recurring payment</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <Label htmlFor="amount">Amount</Label>
        <Input
          id="amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          required
        />
      </div>

      {paymentType === "Recurring payment" && (
        <div className="space-y-2">
          <Label htmlFor="frequency">Frequency</Label>
          <Select value={frequency} onValueChange={setFrequency}>
            <SelectTrigger className="w-full" aria-label="Frequency">
              <SelectValue placeholder="Select frequency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Monthly">Monthly</SelectItem>
              <SelectItem value="Yearly">Yearly</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}

      {error && (
        <p className="text-[0.9rem] font-medium text-destructive">{error}</p>
      )}

      <div className="flex space-x-4">
        <Button onClick={() => navigate("/")} variant="outline">
          Cancel
        </Button>
        <Button onClick={handleSave} className="btn-primary">
          Save
        </Button>
      </div>
    </form>
  );
};

export default ApplyForm;
