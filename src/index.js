import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

/*
import Landing from "views/examples/Landing.js";
import Register from "views/examples/Register.js";
*/
//HOC
import Guards from "router/guards";
//Page
import Login from "views/login/Login.js";
import Signup from "views/signup/Signup.js";
import Profile from "views/profile/Profile.js";
import ProfileEdit from "views/profileEdit/ProfileEdit.js";
import Index from "views/Index.js";
//context
import { AuthProvider } from "state/stateAuth";
//Style
import "assets/vendor/nucleo/css/nucleo.css";
import "assets/vendor/font-awesome/css/font-awesome.min.css";
import "assets/scss/argon-design-system-react.scss?v1.1.0";
const root = ReactDOM.createRoot(document.getElementById("root"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/",
    element: <Guards />,
    children: [
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/profile-edit/:id",
        element: <ProfileEdit />,
      },
      {
        path: "/template",
        element: <Index />,
      },
    ],
  },
]);

root.render(
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
);
/*
<BrowserRouter>
  <Routes>
    <Route path="/" exact element={<Index />} />
    <Route path="/landing-page" exact element={<Landing />} />
    <Route path="/login-page" exact element={<Login />} />
    <Route path="/profile-page" exact element={<Profile />} />
    <Route path="/register-page" exact element={<Register />} />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
</BrowserRouter>
 */
