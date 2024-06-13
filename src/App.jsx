import { Outlet } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import EditUser from "./feature/users/EditUser.jsx";
import NewUserForm from "./feature/users/NewUserForm.jsx";
import NewNote from "./feature/notes/NewNote.jsx";
import EditNote from "./feature/notes/EditNote.jsx";
import Prefetch from "./feature/auth/Prefetch.jsx";
import RequireAuth from "./feature/auth/RequireAuth.jsx";
import { ROLES } from "./config/role.jsx";

import Login from "./feature/auth/Login.jsx";
import DashLayout from "./components/DashLayout.jsx";
import Welcome from "./feature/auth/Welcome.jsx";
import NotesList from "./feature/notes/NoteList.jsx";
import UsersList from "./feature/users/UserList.jsx";
import Public from "./components/Public.jsx";
import Layout from "./components/Layout.jsx";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* public routes */}
          <Route index element={<Public />} />
          <Route path="login" element={<Login />} />

          {/* Protected Routes */}

          <Route
            element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}
          >
            <Route element={<Prefetch />}>
              <Route path="dash" element={<DashLayout />}>
                <Route index element={<Welcome />} />

                <Route
                  element={
                    <RequireAuth allowedRoles={[ROLES.Manager, ROLES.Admin]} />
                  }
                >
                  <Route path="users">
                    <Route index element={<UsersList />} />
                    <Route path=":id" element={<EditUser />} />
                    <Route path="new" element={<NewUserForm />} />
                  </Route>
                </Route>

                <Route path="notes">
                  <Route index element={<NotesList />} />
                  <Route path=":id" element={<EditNote />} />
                  <Route path="new" element={<NewNote />} />
                </Route>
              </Route>
              {/* End Dash */}
            </Route>
          </Route>
        </Route>
        {/* End Protected Routes */}
      </Routes>
    </>
  );
}

export default App;
