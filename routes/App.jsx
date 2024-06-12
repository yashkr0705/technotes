import { Outlet } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import EditUser from "../src/feature/users/EditUser.jsx";
import NewUserForm from "../src/feature/users/NewUserForm.jsx";
import NewNote from "../src/feature/notes/NewNote.jsx";
import EditNote from "../src/feature/notes/EditNote.jsx";
import Prefetch from "../src/feature/auth/Prefetch.jsx";
import RequireAuth from "../src/feature/auth/RequireAuth.jsx";
import { ROLES } from "../src/config/role.jsx";

import Login from "../src/feature/auth/Login.jsx";
import DashLayout from "../components/DashLayout.jsx";
import Welcome from "../src/feature/auth/Welcome.jsx";
import NotesList from "../src/feature/notes/NoteList.jsx";
import UsersList from "../src/feature/users/UserList.jsx";
import Public from "../components/Public.jsx";
import Layout from "../components/Layout.jsx";
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
