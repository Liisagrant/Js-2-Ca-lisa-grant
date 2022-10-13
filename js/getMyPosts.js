import { GET_USER_POSTS, DELETE_POST_URL } from "./settings/api";
import { getToken } from "./utils/storage";
import moment from "moment";

let now = moment(new Date());

const accessToken = getToken();
if (!accessToken) {
  location.href = "/index.html";
}

const myPostsContianer = document.querySelector("#myPostsContainer");
console.log(myPostsContianer);

const postNotification = document.querySelector(".post-notification");
console.log(postNotification);

const GetMyUserPosts = async () => {
  const response = await fetch(GET_USER_POSTS, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (response.ok) {
    const data = await response.json();
    console.log("POSTS ARE HERE:");
    myPostsContianer.innerHTML = "";
    const { posts } = data;
    if (!posts.length) {
      myPostsContianer.innerHTML =
        "You have no posts yet, but write one today!";
    } else {
      const numberOfPosts = posts.length;
      for (let post of posts) {
        console.log(posts);
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
    console.log("FAILED");
  }
};

GetMyUserPosts().then(() => {
  handledeleteBtnsEvent();
});

function handledeleteBtnsEvent() {
  let deletButtons = document.getElementsByClassName("delet-btn");
  console.log(deletButtons);
  const totalDeletBtns = deletButtons.length;
  for (let i = 0; i < totalDeletBtns; i++) {
    console.log("index of each delet btn", i);
    deletButtons[i].addEventListener("click", function () {
      console.log("you have triggerd click event");
      console.log("this.dataset.postId", this.dataset);
      console.log("this.dataset.postId", this.dataset.id);
      console.log("this.dataset.postId", this.getAttribute("data-id"));
      const postId = this.dataset.id;
      handleDeletPostById(postId);
    });
  }
}

function handleDeletPostById(id) {
  console.log(id);
  console.log("delet post has been clicked");

  const deletUserById = async () => {
    try {
      let response = await fetch(`${DELETE_POST_URL}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (response.status === 200) {
        console.log("post is deleted");
        GetMyUserPosts().then(() => {
          handledeleteBtnsEvent;
        });
      } else {
        const err = await response.json();
        const message = `Sorry we have an error ${err}`;
        throw Error(message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  deletUserById().then((r) => {});
}
