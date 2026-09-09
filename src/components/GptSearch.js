import GptMovieSuggestion from "./GptMovieSuggestion";
import GptSearchBar from "./GptSearchBar";
import gptBackground from "../assets/netflix_bg.jpg";

const GptSearch = () => {
    return (
        <div
            className="min-h-screen bg-cover bg-center bg-fixed"
            style={{ backgroundImage: `url(${gptBackground})` }}
        >
            <div className="min-h-screen bg-black/60 pt-[15%]">
                <GptSearchBar />
                <GptMovieSuggestion />
            </div>
        </div>
    );
};

export default GptSearch;