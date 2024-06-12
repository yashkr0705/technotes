import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";

import { apiSlice } from "../../app/api/apiSlice";

//It orginzed the data in Normalized Way {
//  it orgainze in id and enetities
//}
const notesAdapter = createEntityAdapter({
  sortComparer: (a, b) =>
    a.completed === b.completed ? 0 : a.completed ? 1 : -1,
});

//it have
const initialState = notesAdapter.getInitialState();

export const noteApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getNote: builder.query({
      query: () => "/notes",
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError;
      },
      transformResponse: (responseData) => {
        const loadedNotes = responseData.map((note) => {
          note.id = note._id;
          return note;
        });
        return notesAdapter.setAll(initialState, loadedNotes);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "Note", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Note", id })),
          ];
        } else return [{ type: "Note", id: "LIST" }];
      },
    }),
    addNewNote: builder.mutation({
      query: (initialNoteData) => ({
        url: "/notes",
        method: "PUT",
        body: {
          ...initialNoteData,
        },
      }),
      //ID --> LIST MEANING WHOLE ID
      invalidatesTags: [{ type: "Note", id: "LIST" }],
    }),
    updateNote: builder.mutation({
      query: (initialNoteData) => ({
        url: "/notes",
        method: "PATCH",
        body: {
          ...initialNoteData,
        },
      }),
      //arg giving the id
      invalidatesTags: (result, error, arg) => [{ type: "Note", id: arg.id }],
    }),
    deleteNote: builder.mutation({
      query: ({ id }) => ({
        url: `/notes`,
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Note", id: arg.id }],
    }),
  }),
});

export const {
  useGetNoteQuery,
  useAddNewNoteMutation,
  useUpdateNoteMutation,
  useDeleteNoteMutation,
} = noteApiSlice;

//return the query result object
export const selectNotesResult = noteApiSlice.endpoints.getNote.select();

//Memoized Selector => an optimization technique for accelerating computer programs by caching the results of heavy function calls and returning them when similar inputs are encountered repeatedly.
const selectNotesData = createSelector(
  //whenever change
  selectNotesResult,
  (noteData) => noteData.data //normailzed state object with ids and entites
);

//getSelctor create these selector and we rename then
export const {
  selectAll: selectAllNote,
  selectById: selectNoteById,
  selectIds: selectNoteIds,
  //pass in selector that return the note Sllice of state
} = notesAdapter.getSelectors(
  (state) => selectNotesData(state) ?? initialState
);
//if selectNotes DAta is null return initial state
