// MainContainer.js
// Purpose: Picks one movie from the "now playing" list (fetched into Redux)
// and passes its details down to the title overlay and video background.

import VideoTitle from './VideoTitle'
import VideoBackground from './VideoBackground'
import { useSelector } from 'react-redux'

const MainContainer = () => {

    // Read the "now playing" movies array from the movies slice of Redux.
    // Optional chaining (?.) prevents a crash if store.movies is still undefined
    // (e.g. before the API call that populates it has finished).
    const movieList = useSelector((store) => store.movies?.nowPlayingMovies);

    // Guard clause: if the list hasn't loaded yet, render nothing instead of
    // crashing on the destructuring below.
    if (!movieList) return;

    // Picks the movie from the list to feature as the "hero" or "main" movie.
    const mainMovie = movieList[0];

    // Destructure only the fields this component actually needs to pass down.
    const { original_title, overview, id } = mainMovie;

    // Debug log — remove before shipping to production.
    // console.log(mainMovie);

    return (
        <div>
            {/* Renders the movie title, description, and Play/More Info buttons */}
            <VideoTitle title={original_title} overview={overview} />

            {/* Renders the background trailer video for this movie */}
            <VideoBackground movieID={id} />
        </div>
    )
}

export default MainContainer