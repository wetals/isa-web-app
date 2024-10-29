import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";

import { ISAProvider } from "../../context/ISAContext";
import ApplyForm from "../ApplyForm";

const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const renderApplyForm = () => {
  return render(
    <BrowserRouter>
      <ISAProvider>
        <ApplyForm />
      </ISAProvider>
    </BrowserRouter>
  );
};

describe("ApplyForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Fund Selection", () => {
    it("should display all available fund options", async () => {
      const user = userEvent.setup();
      renderApplyForm();

      const fundTypeSelect = screen.getByRole("combobox", { name: "FundType" });
      expect(fundTypeSelect).toBeInTheDocument();
      expect(
        within(fundTypeSelect).getByText("Select a fund")
      ).toBeInTheDocument();

      await user.click(fundTypeSelect);

      const expectedFunds = [
        "Corporate Bonds",
        "Income Fund",
        "Property",
        "Equities Fund",
        "Retirement Fund",
        "Tesla Shares",
      ];

      await waitFor(() => {
        expectedFunds.forEach((fund) => {
          expect(
            screen.getByRole("option", { name: fund })
          ).toBeInTheDocument();
        });
      });
    });

    it("should allow selecting only one fund type", async () => {
      const user = userEvent.setup();
      renderApplyForm();

      const fundTypeSelect = screen.getByRole("combobox", { name: "FundType" });
      await user.click(fundTypeSelect);

      await waitFor(async () => {
        const equitiesFundOption = screen.getByRole("option", {
          name: "Equities Fund",
        });
        await user.click(equitiesFundOption);
      });

      expect(
        within(fundTypeSelect).getByText("Equities Fund")
      ).toBeInTheDocument();
    });
  });

  describe("Payment Type Selection", () => {
    it("should show frequency field only for recurring payments", async () => {
      const user = userEvent.setup();
      renderApplyForm();

      expect(
        screen.queryByRole("combobox", { name: "Frequency" })
      ).not.toBeInTheDocument();

      const recurringRadio = screen.getByLabelText(/recurring payment/i);
      await user.click(recurringRadio);

      const frequencySelect = await waitFor(() =>
        screen.getByRole("combobox", { name: "Frequency" })
      );
      expect(frequencySelect).toBeInTheDocument();
      expect(
        within(frequencySelect).getByText("Select frequency")
      ).toBeInTheDocument();

      const oneOffRadio = screen.getByLabelText(/one-off payment/i);
      await user.click(oneOffRadio);

      await waitFor(() => {
        expect(
          screen.queryByRole("combobox", { name: "Frequency" })
        ).not.toBeInTheDocument();
      });
    });
  });

  describe("Form Submission", () => {
    it("should handle successful form submission", async () => {
      const user = userEvent.setup();
      renderApplyForm();

      const fundTypeSelect = screen.getByRole("combobox", { name: "FundType" });
      await user.click(fundTypeSelect);

      await waitFor(async () => {
        const equitiesFundOption = screen.getByRole("option", {
          name: "Equities Fund",
        });
        await user.click(equitiesFundOption);
      });

      const amountInput = screen.getByRole("spinbutton", { name: /amount/i });
      await user.type(amountInput, "5000");

      const saveButton = screen.getByRole("button", { name: /save/i });
      await user.click(saveButton);

      expect(mockNavigate).toHaveBeenCalledWith("/");
    });

    it("should show error for amounts exceeding £20,000", async () => {
      const user = userEvent.setup();
      renderApplyForm();

      const fundTypeSelect = screen.getByRole("combobox", { name: "FundType" });
      await user.click(fundTypeSelect);

      await waitFor(async () => {
        const equitiesFundOption = screen.getByRole("option", {
          name: "Equities Fund",
        });
        await user.click(equitiesFundOption);
      });

      const amountInput = screen.getByRole("spinbutton", { name: /amount/i });
      await user.type(amountInput, "25000");

      const saveButton = screen.getByRole("button", { name: /save/i });
      await user.click(saveButton);

      await waitFor(() => {
        expect(
          screen.getByText(
            /Maximum ISA allowance for the current tax year is £20,000.00/
          )
        ).toBeInTheDocument();
      });

      expect(mockNavigate).not.toHaveBeenCalled();
    });

    it("should handle cancellation correctly", async () => {
      const user = userEvent.setup();
      renderApplyForm();

      const cancelButton = screen.getByRole("button", { name: /cancel/i });
      await user.click(cancelButton);

      expect(mockNavigate).toHaveBeenCalledWith("/");
    });
  });
});
