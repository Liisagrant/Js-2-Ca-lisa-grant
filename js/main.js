import "/style.css";
import myNavBar from "./components/nav";
import { clearStorage } from "./utils/storage";

myNavBar();

const logOutBtn = document.querySelector("#logoutbtn");
if (logOutBtn) {
  logOutBtn.addEventListener("click", () => {
    console.log("i am clicked");
    clearStorage();
    window.location.replace("index.html");
  });
}
