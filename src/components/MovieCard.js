// MovieCard.js
// Purpose: Renders a single movie poster image. The smallest,
// reusable building block used inside MovieList's horizontal row.

import { IMG_CDN_URL } from "../utils/constants"

// Props:
// - posterPath: partial image path returned by TMDB (e.g. "/abc123.jpg")
const MovieCard = ({ posterPath }) => {

    return (
        // shrink-0 prevents this card from shrinking when the row is
        // wider than the screen — keeps every poster a fixed width (w-48)
        // so the horizontal scroll behaves predictably.
        <div className="w-48 shrink-0">
            <img
                className="rounded-md"
                alt="movie_poster"
                // TMDB only returns a partial path (posterPath); IMG_CDN_URL
                // (defined in constants.js) is the base URL prefix needed
                // to form a complete, loadable image URL.
                src={IMG_CDN_URL + posterPath}
            />
        </div>
    )
}

export default MovieCard