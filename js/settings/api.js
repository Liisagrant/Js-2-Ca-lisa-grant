import { getUserName } from "../utils/storage";

const userName = getUserName();
console.log(userName);

const BASE_URL = "https://nf-api.onrender.com/";
const SIGN_UP_URL = BASE_URL + "api/v1/social/auth/register";
const LOG_IN_URL = BASE_URL + "api/v1/social/auth/login";
const GET_POST_URL = BASE_URL + "api/v1/social/posts";

export { BASE_URL, SIGN_UP_URL, LOG_IN_URL, GET_POST_URL };
