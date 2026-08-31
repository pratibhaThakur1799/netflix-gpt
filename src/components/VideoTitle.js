// VideoTitle.js
// Purpose: Purely presentational component. Displays the featured movie's
// title, overview text, and the Play / More Info buttons on top of the
// background video. Receives all data as props — holds no state of its own.

// Props:
// - title: movie's original_title (string)
// - overview: movie's description (string)
const VideoTitle = ({ title, overview }) => {

    return (
        // Positioned absolutely so it overlays on top of VideoBackground's iframe.
        // z-10 ensures it sits above the video layer.
        <div className="absolute top-0 left-0 z-10 flex h-screen w-full flex-col justify-center px-12 pt-20 text-white">

            {/* Movie title */}
            <h1 className="mb-4 max-w-2xl text-4xl font-bold text-white">
                {title}
            </h1>

            {/* Movie description/synopsis */}
            <p className="mb-6 max-w-xl text-lg  text-white">
                {overview}
            </p>

            <div className="flex gap-4">
                {/* Play button — currently no onClick handler wired up */}
                <button className="rounded bg-white px-6 py-3 font-semibold text-black hover:bg-gray-300">
                    ▶ Play
                </button>

                {/* More Info button — currently no onClick handler wired up */}
                <button className="rounded bg-gray-500/70 px-6 py-3 font-semibold text-white hover:bg-gray-500">
                    More Info
                </button>
            </div>

        </div>
    )
}

export default VideoTitle