"use client";

import type { FC } from "react";
import { useEffect, useState } from "react";

import LayoutContent from "./Content";
import Footer from "./Footer";
import Header from "./Header";
import Sidebar from "./Sidebar";

const PrivateLayout: FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
      if (width >= 1024) setIsMobileSidebarOpen(false); // auto-close overlay
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const closeMobileSidebar = () => {
    setIsMobileSidebarOpen(false);
  };

  // Determine sidebar width based on device and state

  const getSidebarClasses = () => {
    if (isMobile) return "hidden";

    const baseClasses =
      "overflow-visible text-white shadow-lg transition-all duration-300 ease-in-out bg-background-neutral-0";
    if (isTablet) {
      return `${baseClasses} ${sidebarCollapsed ? "w-20" : "w-64"}`;
    }
    return `${baseClasses} ${sidebarCollapsed ? "w-20" : "w-1/6"}`;
  };

  const handleHamburgerClick = () => {
    if (isMobile)
      setIsMobileSidebarOpen(true); // mở overlay trên mobile
    else setSidebarCollapsed(v => !v); // toggle trên desktop/tablet
  };

  return (
    <div className="flex min-h-screen overflow-x-hidden ">
      {/* Desktop/Tablet Sidebar */}
      <div className={getSidebarClasses()}>
        <Sidebar collapsed={sidebarCollapsed} />
      </div>

      {/* Mobile Sidebar Overlay */}
      {isMobile && (
        <div
          className={`fixed inset-0 z-50 transition-all duration-300 ease-in-out lg:hidden
      ${isMobileSidebarOpen ? "opacity-100" : "pointer-events-none opacity-0"}
    `}
          aria-hidden={!isMobileSidebarOpen}
        >
          {/* Backdrop */}
          <div
            className={`absolute inset-0 bg-black/50 transition-all duration-300 ease-in-out
        ${isMobileSidebarOpen ? "opacity-100" : "opacity-0"}
      `}
            onClick={closeMobileSidebar}
          />

          {/* Sidebar Content (slide-in) */}
          <div
            className={`absolute left-0 top-0 h-full w-80 bg-gray-900 text-white shadow-2xl
        transition-all duration-300 ease-in-out
        ${isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}
          >
            <Sidebar collapsed={sidebarCollapsed} />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-x-hidden">
        {/* Header */}
        <Header onHamburgerClick={handleHamburgerClick} />

        {/* Content Area */}
        <LayoutContent>
          <main>
            <div className="mb-6 rounded-lg bg-white shadow-sm">{children}</div>
          </main>
        </LayoutContent>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default PrivateLayout;
