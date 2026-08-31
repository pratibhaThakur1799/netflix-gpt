// useMovieTrailer.js
// Purpose: Custom hook that fetches trailer/video data for a single movie
// (given its ID) from TMDB, picks the best trailer available, and stores
// it in Redux for VideoBackground to render.

import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addTrailerVideo } from "../utils/movieSlice";
import { useEffect } from "react";

// Param:
// - movieID: id of the movie to fetch trailer/video data for
const useMovieTrailer = (movieID) => {

    // Used to dispatch the selected trailer into the Redux store.
    const dispatch = useDispatch();

    // Fetches all videos (trailers, teasers, clips, etc.) associated
    // with this specific movie from TMDB.
    const getMovieData = async () => {
        const movieData = await fetch(
            `https://api.themoviedb.org/3/movie/${movieID}/videos?language=en-US`,
            API_OPTIONS
        );

        const data = await movieData.json();

        // Debug log — remove before shipping to production.
        console.log(data);

        // TMDB returns a mix of video types (Trailer, Teaser, Clip, etc.)
        // in data.results. Filter down to only the ones explicitly
        // tagged "Trailer".
        const filterTrailerData = data.results.filter((video) => video.type === "Trailer");

        // Prefer the first official trailer if one exists.
        // Fallback: if no video is tagged "Trailer" at all, just use
        // whatever the first video in the full list is (better than
        // showing nothing).
        const trailer = filterTrailerData.length ? filterTrailerData[0] : data.results[0];

        // Store the chosen trailer object in Redux. This object includes
        // a `key` field — the YouTube video ID — which VideoBackground
        // uses to build its iframe src.
        dispatch(addTrailerVideo(trailer));

        // Debug log — remove before shipping to production.
        console.log(trailer);
    }

    // Re-runs getMovieData whenever this hook is called for a component
    // that has mounted. Note the empty dependency array below — this
    // means it only runs ONCE per component mount, even if movieID
    // changes later. If movieID could change while the component stays
    // mounted, you'd want [movieID] as the dependency array instead, so
    // the trailer refetches for the new movie.
    useEffect(() => {
        getMovieData();
    }, []);
}

export default useMovieTrailer;