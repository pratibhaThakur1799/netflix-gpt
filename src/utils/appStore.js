// appStore.js 
// Purpose: Creates and configures the central Redux store for the application. 
// Combines all Redux reducers and makes the store available to React through Provider.

import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice.js";
import movieReducer from "./movieSlice.js";

// Configure the Redux store and register the user reducer.
const appStore = configureStore(
    {
        reducer: {

            // User state is managed by userReducer.
            user: userReducer,

            // Movie State is managed by movieReducer.
            movies: movieReducer,
        }
    }
)

export default appStore;