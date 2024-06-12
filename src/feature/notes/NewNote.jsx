import { useSelector } from "react-redux";

import NewNoteForm from "./NewNoteForm";
import { selectAllUser } from "../users/userApiSlice";

const NewNote = () => {
  const users = useSelector(selectAllUser);

  if (!users?.length) return <p>Not Currently Available</p>;

  const content = <NewNoteForm users={users} />;

  return content;
};
export default NewNote;
