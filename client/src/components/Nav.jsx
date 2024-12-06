import { Outlet, NavLink } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuth";
import { useEffect, useState } from "react";
import { getMyUserService } from "../services/user.service";
import Aside from "./Aside";
import { Link } from "react-router-dom";
const Nav = () => {
  const { autenticated, logout, userPayload } = useAuthContext();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const userId = userPayload?._id;
        if (token && userId) {
          const response = await getMyUserService(token, userId);
          setUser(response.data);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (autenticated && userPayload?._id) {
      fetchUserData();
    }
  }, [autenticated, userPayload]);

  return (
    <>
      <nav className="max-w-screen relative border-gray-200 bg-gray-900 z-50">
        <div className=" fixed top-0 flex justify-between p-4 w-full bg-gray-900 ">
          {/* Logo and Title */}
          <Link
            to={"/"}
          >
            <div className="flex items-center space-x-3 rtl:space-x-reverse">
              <svg
                className="w-[48px] h-[48px] text-gray-800 dark:text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeWidth={2}
                  d="M4.5 17H4a1 1 0 0 1-1-1 3 3 0 0 1 3-3h1m0-3.05A2.5 2.5 0 1 1 9 5.5M19.5 17h.5a1 1 0 0 0 1-1 3 3 0 0 0-3-3h-1m0-3.05a2.5 2.5 0 1 0-2-4.45m.5 13.5h-7a1 1 0 0 1-1-1 3 3 0 0 1 3-3h3a3 3 0 0 1 3 3 1 1 0 0 1-1 1Zm-1-9.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z"
                />
              </svg>
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                MushRoom-Forum
              </span>
            </div>
          </Link>

          {/* Search Bar */}
          <div className="flex items-center mx-3 w-1/2">
            <form className="w-full relative">
              <label
                htmlFor="default-search"
                className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
              >
                Search
              </label>
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <input
                  type="search"
                  id="default-search"
                  className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search for a post"
                  required=""
                />
                <button
                  type="submit"
                  className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Search
                </button>
              </div>
            </form>
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-6 rtl:space-x-reverse">
            {autenticated ? (
              <>
                <NavLink to="/" onClick={logout}>
                  <button
                    type="button"
                    className="text-white bg-[#FF9119] hover:bg-[#FF9119]/80 focus:ring-4 focus:outline-none focus:ring-[#FF9119]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-[#FF9119]/80 dark:focus:ring-[#FF9119]/40"
                  >
                    Logout
                  </button>
                </NavLink>
                {user && (
                  <button
                    type="button"
                    className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                  >
                    <img
                      src={user.user.avatar}
                      alt="User Avatar"
                      className="w-[41px] h-[41px] rounded-full object-cover"
                    />
                  </button>
                )}
              </>
            ) : (
              <NavLink to="/login">
                <button
                  type="button"
                  className="text-white bg-[#FF9119] hover:bg-[#FF9119]/80 focus:ring-4 focus:outline-none focus:ring-[#FF9119]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-[#FF9119]/80 dark:focus:ring-[#FF9119]/40"
                >
                  Login
                </button>
              </NavLink>
            )}
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export default Nav;