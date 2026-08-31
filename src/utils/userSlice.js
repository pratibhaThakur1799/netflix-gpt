// userSlice.js 
// Purpose: Manages the user's authentication-related state in Redux. 
// Stores the logged-in user's information and provides actions to add or remove the user.
import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice(
    {
        // Name of this Redux slice.
        name: 'user',

        // Initial user state. null means no user is logged in.
        initialState: null,

        // Reducers: Functions used to update the user state.
        reducers: {

            // Stores the logged-in user's information in Redux state.
            addUser: (state, action) => {
                return action.payload;
            },

            // Removes the user information from Redux state during sign-out.
            removeUser: (state, action) => {
                return null;
            }
        },
    }
);

// Export actions so they can be dispatched from React components. 
export const { addUser, removeUser } = userSlice.actions;

// Export the reducer to connect this slice with the Redux store.
export default userSlice.reducer;