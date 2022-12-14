import { SIGN_UP_URL } from "./settings/api";
import { validEmail, validatePassword, checkLength } from "./utils/validation";

const form = document.querySelector("#signup-form");
const firstName = document.querySelector("#firstname");
const firstNameError = document.querySelector("#firstnameError");
const email = document.querySelector("#email");
const emailNotValid = document.querySelector("#emailErrorNotValid");
const emailError = document.querySelector("#emailError");
const password = document.querySelector("#password");
const passwordError = document.querySelector("#passwordError");
const confirmPassword = document.querySelector("#confirmpassword");
const confirmPasswordError = document.querySelector("#confirmpasswordError");
const PasswordNoMatchError = document.querySelector("#passwordErrorNotMatch");
const errorIfNoGoodSignup = document.querySelector("#error-signup-user");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  let isFirstNameOK = false;
  if (checkLength(firstName.value, 1) === true) {
    firstNameError.classList.add("hidden");
    isFirstNameOK = true;
  } else {
    firstNameError.classList.remove("hidden");
  }

  let isEmailOk = false;
  if (checkLength(email.value, 1)) {
    emailError.classList.add("hidden");
    isEmailOk = true;
  } else {
    emailError.classList.remove("hidden");
  }

  let isEmailValidOk = false;
  if (checkLength(email.value, 1) && validEmail(email.value) === true) {
    emailNotValid.classList.add("hidden");
    isEmailValidOk = true;
  } else if (checkLength(email.value, 1) && validEmail(email.value) === false) {
    emailNotValid.classList.remove("hidden");
  }

  let isPasswordOK = false;
  if (checkLength(password.value, 8)) {
    passwordError.classList.add("hidden");
    isPasswordOK = true;
  } else {
    passwordError.classList.remove("hidden");
  }

  let isConfirmPasswordOk = false;
  if (checkLength(confirmPassword.value, 8)) {
    confirmPasswordError.classList.add("hidden");
    isConfirmPasswordOk = true;
  } else {
    confirmPasswordError.classList.remove("hidden");
  }

  let isPasswordMatch = false;
  isPasswordMatch = validatePassword(password.value, confirmPassword.value);
  if (isPasswordMatch) {
    PasswordNoMatchError.classList.add("hidden");
    isPasswordMatch = true;
  } else {
    PasswordNoMatchError.classList.remove("hidden");
  }

  let isFormValid =
    isFirstNameOK &&
    isEmailOk &&
    isEmailValidOk &&
    isPasswordOK &&
    isConfirmPasswordOk &&
    isPasswordMatch;

  if (isFormValid) {
    const userData = {
      name: firstName.value,
      email: email.value,
      password: password.value,
    };

    const REG_USER_URL_ENDPOINT = SIGN_UP_URL;
    (async function userSignUp() {
      try {
        const response = await fetch(REG_USER_URL_ENDPOINT, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        });

        if (response.ok) {
          location.href = "./index.html";
        } else {
          const err = await response.json();
          const message = `Error: ${err.message}`;
          throw new Error(message);
        }
      } catch (err) {
        errorIfNoGoodSignup.innerHTML = `Sorry we have an error!${err.message}`;
      }
    })();
  } else {
    console.log("sorry bad request");
  }
});
