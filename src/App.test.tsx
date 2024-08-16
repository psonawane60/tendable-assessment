import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import App from "./App";
describe("App Component", () => {
  it("should render the title", () => {
    render(<App />);
    const titleElement = screen.getByText(/Tendable Coding Assessment/i);
    expect(titleElement).toBeInTheDocument();
  });

  it("should render the first question", () => {
    render(<App />);
    const questionElement = screen.getByText(/Do you like coding?/i);
    expect(questionElement).toBeInTheDocument();
  });

  it('should update the state when "Yes" is clicked', () => {
    render(<App />);
    const yesButton = screen.getByText(/Yes/i);
    fireEvent.click(yesButton);

    const questionElement = screen.queryByText(/Do you like coding?/i);
    expect(questionElement).not.toBeInTheDocument();
    const nextQuestionElement = screen.getByText(
      /Have you ever used React before?/i
    );
    expect(nextQuestionElement).toBeInTheDocument();
  });

  it('should update the state when "No" is clicked', () => {
    render(<App />);
    const noButton = screen.getByText(/No/i);
    fireEvent.click(noButton);

    const questionElement = screen.queryByText(/Do you like coding?/i);
    expect(questionElement).not.toBeInTheDocument();
    const nextQuestionElement = screen.getByText(
      /Have you ever used React before?/i
    );
    expect(nextQuestionElement).toBeInTheDocument();
  });

  it("should display the score after all questions are answered", () => {
    render(<App />);

    const yesButton = screen.getByText(/Yes/i);
    fireEvent.click(yesButton);

    const nextQuestionElement = screen.getByText(
      /Have you ever used React before?/i
    );
    fireEvent.click(yesButton);

    const finalQuestionElement = screen.getByText(
      /Do you enjoy solving problems?/i
    );
    fireEvent.click(yesButton);

    const scoreElement = screen.getByText(/You scored 100%/i);
    expect(scoreElement).toBeInTheDocument();
  });
});
