import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Paginate from "./Paginate";

// Test case 1: Renders pagination with correct current page
test("renders pagination with correct current and total pages", () => {
  render(<Paginate totalPages={5} currentPage={2} onPageChange={() => {}} />);
  expect(screen.getByText(/Page 3 of 5/i)).toBeInTheDocument(); // Current page is 3 (currentPage+1)
});

// Test case 2: Calls onPageChange when Next button is clicked
test("calls onPageChange when Next button is clicked", () => {
  const onPageChangeMock = jest.fn();
  render(<Paginate totalPages={5} currentPage={2} onPageChange={onPageChangeMock} />);
  const nextButton = screen.getByText(/Next/i).closest("div");
  
  fireEvent.click(nextButton);
  expect(onPageChangeMock).toHaveBeenCalledWith(3); // Current page should increase by 1
});

// Test case 3: Calls onPageChange when Previous button is clicked
test("calls onPageChange when Previous button is clicked", () => {
  const onPageChangeMock = jest.fn();
  render(<Paginate totalPages={5} currentPage={2} onPageChange={onPageChangeMock} />);
  const prevButton = screen.getByText(/Previous/i).closest("div");
  
  fireEvent.click(prevButton);
  expect(onPageChangeMock).toHaveBeenCalledWith(1); // Current page should decrease by 1
});

// Test case 4: Prevents navigation beyond last page
test("does not call onPageChange if Next is clicked on the last page", () => {
  const onPageChangeMock = jest.fn();
  render(<Paginate totalPages={5} currentPage={4} onPageChange={onPageChangeMock} />);
  const nextButton = screen.getByText(/Next/i).closest("div");

  fireEvent.click(nextButton);
  expect(onPageChangeMock).not.toHaveBeenCalled(); // No change since it's the last page
});

// Test case 5: Prevents navigation before first page
test("does not call onPageChange if Previous is clicked on the first page", () => {
  const onPageChangeMock = jest.fn();
  render(<Paginate totalPages={5} currentPage={0} onPageChange={onPageChangeMock} />);
  const prevButton = screen.getByText(/Previous/i).closest("div");

  fireEvent.click(prevButton);
  expect(onPageChangeMock).not.toHaveBeenCalled(); // No change since it's the first page
});

// Test case 6: Snapshot testing
test("matches snapshot", () => {
  const { asFragment } = render(<Paginate totalPages={5} currentPage={2} onPageChange={() => {}} />);
  expect(asFragment()).toMatchSnapshot(); // Ensure UI matches the snapshot
});
