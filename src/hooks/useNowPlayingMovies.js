// useNowPlayingMovies.js
// Purpose: Custom hook that fetches the list of currently "now playing"
// movies from the TMDB API and stores them in Redux, so any component
// (like MainContainer) can read the list via useSelector.

import { useDispatch } from "react-redux";
import { addNowPlayingMovies } from "../utils/movieSlice";
import { API_OPTIONS } from "../utils/constants";
import { useEffect } from "react";

const useNowPlayingMovies = () => {

    // Used to dispatch the fetched movie list into the Redux store.
    const dispatch = useDispatch();

    // Fetches the now-playing movies list from TMDB (page 1 only).
    // API_OPTIONS holds shared fetch config (headers, auth token, etc.)
    // defined once in utils/constants.js and reused across all API calls.
    const getNowPlayingMovies = async () => {
        const data = await fetch(
            'https://api.themoviedb.org/3/movie/now_playing?&page=1',
            API_OPTIONS
        );

        // Parse the raw response into JSON.
        const json = await data.json();

        // json.results is the array of movie objects TMDB returns.
        // Store it in Redux so components can access it globally.
        dispatch(addNowPlayingMovies(json.results));
    };

    // Runs getNowPlayingMovies once when this hook is first used
    // (empty dependency array = run only on mount, not on re-renders).
    useEffect(() => {
        getNowPlayingMovies();
    }, []);

    // Note: this hook doesn't return anything — it's a "side-effect only"
    // hook. Its job is purely to fetch + dispatch, not to hand back data
    // directly. Components read the result from Redux instead.
}

export default useNowPlayingMovies;