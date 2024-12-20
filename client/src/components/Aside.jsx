import { useContext, useState } from "react";
import { ForumContext } from "../context/forum.context";
import { navLinksAside, navLiks } from "../utils/navLinks";
import { Link, useNavigate } from "react-router-dom";

const Aside = () => {
  const { setSelectedCategory, selectedCategory } = useContext(ForumContext);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State to toggle sidebar
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    setSelectedCategory(category); // Update selected category in context
    setIsSidebarOpen(false); // Close sidebar after selection
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen); // Toggle sidebar visibility
  };

  return (
    
      <div className="relative">
        {/* Toggle Button */}
        <button
          onClick={toggleSidebar}
          className="fixed top-28 md:top-36 lg:top-28 left-4 z-10 p-3 bg-gray-800 border border-blue-600 text-white rounded focus:outline-none"
          aria-label="Toggle Sidebar"
        >
          {isSidebarOpen ? "Close" : "Menu"}
        </button>

        {/* Sidebar */}
        {isSidebarOpen && (
          <>
            <aside
              id="default-sidebar"
              className="min-h-screen w-64 bg-gray-800 transform transition-transform fixed mt-1  pt-40"
              aria-label="Sidebar"
            >
              <div className="h-full px-3 py-4 overflow-y-auto">
                <hr className="my-2 border-1 border-white  " />
                <ul className="space-y-2 font-medium text-white mt-4">
                  <li>
                    <button
                      onClick={() => navigate("/forums")}
                      className="w-full p-2 text-left rounded bg-gray-700 hover:bg-gray-600"
                    >
                      See all the forums
                    </button>
                  </li>
                </ul>
                <hr className="my-2 border-1 border-white  " />
                
                <ul className="space-y-2 font-medium text-white mt-4">
                  <li>
                    <button
                      onClick={() => handleCategoryClick("")}
                      className={`w-full p-2 text-left rounded ${
                        selectedCategory === ""
                          ? "bg-gray-600"
                          : "bg-gray-700 hover:bg-gray-600"
                      }`}
                    >
                      filter by category :
                    </button>
                  </li>
                  {navLinksAside.map((link) => (
                    <li key={link.name}>
                      <button
                        onClick={() => handleCategoryClick(link.value)}
                        className={`w-full p-2 text-left rounded ${
                          selectedCategory === link.name
                            ? "bg-gray-600"
                            : "bg-gray-700 hover:bg-gray-600"
                        }`}
                      >
                        {link.name}
                      </button>
                    </li>
                  ))}
                </ul>
                <hr className="my-2 border-1 border-white  " />
                <ul className="space-y-2 font-medium text-white mt-4">
                  <li>
                    <button
                      onClick={() => handleCategoryClick("")}
                      className={`w-full p-2 text-left rounded ${
                        selectedCategory === ""
                          ? "bg-gray-600"
                          : "bg-gray-700 hover:bg-gray-600"
                      }`}
                    >
                      Navigation Menu :
                    </button>
                  </li>
                  {navLiks.map((link) => (
                    <li key={link.name}>
                      <Link to={link.path}>
                        <button
                          className={`w-full p-2 text-left rounded ${
                            selectedCategory === link.name
                              ? "bg-gray-600"
                              : "bg-gray-700 hover:bg-gray-600"
                          }`}
                        >
                          {link.name}
                        </button>
                      </Link>
                    </li>
                  ))}
                </ul>
                <hr className="my-2 border-1 border-white  " />
              </div>
            </aside>
          </>
        )}
      </div>
  );
};

export default Aside;
