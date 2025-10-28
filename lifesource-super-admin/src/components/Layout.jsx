import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import { useSidebar } from "../context/SidebarContext";

const Layout = () => {
  const { isOpen } = useSidebar();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex pt-16">
        {" "}
        {/* Add padding-top equal to header height */}
        <Sidebar />
        <main
          className={`transition-all duration-300 flex-1 overflow-auto min-h-[calc(100vh-4rem)] w-full ${
            isOpen ? "md:ml-[260px] ml-[60px]" : "ml-0"
          }`}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
