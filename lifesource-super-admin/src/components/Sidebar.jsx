import React, { useState, useEffect } from "react";
import {
  ChevronDown,
  ChevronUp,
  BarChart3,
  FileText,
  LayoutDashboard,
  Building2,
  Megaphone,
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { cn } from "../lib/utils";
import { useSidebar } from "../context/SidebarContext";

const Sidebar = () => {
  const { isOpen } = useSidebar();
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [activeToggle, setActiveToggle] = useState("add-ons"); // Default to Add-Ons selected
  const [showSubmenu, setShowSubmenu] = useState(false);
  const [submenuPosition, setSubmenuPosition] = useState({ top: 0, left: 0 });
  const location = useLocation();

  // Close submenu when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      const target = event.target;
      if (
        !target.closest(".sidebar-submenu") &&
        !target.closest(".sidebar-icon")
      ) {
        setShowSubmenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Check if the current path is within a dropdown section
  useEffect(() => {
    const currentPath = location.pathname;
    if (currentPath.startsWith("/support")) {
      setActiveDropdown("/support");
    } else if (currentPath.startsWith("/more")) {
      setActiveDropdown("/more");
    } else if (currentPath.startsWith("/tools")) {
      setActiveDropdown("/tools");
    }
  }, [location]);

  const toggleDropdown = (e, path) => {
    e.preventDefault(); // Prevent navigation
    e.stopPropagation(); // Prevent event bubbling
    setActiveDropdown(activeDropdown === path ? null : path);
  };

  const isDropdownActive = (path) => activeDropdown === path;

  const toggleSubmenu = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const target = e.currentTarget;
    const rect = target.getBoundingClientRect();

    setSubmenuPosition({
      top: rect.top,
      left: rect.right + 10, // Position to the right of the icon
    });

    if (showSubmenu && activeDropdown === path) {
      setShowSubmenu(false);
      setActiveDropdown(null);
    } else {
      setShowSubmenu(true);
      setActiveDropdown(path);
    }
  };

  const navItems = [
    {
      icon: <LayoutDashboard className="w-5 h-5 mr-2" />,
      label: "Dashboard",
      path: "/home",
    },
    {
      icon: <Building2 className="w-5 h-5 mr-2" />,
      label: "Hospitals",
      path: "/hospitals",
    },
    {
      icon: <FileText className="w-5 h-5 mr-2" />,
      label: "Requests",
      path: "/requests",
    },
    {
      icon: <BarChart3 className="w-5 h-5 mr-2" />,
      label: "Reports",
      path: "/reports",
    },
    // {
    //   icon: <Megaphone className="w-5 h-5 mr-2" />,
    //   label: "Announcements",
    //   path: "/announcements",
    // },
  ];

  // Desktop sidebar - full width
  const desktopSidebarClasses = cn(
    "w-[259px] bg-white border-r border-gray-200 h-[calc(100vh-4rem)] fixed top-16 left-0 z-40 hidden md:block transition-transform duration-300 font-work",
    !isOpen && "transform -translate-x-full"
  );

  // Mobile sidebar with only icons
  const mobileSidebarClasses = cn(
    "w-[60px] bg-gray-100 border-r border-gray-200 h-screen fixed top-0 left-0 z-40 flex flex-col items-center py-6 md:hidden transition-transform duration-300 font-work",
    !isOpen && "transform -translate-x-full"
  );

  return (
    <>
      {/* Desktop sidebar - full width */}
      <div className={desktopSidebarClasses}>
        <div className="p-4 space-y-1">
          {navItems.map((item, index) => (
            <div
              key={index}
              className={cn(
                "relative w-full",
                isDropdownActive(item.path) && "mb-0"
              )}
            >
              {item.hasDropdown ? (
                <div
                  className={cn(
                    "flex items-center px-3 py-3 text-base font-medium cursor-pointer w-full text-white hover:bg-[#008080] transition-colors duration-150",
                    isDropdownActive(item.path)
                      ? "bg-[#008080] text-white"
                      : "text-white hover:bg-[#008080]/"
                  )}
                  onClick={(e) => toggleDropdown(item.path, e)}
                >
                  {item.icon}
                  <span>{item.label}</span>
                  <div className="ml-auto">
                    {isDropdownActive(item.path) ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </div>
                </div>
              ) : (
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center px-3 py-3 text-base font-medium w-full text-white hover:bg-[#008080]/30 transition-colors duration-150",
                      isActive
                        ? "bg-[#008080] text-white"
                        : "text-black hover:bg-[#008080]"
                    )
                  }
                >
                  {item.icon}
                  <span>{item.label}</span>
                </NavLink>
              )}
              {isDropdownActive(item.path) && (
                <div
                  className="absolute left-0 w-1 top-0 h-full bg-blue-500"
                  aria-hidden="true"
                ></div>
              )}
              
            </div>
          ))}
        </div>
      </div>

      {/* Mobile sidebar with only icons */}
      <div className={mobileSidebarClasses}>
        {navItems.map((item, index) => (
          <div key={index} className="mb-6">
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                cn(
                  "flex items-center font-medium w-full rounded-full hover:bg-[#008080] transition-colors duration-150",
                  isActive
                    ? "bg-[#008080] text-white"
                    : "text-black hover:bg-[#008080]/30"
                )
              }
            >
              <button
                className={cn(
                  "sidebar-icon flex items-center justify-center w-10 h-10 rounded-full shadow-sm",
                  isDropdownActive(item.path) && "text-blue-600"
                )}
                onClick={(e) =>
                  item.hasDropdown ? toggleSubmenu(e, item.path) : null
                }
              >
                {React.cloneElement(item.icon, { className: "w-5 h-5" })}
              </button>
            </NavLink>
          </div>
        ))}
      </div>
    </>
  );
};

export default Sidebar;
