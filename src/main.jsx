import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./feature/auth/Login.jsx";
import DashLayout from "./components/DashLayout.jsx";
import Welcome from "./feature/auth/Welcome.jsx";
import NotesList from "./feature/notes/NoteList.jsx";
import UsersList from "./feature/users/UserList.jsx";
import Public from "./components/Public.jsx";
import { store } from "../src/app/store";
import { Provider } from "react-redux";
import EditUser from "./feature/users/EditUser.jsx";
import NewUserForm from "./feature/users/NewUserForm.jsx";
import NewNote from "./feature/notes/NewNote.jsx";
import EditNote from "./feature/notes/EditNote.jsx";
import Prefetch from "./feature/auth/Prefetch.jsx";
import RequireAuth from "./feature/auth/RequireAuth.jsx";
import { ROLES } from "./config/role.jsx";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";

if (process.env.NODE_ENV === "production") disableReactDevTools();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
