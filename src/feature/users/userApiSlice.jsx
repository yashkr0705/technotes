import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";

import { apiSlice } from "../../app/api/apiSlice";

//It orginzed the data in Normalized Way {
//  it orgainze in id and enetities
//}
const usersAdapter = createEntityAdapter();

//it have
const initialState = usersAdapter.getInitialState();

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query({
      query: () => "/users",
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError;
      },
      transformResponse: (responseData) => {
        const loadedUsers = responseData.map((user) => {
          user.id = user._id;
          return user;
        });
        return usersAdapter.setAll(initialState, loadedUsers);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "User", id: "LIST" },
            ...result.ids.map((id) => ({ type: "User", id })),
          ];
        } else return [{ type: "User", id: "LIST" }];
      },
    }),
    addNewUser: builder.mutation({
      query: (initialUserData) => ({
        url: "/users",
        method: "PUT",
        body: {
          ...initialUserData,
        },
      }),
      //ID --> LIST MEANING WHOLE ID
      invalidatesTags: [{ type: "User", id: "LIST" }],
    }),
    updateUser: builder.mutation({
      query: (initialUserData) => ({
        url: "/users",
        method: "PATCH",
        body: {
          ...initialUserData,
        },
      }),
      //arg giving the id
      invalidatesTags: (result, error, arg) => [{ type: "User", id: arg.id }],
    }),
    deleteUser: builder.mutation({
      query: ({ id }) => ({
        url: `/users`,
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "User", id: arg.id }],
    }),
  }),
});

export const {
  useGetUserQuery,
  useAddNewUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userApiSlice;

//return the query result object
export const selectUsersResult = userApiSlice.endpoints.getUser.select();

//Memoized Selector => an optimization technique for accelerating computer programs by caching the results of heavy function calls and returning them when similar inputs are encountered repeatedly.
const selectUsersData = createSelector(
  //whenever change
  selectUsersResult,
  (userData) => userData.data //normailzed state object with ids and entites
);

//getSelctor create these selector and we rename then
export const {
  selectAll: selectAllUser,
  selectById: selectUserById,
  selectIds: selectUserIds,
  //pass in selector that return the user Sllice of state
} = usersAdapter.getSelectors(
  (state) => selectUsersData(state) ?? initialState
);
//if selectUsers DAta is null return initial state
