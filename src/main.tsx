import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ThemeProvider } from "./components/theme-provider.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./components/Login.tsx";
import Dashboard from "./Dashboard.tsx";
import Test from "./test.tsx";
import Navbar from "./Navbar.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },{
    path:"/dashboard",
    element:<Dashboard/>
  },{
    path:"/test",
    element:<Test/>
  }
]);
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <Navbar />
       <RouterProvider router={router} />
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>
);
