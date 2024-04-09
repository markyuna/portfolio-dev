import { render, screen } from "@testing-library/react";
import { toBeInTheDocument } from "@testing-library/jest-dom"; // Import the toBeInTheDocument function
import '@testing-library/jest-dom/extend-expect';

expect.extend({ toBeInTheDocument }); // Add the toBeInTheDocument function to the JestMatchers type

import HomePage from "@/app/page";

it("render home page", () => {
    render(<HomePage />);

    expect(screen.getByText("Marcos Suarez")).toBeInTheDocument();
});