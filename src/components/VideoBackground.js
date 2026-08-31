// VideoBackground.js
// Purpose: Renders the full-screen autoplay trailer video (via YouTube iframe)
// that plays behind the title overlay. Triggers a custom hook to fetch the
// trailer for the given movie and stores it in Redux.

import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants.js"
import { useDispatch, useSelector } from "react-redux";
import useMovieTrailer from "../hooks/useMovieTrailer.js";

// Props:
// - movieID: id of the movie to fetch the trailer for
const VideoBackground = ({ movieID }) => {

    // Read the trailer video data (once fetched) from the movies slice of Redux.
    const trailerVideo = useSelector((store) => store.movies?.trailerVideo);

    // Custom hook: fetches the trailer for movieID and dispatches it into
    // Redux (addTrailerVideo) internally. See useMovieTrailer.js for the logic.
    useMovieTrailer(movieID);

    return (
        <div className="relative h-screen w-full overflow-hidden">

            {/* NOTE: this src is hardcoded to a fixed YouTube video —
                it doesn't yet use `trailerVideo` from Redux or `movieID`.
                To make this dynamic per movie, build the src from
                trailerVideo.key once useMovieTrailer populates it, e.g.:
                `https://www.youtube.com/embed/${trailerVideo?.key}?autoplay=1&mute=1...` */}
            <iframe
                className="absolute top-0 left-0 h-full w-full scale-125"
                src={`https://www.youtube.com/embed/${trailerVideo?.key}?autoplay=1&mute=1&controls=0&loop=1`}
                title="Movie Trailer"
                frameBorder="0"
                allow="autoplay; encrypted-media"
                allowFullScreen
            />

            {/* Dark gradient over the video, left-to-right, so the title text stays readable */}
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent"></div>

            {/* Fades the bottom of the video to black, blending into the rest of the page */}
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black to-transparent"></div>
        </div>
    )
}

export default VideoBackground