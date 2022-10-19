import { getToken } from "./utils/storage";
import { GET_POST_BY_ID_URL, EDIT_POST_URL } from "./settings/api";
import { checkLength } from "./utils/validation";

const accessToken = getToken();
if (!accessToken) {
  location.href = "/index.html";
}

const editPostForm = document.querySelector("#edit-post");
const titleEdit = document.querySelector("#title");
const titleEditError = document.querySelector("#titleError");
const messageEdit = document.querySelector("#message");
const messageeditError = document.querySelector("#messageError");
const formEditError = document.querySelector("#formEditError");

const paramstring = window.location.search;
const searchParam = new URLSearchParams(paramstring);
const postID = searchParam.get("id");

const getPostById = async () => {
  const response = await fetch(`${GET_POST_BY_ID_URL}/${postID}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (response.status === 200) {
    const data = await response.json();
    const { title, body, created, updated, id } = data;
    titleEdit.value = title;
    messageEdit.value = body;
  } else {
    const err = await response.json();
    throw err.message;
  }
};

getPostById().catch((err) => {
  console.log(err);
});

editPostForm.addEventListener("submit", (event) => {
  event.preventDefault();

  let isTitleEditOk = false;
  if (checkLength(titleEdit.value, 0)) {
    titleEditError.classList.add("hidden");
    isTitleEditOk = true;
  } else {
    titleEditError.classList.remove("hidden");
  }

  let isMessageEditOk = false;
  if (checkLength(messageEdit.value, 2)) {
    messageeditError.classList.add("hidden");
    isMessageEditOk = true;
  } else {
    messageeditError.classList.remove("hidden");
  }

  let isFormEditValid = isMessageEditOk && isTitleEditOk;

  if (isFormEditValid) {
    const postData = {
      title: titleEdit.value,
      body: messageEdit.value,
    };
    const accessToken = getToken();

    (async function editPost() {
      const response = await fetch(`${EDIT_POST_URL}/${postID}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(postData),
      });

      if (response.ok) {
        const data = await response.json();
        location.href = `post-detail.html?id=${postID}`;
      } else {
        const err = await response.json();
        const message = "edit post faild";
        throw new error(message);
      }
      editPostForm.reset();
    })().catch((err) => {
      formEditError.innerHTML = `${err.message}`;
    });
  } else {
    formEditError.innerHTML = "Sorry! we have an error";
  }
});
