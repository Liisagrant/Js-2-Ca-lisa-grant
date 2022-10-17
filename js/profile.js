import {getToken} from "./utils/storage";
import {GET_PROFILE} from "./settings/api";
import {isMoment} from "moment";
import moment from "moment";

const accessToken = getToken();
if (!accessToken) {
    location.href = "/index.html";
}

const profileContainer = document.querySelector("#profile-info");
console.log(profileContainer);

let now = moment(new Date());
