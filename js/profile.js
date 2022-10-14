import { getToken } from "./utils/storage";
import { GET_PROFILE } from "./settings/api";

const accessToken = getToken();
if (!accessToken) {
  location.href = "/index.html";
}
