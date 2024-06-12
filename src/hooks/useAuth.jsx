import { useSelector } from "react-redux";
import { selectCurrentToken } from "../feature/auth/authSlice";
import { jwtDecode } from "jwt-decode";

const useAuth = () => {
  const token = useSelector(selectCurrentToken);
  let isManager = false;
  let isAdmin = false;
  let isEmployee = false;
  let isUser = false;
  let status = "User";

  if (token) {
    const decoded = jwtDecode(token);
    const { username, roles } = decoded.UserInfo;
    isManager = roles.includes("Manager");
    isAdmin = roles.includes("Admin");
    isEmployee = roles.includes("Employee");
    if (isManager) status = "Manager";
    else if (isAdmin) status = "Admin";
    else if (isEmployee) status = "Employee";

    return { username, roles, isManager, isAdmin, status, isUser, isEmployee };
  }

  return {
    username: " ",
    roles: [],
    isManager,
    isAdmin,
    status,
    isUser,
    isEmployee,
  };
};

export default useAuth;
