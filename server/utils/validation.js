exports.validatePassword = (password, passwordConfirm) => {
  if (!password === passwordConfirm) {
    return {
      passwordError: "Passwords do not match.",
    };
  }
  if (!password.match(/^[a-zA-Z0-9]{8}$/)) {
    return {
      passwordError:
        "Password must be at least 8 characters long. No special characters, only letters and numbers.",
    };
  }
  return true;
};
