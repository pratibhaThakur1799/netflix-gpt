// SecondaryContainer.js
// Purpose: Renders the horizontal movie rows (Now Playing, Popular, etc.)
// that appear below the main hero banner — like Netflix's homepage rows.
// Reads all movie lists from Redux and passes each one down to MovieList.

import MovieList from './MovieList'
import { useSelector } from 'react-redux'

const SecondaryContainer = () => {

  // Grab the entire "movies" slice of Redux state at once (instead of
  // selecting each field separately), since this component needs
  // multiple movie lists from it.
  const movies = useSelector((store) => store.movies);

  // Guard: only render the rows once nowPlayingMovies has data.
  // Using it here as a proxy for "has the initial fetch completed",
  // since it's the first list that gets populated on app load.
  return (movies.nowPlayingMovies &&
    <div className='bg-black'>

      {/* Negative margin pulls this section up so it overlaps the
          hero banner above it, matching Netflix's layered look.
          z-20 keeps it above the background video/gradient. */}
      <div className='-mt-24 relative z-20 pl-5'>

        <MovieList
          title="Now Playing"
          movies={movies.nowPlayingMovies}
        />

        {/* NOTE: this reads movies.popularMovies, but movieSlice.js
            (as shown earlier) doesn't define a popularMovies field yet —
            this will currently render as undefined/empty until that
            slice + its fetch hook are added. */}
        <MovieList
          title="Popular"
          movies={movies.popularMovies}
        />

        {/* NOTE: "Latest", "Up Coming", and "Anime" are all currently
            reusing movies.nowPlayingMovies as a placeholder — they'll
            show duplicate data until dedicated fetch hooks + Redux
            fields are wired up for each category (similar to how
            useNowPlayingMovies works). */}
        <MovieList
          title="Latest"
          movies={movies.nowPlayingMovies}
        />
        <MovieList
          title="Up Coming"
          movies={movies.nowPlayingMovies}
        />
        <MovieList
          title="Anime"
          movies={movies.nowPlayingMovies}
        />
      </div>
    </div>
  )
}

export default SecondaryContainer