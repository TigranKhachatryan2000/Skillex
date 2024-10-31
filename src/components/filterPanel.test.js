import { render, screen, fireEvent } from "@testing-library/react";

import FilterPanel from "./filterPanel";

describe("FilterPanel", () => {
  let setFiltersMock;
  let handlePriceRangeChangeMock;

  beforeEach(() => {
    setFiltersMock = jest.fn();
    handlePriceRangeChangeMock = jest.fn();
  });

  test("renders filter options correctly", () => {
    const { asFragment } = render(
      <FilterPanel
        filters={{ rating: 0 }}
        setFilters={setFiltersMock}
        handlePriceRangeChange={handlePriceRangeChangeMock}
      />
    );

    expect(asFragment()).toMatchSnapshot();

    expect(screen.getByRole("slider")).toBeInTheDocument();
    expect(screen.getByRole("spinbutton")).toBeInTheDocument();
    expect(screen.getByText("Filter by Brand")).toBeInTheDocument();
    expect(screen.getByText("Filter by Price")).toBeInTheDocument();
    expect(screen.getByText("Filter by Rating")).toBeInTheDocument();
    expect(screen.getByText("Filter by Category")).toBeInTheDocument();
  });

  test("calls handlePriceRangeChange when price is adjusted", () => {
    const { asFragment } = render(
      <FilterPanel
        filters={{ rating: 0 }}
        setFilters={setFiltersMock}
        handlePriceRangeChange={handlePriceRangeChangeMock}
      />
    );

    expect(asFragment()).toMatchSnapshot();

    fireEvent.change(screen.getByRole("slider"), { target: { value: 250 } });
    expect(handlePriceRangeChangeMock).toHaveBeenCalledWith(0, 250);
  });

  test("calls setFilters when rating is changed", () => {
    const { asFragment } = render(
      <FilterPanel
        filters={{ rating: 0 }}
        setFilters={setFiltersMock}
        handlePriceRangeChange={handlePriceRangeChangeMock}
      />
    );

    expect(asFragment()).toMatchSnapshot();

    fireEvent.change(screen.getByRole("spinbutton"), {
      target: { value: 4.5 },
    });
    expect(setFiltersMock).toHaveBeenCalledWith(expect.any(Function));

    const updatedFilters = setFiltersMock.mock.calls[0][0]({});
    expect(updatedFilters.rating).toBe("0");
  });
});

afterAll(() => jest.clearAllMocks());
