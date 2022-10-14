import { getUserName } from "../utils/storage";

const myNavBar = () => {
  const { pathname } = document.location;
  const navBar = document.querySelector("#nav-bar");
  if (navBar) {
    const userName = getUserName();
    let navBarLinks;
    navBarLinks = `
            <a  class="px-2.5 py-6" href="#">
              <span class="text-white text-3xl font-bold">PALS</span>
            </a>
            <li class="px-4 py-7 text-white">
            <a href ="/index.html" class="${
              pathname === "/index.html" ? "text-gray-700" : ""
            }">LogIn</a>
            </li>
            <li class="px-4 py-7 text-white"><a href ="/signup.html" class="${
              pathname === "/signup.html" ? "text-gray-700" : ""
            }">SignUp</a></li>

      `;
    if (userName) {
      navBarLinks = `
            <a class="px-1 py-5" href="/homepage.html">
              <span class="text-white px-1 py-5 text-lg sm:text-3xl sm:py-8 font-bold">PALS</span>
            </a>
            <li class="px-1.5 py-6 text-white sm:px-4 sm:py-7">
            <a href="/homepage.html" class="${
              pathname === "/homepage.html" ? "text-gray-700" : ""
            }">Home</a>
            </li>
            <li class="px-1.5 py-6 text-white sm:px-4 sm:py-7">
            <a href ="/my-posts.html" class="${
              pathname === "/my-posts.html" ? "text-gray-700" : ""
            }">MyPosts</a>
            </li>
            <li class="px-1.5 py-6 text-white sm:px-4 sm:py-7">
            <a href ="/profile.html" class="${
              pathname === "/profile.html" ? "text-gray-700" : ""
            }">Profile</a>
            </li>
            <li class="px-1.5 py-6 sm:px-4 sm:py-7"><button  class="text-white" id="logoutbtn">LogOut</button></li>
          
    
          `;
    }
    navBar.innerHTML = `
        <ul class="flex">
           ${navBarLinks}
        </ul>`;
  }
};
export default myNavBar;
