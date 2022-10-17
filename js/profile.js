import { getToken } from "./utils/storage";
import { GET_USER_POSTS } from "./settings/api";
import moment from "moment";

const accessToken = getToken();
if (!accessToken) {
  location.href = "/index.html";
}

const profileContainer = document.querySelector("#profile-info");
let now = moment(new Date());

const getProfileInfo = async () => {
  const response = await fetch(GET_USER_POSTS, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (response.ok) {
    const data = await response.json();
    profileContainer.innerHTML = `
        <div class=" bg-slate-200 px-6 py-6 rounded-md">
        <div>
            <h2 class="font-bold py-2">User Name: ${data.name}</h2>
            <p class="font-medium py-1">User email: ${data.email}</p>
          </div>
          <div class="flex justify-center">
            <img src="./img/profile-default-img.jpg" class="w-36 rounded-full mt-6" />
          </div>
        </div>

        
        `;
  } else {
    console.log(error);
  }
};

getProfileInfo();
