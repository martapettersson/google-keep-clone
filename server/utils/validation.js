exports.validatePassword = (password, passwordConfirm) => {
  if (password !== passwordConfirm) {
    return {
      success: false,
      passwordError: "Passwords do not match.",
    };
  }
  if (!password.match(/^[a-zA-Z0-9]{8}$/)) {
    return {
      success: false,
      passwordError:
        "Password must be at least 8 characters long. No special characters, only letters and numbers.",
    };
  }
  return { success: true };
};
