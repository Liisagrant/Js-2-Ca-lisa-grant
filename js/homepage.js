import { GET_POST_URL } from "./settings/api";
import { getToken, getUserName } from "./utils/storage";
import moment from "moment";

const userName = getUserName();
console.log(userName);
const greetUserContainer = document.querySelector("#greeting");
console.log(greetUserContainer);
const postContainer = document.querySelector("#post-container");
console.log(postContainer);
const accessToken = getToken();
if (!accessToken) {
  location.href = "/login.html";
}

const greetUser = () => {
  greetUserContainer.innerHTML = `
        <h1
            class="font-bold text-white text-center text-lg mx-auto max-w-3xl px-8 sm:px-6 lg:max-w-7xl lg:px-8"
          >
            Hello 👋🏼 ${userName}
        </h1>
 `;
};

greetUser();

(async function getAllPosts() {
  const response = await fetch(GET_POST_URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
  console.log("get all posts", response);
  if (response.ok) {
    const posts = await response.json();
    console.log(posts);
    console.log("posts are here:):)");
    let now = moment(new Date());
    if (!posts.length) {
      postContainer.innerHTML = "Sorry no posts today";
    } else {
      const listofPosts = posts.map((post) => {
        console.log(post);
        const { body, title, created } = post;
        console.log(body);
        console.log(title);
        console.log(created);
        const daysSinceCreated = now.diff(created, "day");

        postContainer.innerHTML += `
        <ul role="list" class="divide-y divide-gray-200">
            <li class="py-4">
              <div class="flex space-x-3">
                <div class="flex-1 space-y-1 bg-slate-200 px-2 py-2 rounded-md">
                  <div class="flex items-center justify-between">
                    <h3 class="text-sm font-medium">${title}</h3>
                    <p class="text-sm text-gray-500">posted ${daysSinceCreated}</p>
                  </div>
                  <p class="text-sm text-gray-500">
                    ${body}
                  </p>
                </div>
              </div>
            </li>
          </ul>
        `;
      });
    }
  } else {
    const err = await response.json();
    const message = `sorry some error ${err}`;
    throw new Error(message);
  }
})().catch((err) => {
  console.log("sorry get post faild:(");
  console.log(err);
});
