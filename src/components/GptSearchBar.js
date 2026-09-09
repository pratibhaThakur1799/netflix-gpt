import { useSelector } from "react-redux";
import lang from "../utils/languageConstants";

const GptSearchBar = () => {

    const selectedLanguage = useSelector((store) => store.config.lang);

    return (
        <div className="flex justify-center">
            <form className="flex w-1/2 items-center gap-2 rounded-lg bg-black/80 p-2">

                <input
                    type="text"
                    className="flex-1 rounded-md bg-white p-4 text-black outline-none"
                    placeholder={lang[selectedLanguage].gptSearch}
                />

                <button
                    className="rounded-md bg-red-700 px-8 py-4 font-semibold text-white hover:bg-red-800 transition-colors"
                >
                    {lang[selectedLanguage].search}
                </button>

            </form>
        </div>
    );
};

export default GptSearchBar;