/* eslint-disable no-unused-vars */
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import LoginForm from "../components/Forms/LoginForm";

test("that Login has a submit button and that button triggers submit handler", () => {
	let input = "";
	const onSubmit = () => {
		input = "Hej";
	};
	render(<LoginForm handleSubmit={onSubmit} />);
	const submit = screen.getByRole("button");
	expect(submit).toBeInTheDocument();
	fireEvent(submit, new MouseEvent("click"));
	expect(input).toBe("Hej");
});
