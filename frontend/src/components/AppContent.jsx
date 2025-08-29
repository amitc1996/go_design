import React from "react";
import { Outlet } from "react-router-dom";

const AppContent = () => (
  <main className="content">
    <Outlet />
  </main>
);

export default AppContent;