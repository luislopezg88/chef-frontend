import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
//HOC
import Guards from "router/guards";
//Page
import Login from "views/login/Login.js";
import Signup from "views/signup/Signup.js";
import Profile from "views/profile/Profile.js";
import ProfileEdit from "views/profileEdit/ProfileEdit.js";
import Platos from "views/platos/Platos.js";
import Shopping from "views/shopping/Shopping.js";
import Dashboard from "views/dashboard/Dashboard.js";
import Index from "views/Index.js";
//context
import { AuthProvider } from "state/stateAuth";
import { ShoppingProvider } from "state/stateShopping";
//Style
import "assets/vendor/nucleo/css/nucleo.css";
import "assets/vendor/font-awesome/css/font-awesome.min.css";
import "assets/scss/argon-design-system-react.scss?v1.1.0";

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
    path: "/shopping",
    element: <Shopping />,
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
        path: "/plato-agregar/:idChef",
        element: <Platos />,
      },
      {
        path: "/template",
        element: <Index />,
      },
      { path: "/dashboard/:idChef", element: <Dashboard /> },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthProvider>
    <ShoppingProvider>
      <RouterProvider router={router} />
    </ShoppingProvider>
  </AuthProvider>
);
/*
//http://localhost:3000/argon-design-system-react
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

import Landing from "views/examples/Landing.js";
import Register from "views/examples/Register.js";
*/
