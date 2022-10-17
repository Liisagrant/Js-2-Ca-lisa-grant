import { getUserName } from "../utils/storage";

const userName = getUserName();

const BASE_URL = "https://nf-api.onrender.com/";

const SIGN_UP_URL = BASE_URL + "api/v1/social/auth/register";
const LOG_IN_URL = BASE_URL + "api/v1/social/auth/login";
const GET_POST_URL = BASE_URL + "api/v1/social/posts";
const CREATE_POST_URL = BASE_URL + "api/v1/social/posts";
const GET_USER_POSTS =
  BASE_URL + `api/v1/social/profiles/${userName}?_posts=true`;
const GET_POST_BY_ID_URL = BASE_URL + "api/v1/social/posts";
const EDIT_POST_URL = BASE_URL + "api/v1/social/posts";
const DELETE_POST_URL = BASE_URL + `api/v1/social/posts`;
const SORT_ASC_URL =
  BASE_URL + "api/v1/social/posts?sort=created&sortOrder=asc";

export {
  BASE_URL,
  SIGN_UP_URL,
  LOG_IN_URL,
  GET_POST_URL,
  CREATE_POST_URL,
  GET_USER_POSTS,
  GET_POST_BY_ID_URL,
  EDIT_POST_URL,
  DELETE_POST_URL,
  SORT_ASC_URL,
};
