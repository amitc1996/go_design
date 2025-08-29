import React from "react";
import AppSidebar from "../components/AppSidebar";
import AppHeader from "../components/AppHeader";
import AppFooter from "../components/AppFooter";

const MainLayout = ({ children }) => {
  return (
    <div>
      <AppHeader />
      <div className="d-flex">
        <AppSidebar />
        <div className="content flex-grow-1">{children}</div>
      </div>
      <AppFooter />
    </div>
  );
};

export default MainLayout;
