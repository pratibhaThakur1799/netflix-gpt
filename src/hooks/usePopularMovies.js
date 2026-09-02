
import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { useEffect } from "react";
import { addPopularMovies } from "../utils/movieSlice.js";

const usePopularMovies = () => {

    // Used to dispatch the fetched movie list into the Redux store.
    const dispatch = useDispatch();

    // Fetches the Popular Movies  list from TMDB (page 1 only).
    // API_OPTIONS holds shared fetch config (headers, auth token, etc.)
    // defined once in utils/constants.js and reused across all API calls.
    const getPopularMovies = async () => {
        const data = await
            fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1',
                API_OPTIONS
            );

        // Parse the raw response into JSON.
        const json = await data.json();

        console.log(json);

        // json.results is the array of movie objects TMDB returns.
        // Store it in Redux so components can access it globally.
        dispatch(addPopularMovies(json.results));
    };

    // Runs getPopularMovies once when this hook is first used
    // (empty dependency array = run only on mount, not on re-renders).
    useEffect(() => {
        getPopularMovies();
    }, []);

    // Note: this hook doesn't return anything — it's a "side-effect only"
    // hook. Its job is purely to fetch + dispatch, not to hand back data
    // directly. Components read the result from Redux instead.
}

export default usePopularMovies;