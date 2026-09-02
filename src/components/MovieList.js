// MovieList.js
// Purpose: Renders one horizontal scrollable row of movie posters, with
// a title and left/right scroll arrow buttons. Reused for every category
// (Now Playing, Popular, etc.) by SecondaryContainer.
// Updated: arrows now hide automatically at the start/end of the row
// instead of always being visible on hover.

import { useRef, useState } from 'react';
import MovieCard from './MovieCard'

// Props:
// - title: row heading text (e.g. "Now Playing")
// - movies: array of movie objects to render as cards
const MovieList = ({ title, movies }) => {

    // Reference to the scrollable row's DOM element, so the arrow
    // buttons and scroll handler can read/control its scroll position.
    const listRef = useRef(null);

    // Tracks whether the row is scrolled all the way to the left —
    // used to hide the left arrow when there's nowhere left to scroll.
    const [isAtStart, setIsAtStart] = useState(true);

    // Tracks whether the row is scrolled all the way to the right —
    // used to hide the right arrow when there's nowhere right to scroll.
    const [isAtEnd, setIsAtEnd] = useState(false);

    // Runs on every scroll event inside the row. Recalculates whether
    // we're at the start or end, so the arrow buttons can show/hide.
    const handleScroll = () => {
        const list = listRef.current;

        // At the very start if scrolled all the way left (scrollLeft = 0).
        setIsAtStart(list.scrollLeft === 0);

        // At the very end if (visible width + scrolled distance) has
        // reached the full scrollable width. The "-1" is a small buffer
        // to absorb sub-pixel rounding differences across browsers.
        setIsAtEnd(list.scrollLeft + list.clientWidth >= list.scrollWidth - 1);
    };

    // Scrolls the row right by 500px when the right arrow is clicked.
    const handleScrollRight = () => { listRef.current.scrollLeft += 500; };

    // Scrolls the row left by 500px when the left arrow is clicked.
    const handleScrollLeft = () => { listRef.current.scrollLeft -= 500; };

    return (
        // "group" class lets the arrow buttons react to hovering
        // anywhere inside this container (see group-hover below).
        <div className="group relative px-6 py-3">
            <h1 className="mb-4 text-2xl font-semibold text-white">
                {title}
            </h1>

            {/* Movie cards row */}
            <div
                ref={listRef}
                // Fires handleScroll on every scroll (drag, arrow click,
                // trackpad, etc.) to keep isAtStart/isAtEnd up to date.
                onScroll={handleScroll}
                className="flex gap-4 overflow-x-auto"
                style={
                    {
                        // Hides the scrollbar visually (Firefox + IE/Edge)
                        // while horizontal scroll still works via drag/arrows.
                        scrollbarWidth: "none",
                        msOverflowStyle: "none",
                    }
                } >
                {/* Renders one MovieCard per movie. Optional chaining (?.)
                    guards against `movies` being undefined on first render. */}
                {movies?.map((movie) => (<MovieCard key={movie.id} posterPath={movie.poster_path} />))}
            </div>

            {/* Left scroll arrow — only rendered when NOT already at the
                start of the row. When rendered: invisible by default
                (opacity-0), fades in on hover over the row
                (group-hover:opacity-70), fully visible when the arrow
                itself is hovered (hover:opacity-100). */}
            {!isAtStart && (
                <button onClick={handleScrollLeft}
                    className="absolute left-2 top-1/2 z-30 rounded-full bg-black/30 px-4 py-6 text-3xl text-white opacity-0 transition-opacity duration-300 group-hover:opacity-70 hover:opacity-100" >
                    ←
                </button>
            )}

            {/* Right scroll arrow — only rendered when NOT already at the
                end of the row. Same hover behavior as the left arrow. */}
            {!isAtEnd && (
                <button onClick={handleScrollRight}
                    className="absolute right-2 top-1/2 z-30 rounded-full bg-black/30 px-4 py-6 text-3xl text-white opacity-0 transition-opacity duration-300 group-hover:opacity-70 hover:opacity-100" >
                    →
                </button>
            )}
        </div>)
}

export default MovieList