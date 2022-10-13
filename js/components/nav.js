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
            <li class="px-4 py-4">
            <a href ="/index.html" class="${
              pathname === "/index.html" ? "text-white" : ""
            }">LogIn</a>
            </li>
            <li class="px-4 py-4"><a href ="/signup.html" class="${
              pathname === "/signup.html" ? "text-white" : ""
            }">SignUp</a></li>

      `;
    if (userName) {
      navBarLinks = `
            <a class="px-1 py-4" href="/homepage.html">
              <span class="text-white px-4 py-8 text-2xl font-bold">PALS</span>
            </a>
            <li class="px-2 py-6">
            <a href="/homepage.html" class="${
              pathname === "/homepage.html" ? "text-white" : ""
            }">🏠</a>
            </li>
            <li class="px-2 py-6 ">
            <a href ="/my-posts.html" class="${
              pathname === "/my-posts.html" ? "text-white" : ""
            }">MyPosts</a>
            </li>
            <li class="px-2 py-6 ">
            <a href ="/profile.html" class="${
              pathname === "/profile.html" ? "text-white" : ""
            }">👤</a>
            </li>
            <li class="px-2 py-6"><button id="logoutbtn">LogOut</button></li>
          
    
          `;
    }
    navBar.innerHTML = `
        <ul class="flex">
           ${navBarLinks}
        </ul>`;
  }
};
export default myNavBar;
