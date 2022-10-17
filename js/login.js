import { LOG_IN_URL } from "./settings/api";
import { validEmail, checkLength } from "./utils/validation";
import { saveUser, saveToken } from "./utils/storage";

const logInForm = document.querySelector("#login-form");
const email = document.querySelector("#email");
const emailError = document.querySelector("#emailError");
const emailNotValid = document.querySelector("#emailErrorNotValid");
const password = document.querySelector("#password");
const passwordError = document.querySelector("#passwordError");
const alloverError = document.querySelector("#AlloverError");

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
          saveToken(data.accessToken);

          const userToSave = {
            name: data.name,
            email: data.email,
          };
          saveUser(userToSave);
          location.href = "/homepage.html";
        } else {
          const errorError = await response.json();
          const message = `Error: ${errorError.message}`;
          throw new Error(message);
        }
      })().catch((errorError) => {
        alloverError.innerHTML = `Sorry we have an error!${errorError.message}`;
      });
    } else {
      console.log("This did absoloutely not work");
    }
  });
}
