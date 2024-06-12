import { store } from "../../app/store";
import { noteApiSlice } from "../notes/notesApiSlice";
import { userApiSlice } from "../users/userApiSlice";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

const Prefetch = () => {
  useEffect(() => {
    console.log("Subscribing");
    const notes = store.dispatch(noteApiSlice.endpoints.getNote.initiate());
    const users = store.dispatch(userApiSlice.endpoints.getUser.initiate());

    return () => {
      console.log("Unsubscribing");
      notes.unsubscribe();
      users.unsubscribe();
    };
  }, []);
  return <Outlet></Outlet>;
};

export default Prefetch;
