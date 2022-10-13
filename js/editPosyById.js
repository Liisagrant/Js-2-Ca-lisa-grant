import { getToken } from "./utils/storage";
import { GET_POST_BY_ID_URL, EDIT_POST_URL } from "./settings/api";
import { checkLength } from "./utils/validation";

const accessToken = getToken();
if (!accessToken) {
  location.href = "/login.html";
}

const editPostForm = document.querySelector("#edit-post");
console.log(editPostForm);
const titleEdit = document.querySelector("#title");
console.log(titleEdit);
const titleEditError = document.querySelector("#titleError");
console.log(titleEditError);
const messageEdit = document.querySelector("#message");
console.log(messageEdit);
const messageeditError = document.querySelector("#messageError");
console.log(messageeditError);

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
  console.log(response);
  if (response.status === 200) {
    const data = await response.json();
    console.log(data);
    const { title, body, created, updated, id } = data;
    console.log(title);
    console.log(body);
    console.log(created);
    console.log(updated);
    console.log(id);
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
    console.log("Valid form");
    console.log(titleEdit.value);
    console.log(messageEdit.value);
    const postData = {
      title: titleEdit.value,
      body: messageEdit.value,
    };
    console.log(postData);
    const accessToken = getToken();
    console.log(accessToken);

    (async function editPost() {
      const response = await fetch(`${EDIT_POST_URL}/${postID}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(postData),
      });

      console.log("post edition response", response);
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        console.log("edit post all good");
        location.href = `post-detail.html?id=${postID}`;
      } else {
        const err = await response.json();
        const message = "edit post faild";
        throw new error(message);
      }
      editPostForm.reset();
    })().catch((err) => {
      console.log(err);
    });
  } else {
    console.log("validation faild");
  }
});
