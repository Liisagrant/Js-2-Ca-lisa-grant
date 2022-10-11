import { GET_POST_URL, CREATE_POST_URL } from "./settings/api";
import { getToken, getUserName } from "./utils/storage";
import { checkLength } from "./utils/validation";
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

const createPostForm = document.querySelector("#create-post");
console.log(createPostForm);

const titlePost = document.querySelector("#title");
console.log(titlePost);

const titleError = document.querySelector("#titleError");
console.log(titleError);

const messagePost = document.querySelector("#message");
console.log(messagePost);

const messageError = document.querySelector("#messageError");
console.log(messageError);

createPostForm.addEventListener("submit", (event) => {
  event.preventDefault();

  let isTitlePostOk = false;
  if (checkLength(titlePost.value, 0)) {
    titleError.classList.add("hidden");
    isTitlePostOk = true;
  } else {
    titleError.classList.remove("hidden");
  }

  let isMessagePostOk = false;
  if (checkLength(messagePost.value, 2)) {
    messageError.classList.add("hidden");
    isMessagePostOk = true;
  } else {
    messageError.classList.remove("hidden");
  }

  let isPostFormValid = isTitlePostOk & isMessagePostOk;
  if (isPostFormValid) {
    console.log("validation is good");
    console.log(titlePost.value);
    console.log(messagePost.value);
    const postData = {
      title: titlePost.value,
      body: messagePost.value,
    };
    console.log(postData);
    const accessToken = getToken();

    (async function createNewPost() {
      const response = await fetch(CREATE_POST_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(postData),
      });
      console.log("post created response", response);
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        console.log("YAAAY POST IS CREATED:)");
      } else {
        const err = await response.json();
        const message = "create post faild";
        throw new Error(message);
      }
      createPostForm.reset();
    })().catch((err) => {
      console.log(err);
    });
  } else {
    console.log("This faild");
  }
});
