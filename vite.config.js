const { resolve } = require("path");

export default {
  build: {
    rollupOptions: {
      input: {
        login: resolve(__dirname, "index.html"),
        SignUp: resolve(__dirname, "signup.html"),
        home: resolve(__dirname, "homepage.html"),
        myPosts: resolve(__dirname, "my-posts.html"),
        editPost: resolve(__dirname, "edit-post.html"),
        postDetail: resolve(__dirname, "post-detail.html"),
      },
    },
  },
};
