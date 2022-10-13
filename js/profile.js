import { getToken } from "./utils/storage";
const accessToken = getToken();
if (!accessToken) {
  location.href = "/login.html";
}
