import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
const Welcome = () => {
  const { username, isManager, isAdmin } = useAuth();
  const date = new Date();
  const today = new Intl.DateTimeFormat("en-US", {
    dateStyle: "full",
    timeStyle: "long",
  }).format(date);

  return (
    <section className="welcome">
      <p>{today}</p>

      <h1>Welcome {username}!</h1>

      <p>
        <Link to="/dash/notes">View Complaints</Link>
      </p>
      <p>
        <Link to="/dash/notes/new">New Complaint</Link>
      </p>
      {(isManager || isAdmin) && (
        <p>
          <Link to="/dash/users/new">New User</Link>
        </p>
      )}

      {(isManager || isAdmin) && (
        <p>
          <Link to="/dash/users">View User Settings</Link>
        </p>
      )}
    </section>
  );
};

export default Welcome;
