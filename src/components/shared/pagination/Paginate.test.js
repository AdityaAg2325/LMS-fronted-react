import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Paginate from "./Paginate";

test("renders pagination with correct current and total pages", () => {
  render(<Paginate totalPages={5} currentPage={2} onPageChange={() => {}} />);
  expect(screen.getByText(/Page 3 of 5/i)).toBeInTheDocument();
});

test("calls onPageChange when Next button is clicked", () => {
  const onPageChangeMock = jest.fn();
  render(<Paginate totalPages={5} currentPage={2} onPageChange={onPageChangeMock} />);
  const nextButton = screen.getByText(/Next/i).closest("div");
  
  fireEvent.click(nextButton);
  expect(onPageChangeMock).toHaveBeenCalledWith(3);
});

test("calls onPageChange when Previous button is clicked", () => {
  const onPageChangeMock = jest.fn();
  render(<Paginate totalPages={5} currentPage={2} onPageChange={onPageChangeMock} />);
  const prevButton = screen.getByText(/Previous/i).closest("div");
  
  fireEvent.click(prevButton);
  expect(onPageChangeMock).toHaveBeenCalledWith(1); 
});

test("does not call onPageChange if Next is clicked on the last page", () => {
  const onPageChangeMock = jest.fn();
  render(<Paginate totalPages={5} currentPage={4} onPageChange={onPageChangeMock} />);
  const nextButton = screen.getByText(/Next/i).closest("div");

  fireEvent.click(nextButton);
  expect(onPageChangeMock).not.toHaveBeenCalled(); 
});

test("does not call onPageChange if Previous is clicked on the first page", () => {
  const onPageChangeMock = jest.fn();
  render(<Paginate totalPages={5} currentPage={0} onPageChange={onPageChangeMock} />);
  const prevButton = screen.getByText(/Previous/i).closest("div");

  fireEvent.click(prevButton);
  expect(onPageChangeMock).not.toHaveBeenCalled();
});

test("matches snapshot", () => {
  const { asFragment } = render(<Paginate totalPages={5} currentPage={2} onPageChange={() => {}} />);
  expect(asFragment()).toMatchSnapshot(); 
});
