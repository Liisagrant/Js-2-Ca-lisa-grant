const tokenKey = "token";
const userKey = "user";

const saveToken = (token) => {
  console.log("token:", token);
  console.log("tokenKey", tokenKey);
  saveToStorage(tokenKey, token);
};

const getToken = () => {
  const value = localStorage.getItem(tokenKey);
  if (value) {
    return JSON.parse(value);
  } else {
    return null;
  }
};

const saveUser = (user) => {
  saveToStorage(userKey, user);
};

const getUserName = () => {
  const user = getFromStorage(userKey);
  if (userKey) {
    return user.name;
  } else {
    return null;
  }
};

const saveToStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const getFromStorage = (key) => {
  const value = localStorage.getItem(key);
  if (value) {
    return JSON.parse(value);
  } else {
    return [];
  }
};

const clearStorage = () => {
  localStorage.clear();
};

export { getUserName, saveToken, saveUser };
