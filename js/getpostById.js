import { getToken } from "./utils/storage";
import { GET_POST_BY_ID_URL } from "./settings/api";
import moment from "moment";

const paramstring = window.location.search;
const searchParam = new URLSearchParams(paramstring);
const postID = searchParam.get("id");
const accessToken = getToken();
const SinglePostsContainer = document.querySelector("#SinglePostsContainer");

console.log(accessToken);
console.log(GET_POST_BY_ID_URL);
console.log(postID);

let now = moment(new Date());

const getPostById = async () => {
  const response = await fetch(`${GET_POST_BY_ID_URL}/${postID}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
  console.log(response);
  const data = await response.json();
  console.log(data);
  const { title, body, created, updated, id } = data;
  console.log(title);
  console.log(body);
  console.log(created);
  console.log(updated);
  console.log(id);

  const minuteSinceCreated = now.diff(created, "minutes");
  SinglePostsContainer.innerHTML = `
          <div class=" bg-slate-200 px-6 py-6 rounded-md">
        <div>
            <h2 class="font-bold py-2">Title: ${title}</h2>
          </div>
          <div ><p class="py-1">body: ${body}</p></div>
          <div>
            <p class="font-medium py-1">user ID: ${id}</p>
          </div>
          <div>
            <p class="py-1" >created: ${minuteSinceCreated} minutes ago</p>
          </div>
        </div>

  `;
};

getPostById();
