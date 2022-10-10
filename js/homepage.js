import { GET_POST_URL } from "./settings/api";
import { getToken } from "./utils/storage";

const postContainer = document.querySelector("#post-container");
console.log(postContainer);
const accessToken = getToken();

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
    if (!posts.length) {
      postContainer.innerHTML = "Sorry no posts today";
    } else {
      const listofPosts = posts.map((post) => {
        console.log(post);
        const { body, title, created } = post;
        console.log(body);
        console.log(title);
        console.log(created);

        postContainer.innerHTML += `
        <ul role="list" class="divide-y divide-gray-200">
            <li class="py-4">
              <div class="flex space-x-3">
                <div class="flex-1 space-y-1">
                  <div class="flex items-center justify-between">
                    <h3 class="text-sm font-medium">${title}</h3>
                    <p class="text-sm text-gray-500">${created}</p>
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
