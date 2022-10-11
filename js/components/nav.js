import { getUserName } from "../utils/storage";

const myNavBar = () => {
  const { pathname } = document.location;
  const navBar = document.querySelector("#nav-bar");
  if (navBar) {
    const userName = getUserName();
    let navBarLinks;
    navBarLinks = `
            <a  class="px-2.5 py-2" href="#">
              <span class="text-white text-3xl font-bold">PALS</span>
            </a>
            <li class="px-4 py-4 text-white">
            <a href ="index.html" class="${
              pathname === "index.html" ? "text-blue-600" : ""
            }">LogIn</a>
            </li>
            <li class="px-4 py-4 text-white"><a href ="signup.html" class="${
              pathname === "signup.html" ? "text-blue-600" : ""
            }">SignUp</a></li>

      `;
    if (userName) {
      navBarLinks = `
            <a class="px-1 py-2" href="#">
              <span class="text-white px-4 py-8 text-2xl font-bold">PALS</span>
            </a>
            <li class="px-2 py-4 text-white">
            <a href ="homepage.html" class="${
              pathname === "homepage.html" ? "text-blue-600" : ""
            }">Home</a>
            </li>
            <li class="px-2 py-4 text-white">
            <a href ="my-posts.html" class="${
              pathname === "my-posts.html" ? "text-blue-600" : ""
            }">My posts</a>
            </li>
            <li class="px-2 py-4 text-white"><button id="logoutbtn">LogOut</button></li>
          
    
          `;
    }
    navBar.innerHTML = `
        <ul class="flex">
           ${navBarLinks}
        </ul>`;
  }
};
export default myNavBar;
