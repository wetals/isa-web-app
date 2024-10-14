import { render, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { ISAProvider } from "../../context/ISAContext";
import ApplyForm from "../ApplyForm";

describe("ApplyForm", () => {
  test("renders form fields correctly", () => {
    const { getByText, getByRole } = render(
      <BrowserRouter>
        <ISAProvider>
          <ApplyForm />
        </ISAProvider>
      </BrowserRouter>
    );

    expect(
      getByRole("combobox", { name: /Choose Fund Type/i })
    ).toBeInTheDocument();
    expect(getByRole("spinbutton", { name: /Amount/i })).toBeInTheDocument();
    expect(getByText(/Save/i)).toBeInTheDocument();
  });

  test("shows error when amount exceeds limit", () => {
    const { getByRole, getByText, getAllByText } = render(
      <BrowserRouter>
        <ISAProvider>
          <ApplyForm />
        </ISAProvider>
      </BrowserRouter>
    );

    fireEvent.change(getByRole("spinbutton", { name: /Amount/i }), {
      target: { value: "25000" },
    });
    fireEvent.click(getByText(/Save/i));

    const errorMessages = getAllByText(
      /Maximum ISA allowance for the current tax year is £20,000.00/i
    );

    expect(
      errorMessages.some((msg) => msg.classList.contains("text-red-500"))
    ).toBe(true);
  });
});
