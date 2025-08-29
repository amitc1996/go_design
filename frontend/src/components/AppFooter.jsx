import React from "react";

const AppFooter = () => (
  <footer style={{ padding: "16px 24px", textAlign: "center", background: "#fff", borderTop: "1px solid #eee" }}>
    <small style={{ color: "#666" }}>© {new Date().getFullYear()} GoDesign. All rights reserved.</small>
  </footer>
);

export default AppFooter;