import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";

// smoke test
it("renders without crashing", () => {
  render(<Carousel />);
});

// snapshot test
it("matches snapshot", () => {
  const {asFragment} = render(<Carousel />);
  expect(asFragment()).toMatchSnapshot();
});

it("works when you click on the right arrow", function() {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  // expect the first image to show, but not the second
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).not.toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).toBeInTheDocument();
});

it("moves back one when you click the left arrow", () => {
  const {queryByTestId, queryByAltText} = render(<Carousel />);

  // go to 2nd image
  fireEvent.click(queryByTestId("right-arrow"));

  // go back to first image
  fireEvent.click(queryByTestId("left-arrow"));

  // check if it's on the first image
  expect(queryByAltText(/richard pasquarella/i)).toBeInTheDocument();
  expect(queryByAltText(/pratik patel/i)).not.toBeInTheDocument();
});

describe("navigating to start & end", () => {
  it("start should hide left arrow", () => {
    const {queryByTestId} = render(<Carousel />);

    // ensure left arrow is gone & right arrow is present
    expect(queryByTestId("left-arrow")).not.toBeInTheDocument();
    expect(queryByTestId("right-arrow")).toBeInTheDocument();
  });

  it("end should hide right arrow", () => {
    const {queryByTestId} = render(<Carousel />);
    const rightArrow = queryByTestId("right-arrow");

    // move to end
    fireEvent.click(rightArrow);
    fireEvent.click(rightArrow);

    // ensure right arrow is gone & left arrow is present
    expect(rightArrow).not.toBeInTheDocument();
    expect(queryByTestId("left-arrow")).toBeInTheDocument();
  });
});
