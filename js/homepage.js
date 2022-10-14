import { GET_POST_URL, CREATE_POST_URL, SORT_ASC_URL } from "./settings/api";
import { getToken, getUserName } from "./utils/storage";
import { checkLength } from "./utils/validation";
import moment from "moment";

const userName = getUserName();
const greetUserContainer = document.querySelector("#greeting");
const postContainer = document.querySelector("#post-container");

const accessToken = getToken();
if (!accessToken) {
  location.href = "/index.html";
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

const searchBar = document.querySelector("#search");
let data = [];

searchBar.addEventListener("keyup", (e) => {
  const searchString = e.target.value.toLowerCase();
  const filteredPosts = data.filter((post) => {
    return post.title.toLowerCase().includes(searchString);
  });
  showData(filteredPosts);
});

async function getAllPosts() {
  const response = await fetch(GET_POST_URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (response.ok) {
    data = await response.json();
    showData(data);
  } else {
    const error = await response.json();
    const errorMessage = `Sorry, there is an error ${error}`;
  }
}

const showData = (data) => {
  postContainer.innerHTML = "";
  let now = moment(new Date());
  if (!data.length) {
    postContainer.innerHTML = "Sorry no posts today";
  } else {
    const listofPosts = data
      .map((post) => {
        const { body, title, created, id } = post;
        const daysSinceCreated = now.diff(created, "day");

        return `
         <a href ="post-detail.html?id=${id}">
        <ul role="list" class="divide-y divide-gray-200">
            <li class="py-4">
              <div class="flex space-x-3">
                <div class="flex-1 space-y-1 bg-slate-200 px-2 py-2 rounded-md">
                  <div class="flex items-center justify-between">
                    <h3 class="text-sm font-medium">${title}</h3>
                    <p class="text-sm text-gray-500">posted: ${daysSinceCreated} days ago</p>
                  </div>
                  <p class="text-sm text-gray-500">
                    ${body}
                  </p>
                </div>
              </div>
            </li>
          </ul>
          </a>
  `;
      })
      .join("");
    postContainer.insertAdjacentHTML("beforeend", listofPosts);
  }
};

getAllPosts().then(() => {
  showData(data);
});

const createPostForm = document.querySelector("#create-post");
const titlePost = document.querySelector("#title");
const titleError = document.querySelector("#titleError");
const messagePost = document.querySelector("#message");
const messageError = document.querySelector("#messageError");

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
    const postData = {
      title: titlePost.value,
      body: messagePost.value,
    };
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
        window.location.reload();
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

const newestPostBTN = document.querySelector("#new-post-btn");
const oldestPostBTN = document.querySelector("#old-post-btn");

const postContainerAsc = document.querySelector("#postAsc-container");

oldestPostBTN.addEventListener("click", () => {
  getPostAsc();
});

const getPostAsc = async () => {
  try {
    const response = await fetch(SORT_ASC_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (response.ok) {
      const postsAsc = await response.json();
      let now = moment(new Date());
      if (!postsAsc.length) {
        postContainer.innerHTML = "Sorry no post today!";
      } else {
        const listofPosts = postsAsc.map((postAsc) => {
          const { body, title, created, id } = postAsc;
          const daysSinceCreated = now.diff(created, "day");

          postContainerAsc.innerHTML += `
        <a href ="post-detail.html?id=${id}">
        <ul role="list" class="divide-y divide-gray-200">
            <li class="py-4">
              <div class="flex space-x-3">
                <div class="flex-1 space-y-1 bg-slate-200 px-2 py-2 rounded-md">
                  <div class="flex items-center justify-between">
                    <h3 class="text-sm font-medium">${title}</h3>
                    <p class="text-sm text-gray-500">posted: ${daysSinceCreated} days ago </p>
                  </div>
                  <p class="text-sm text-gray-500">
                    ${body}
                  </p>
                </div>
              </div>
            </li>
          </ul>
          </a>
        `;
        });
        postContainerAsc.classList.remove("hidden");
      }
    }
  } finally {
  }
};

const removeOldPopst = () => {
  postContainerAsc.classList.add("hidden");
};

newestPostBTN.addEventListener("click", () => {
  removeOldPopst();
});
