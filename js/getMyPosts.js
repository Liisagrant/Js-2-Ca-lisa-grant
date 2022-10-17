import { GET_USER_POSTS, DELETE_POST_URL } from "./settings/api";
import { getToken } from "./utils/storage";
import moment from "moment";

let now = moment(new Date());

const accessToken = getToken();
if (!accessToken) {
  location.href = "/index.html";
}

const myPostsContianer = document.querySelector("#myPostsContainer");
const postNotification = document.querySelector(".post-notification");

const GetMyUserPosts = async () => {
  const response = await fetch(GET_USER_POSTS, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (response.ok) {
    const data = await response.json();
    myPostsContianer.innerHTML = "";
    const { posts } = data;
    if (!posts.length) {
      myPostsContianer.innerHTML =
        "You have no posts yet, but write one today!";
    } else {
      const numberOfPosts = posts.length;
      for (let post of posts) {
        const minuteSinceCreated = now.diff(post.created, "minutes");
        myPostsContianer.innerHTML += `
        <div class=" bg-slate-200 px-6 py-6 rounded-md">
        <div>
            <h2 class="font-bold py-2">Title: ${post.title}</h2>
          </div>
          <div ><p class="py-1">body: ${post.body}</p></div>
          <div>
            <p class="font-medium py-1">user ID: ${post.id}</p>
          </div>
          <div>
            <p class="py-1" >created: ${minuteSinceCreated} minutes ago</p>
          </div>
                    <div>
            <p class="py-1">Written by: ${post.owner}</p>
          </div>
          <div class="flex justify-evenly">
            <a href="/edit-post.html?id=${post.id}"<button class="bg-cyan-400 px-4 py-2 rounded-md">Edit</button></a>
            <button data-id=${post.id} class="delet-btn bg-red-300 px-4 py-2 rounded-md">Delete</button>
          </div>
        </div>
        
        `;
      }
    }
  } else {
    postNotification.innerHTML = await response.json();
    myPostsContianer.innerHTML = "Sorry we have an issue";
  }
};

GetMyUserPosts().then(() => {
  handledeleteBtnsEvent();
});

function handledeleteBtnsEvent() {
  let deletButtons = document.getElementsByClassName("delet-btn");
  const totalDeletBtns = deletButtons.length;
  for (let i = 0; i < totalDeletBtns; i++) {
    deletButtons[i].addEventListener("click", function () {
      const postId = this.dataset.id;
      handleDeletPostById(postId);
    });
  }
}

function handleDeletPostById(id) {
  const deletUserById = async () => {
    try {
      let response = await fetch(`${DELETE_POST_URL}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (response.status === 200) {
        GetMyUserPosts().then(() => {
          handledeleteBtnsEvent;
        });
      } else {
        const err = await response.json();
        const message = `Sorry we have an error ${err}`;
        throw Error(message);
      }
    } catch (error) {
      postNotification.innerHTML = `${err.message}`;
    }
  };
  deletUserById().then((r) => {});
}
