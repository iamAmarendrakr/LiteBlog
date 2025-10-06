import React from "react";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <main className="h-screen flex flex-row bg-transparent">
      {/* // This Toaster component is used to display toast notifications
      // It will show messages like "Signup successful" or "Login failed" */}
      <Toaster />
      {/* 
      // The Outlet component is used to render the child routes defined in Routing.jsx
      // It allows the LoginPage and SignupPage to be displayed within the App component */}
      <Outlet />
    </main>
  );
};

export default App;
