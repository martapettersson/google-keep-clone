const formValidation = (submitedFields, formType) => {
	let fields = [];

	if (formType === "signup") {
		fields = [
			"displayName",
			"email",
			"fullName",
			"password",
			"passwordConfirm",
		];
	} else if (formType === "login") {
		fields = ["email", "password"];
	}

	let isThereEmptySubmitedFields = false;
	fields.forEach((field) => {
		if (
			submitedFields[field] === "" ||
			typeof submitedFields[field] === "undefined"
		) {
			isThereEmptySubmitedFields = true;
		}
	});
	if (isThereEmptySubmitedFields) {
		return "Please fill in all fields";
	}

	// Check if passwords match for the signup form type
	if (
		formType === "signup" &&
		submitedFields.password !== submitedFields.passwordConfirm
	)
		return "Passwords do not match";

	// Check if email is in a write format
	if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(submitedFields.email))
		return "Please provide a valid email address";

	return "valid";
};

export default formValidation;
