/* eslint-disable no-plusplus */
/* eslint-disable no-undef */
const { validatePassword } = require("../utils/validation");

test("Verify validatePassword returns true for valid password", () => {
  const password = "AbC45678";
  const passwordConfirm = password;
  const firstCheck = validatePassword(password, passwordConfirm);
  expect(firstCheck.success).toBe(true);
});

test("Verify validatePassword returns error when password and password confirmation do not match", () => {
  const password = "12345678";
  const passwordConfirm = "01234567";
  const firstCheck = validatePassword(password, passwordConfirm);
  expect(firstCheck.success).toBe(false);
});

test("Verify validatePassword returns error for invalid passwords containing special characters", () => {
  const password = '<script>alert("Hello World!")</script>';
  const passwordConfirm = password;
  const firstCheck = validatePassword(password, passwordConfirm);
  expect(firstCheck.success).toBe(false);
});

test("Verify validatePassword returns error for too short passwords", () => {
  let password = "";
  const character = "A";
  for (let i = 0; i < 7; i++) {
    const passwordConfirm = password;
    const firstCheck = validatePassword(password, passwordConfirm);
    expect(firstCheck.success).toBe(false);
    password += character;
  }
});
