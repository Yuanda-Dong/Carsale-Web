import { render, screen } from "@testing-library/react";
import App from "./App";

import '@testing-library/jest-dom'

describe("App tests", () => {
	test("component renders", () => {
		render(<App />);
      expect(screen.getByText(/Car Shop/i)).toBeInTheDocument();
	});
});
