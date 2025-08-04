// RegisterPageLocators.ts

export const RegisterPageLocators = {
  backToLoginButton: `button#gotologin`,
  captchaFrame: `iframe[title="reCAPTCHA"]`,
  firstnameInput: `#firstname`,
  lastnameInput: `#lastname`,
  passwordInput: `#password`,
  registerButton: `button#register`,
  registerHeader: { selector: `h4`, text: `Register to Book Store` },
  userAlreadyExistErrorMessage: `#name`,
  userNameInput: `#userName`,
  weakPasswordError: `p#name`,
};
