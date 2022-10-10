import { LOG_IN_URL } from "./settings/api";
import { validEmail, checkLength } from "./utils/validation";
import { saveUser, saveToken } from "./utils/storage";

const logInForm = document.querySelector("#login-form");
console.log(logInForm);

const email = document.querySelector("#email");
console.log(email);
const emailError = document.querySelector("#emailError");
console.log(emailError);
const emailNotValid = document.querySelector("#emailErrorNotValid");
console.log(emailNotValid);

const password = document.querySelector("#password");
console.log(password);
const passwordError = document.querySelector("#passwordError");
console.log(passwordError);

const allOverError = document.querySelector("#AlloverError");
console.log(allOverError);

if (logInForm) {
  logInForm.addEventListener("submit", (event) => {
    event.preventDefault();

    let isEmailOk = false;
    if (checkLength(email.value, 0)) {
      emailError.classList.add("hidden");
      isEmailOk = true;
    } else {
      emailError.classList.remove("hidden");
    }

    let isEmailValidOk = false;
    if (checkLength(email.value, 0) && validEmail(email.value) === true) {
      emailNotValid.classList.add("hidden");
      isEmailValidOk = true;
    } else if (
      checkLength(email.value, 0) &&
      validEmail(email.value) === false
    ) {
      emailNotValid.classList.remove("hidden");
    }

    let isPasswordOK = false;
    if (checkLength(password.value, 8)) {
      passwordError.classList.add("hidden");
      isPasswordOK = true;
    } else {
      passwordError.classList.remove("hidden");
    }

    let isFormValid = isEmailOk && isEmailValidOk && isPasswordOK;

    if (isFormValid) {
      console.log("form is valid:)");
      const userData = {
        email: email.value,
        password: password.value,
      };

      const LOGIN_USER_URL_ENDPOINT = `${LOG_IN_URL}`;

      (async function logInUser() {
        const response = await fetch(LOGIN_USER_URL_ENDPOINT, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        });

        if (response.ok) {
          const data = await response.json();
          console.log(data);
          console.log(data.accessToken);
          saveToken(data.accessToken);

          const userToSave = {
            name: data.name,
            email: data.email,
          };
          console.log(userToSave);
          saveUser(userToSave);
          console.log("login succeed");
          location.href = "/homepage.html";
        } else {
          const errorError = await response.json();
          const message = `Sorry there is an error ${errorError.message}`;
          console.log(" login faild");
          throw new Error(message);
        }
      })().catch((errorError) => {
        allOverError.innerHTML = `Sorry we have an error!${errorError.message}`;
      });
    } else {
      console.log("This did absoloutely not work");
    }
  });
}
