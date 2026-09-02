// movieSlice.js
// Purpose: Redux slice that manages all movie-related state — the "now
// playing" movie list and the currently selected movie's trailer video.
// Combined with userSlice.js inside appStore.js to form the full Redux store.

import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice(
    {
        // Name of this slice — used as the key under state.movies
        name: "movies",

        // Initial state before any API data has been fetched.
        // Both fields start as null so components can check for "not loaded yet".
        initialState: {
            nowPlayingMovies: null,  // will hold the array of movies from TMDB
            popularMovies: null,     // will hold the array of popular movies from TMDB
            trailerVideo: null,      // will hold the selected trailer's video object
        },

        // Reducers: functions that update state in response to dispatched actions.
        // Note: Redux Toolkit uses Immer internally, so it's safe to "mutate"
        // state directly here (e.g. state.nowPlayingMovies = ...) — under the
        // hood Immer produces a new immutable state object, unlike userSlice.js
        // which returns a whole new value instead.
        reducers: {

            // Stores the fetched "now playing" movie list into state.
            // Called from useNowPlayingMovies.js after the TMDB API call succeeds.
            addNowPlayingMovies: (state, action) => {
                state.nowPlayingMovies = action.payload;
            },

            // Stores the selected trailer video object into state.
            // Called from useMovieTrailer.js after fetching + filtering
            // the trailer for a specific movie.
            addTrailerVideo: (state, action) => {
                state.trailerVideo = action.payload;
            },


            addPopularMovies: (state, action) => {
                state.popularMovies = action.payload;
            }

        }
    }
);

// Export the auto-generated action creators so components/hooks can dispatch them.
export const { addNowPlayingMovies, addTrailerVideo, addPopularMovies } = movieSlice.actions;

// Export the reducer to be registered in appStore.js under the "movies" key.
export default movieSlice.reducer;