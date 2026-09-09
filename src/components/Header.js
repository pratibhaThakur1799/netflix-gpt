import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { addUser, removeUser } from "../utils/userSlice";
import { NETFLIX_LOGO, SUPPORTED_LANGUAGES } from "../utils/constants";
import { FaSearch } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { toggleGptSearchView } from "../utils/gptSearchSlice";
import ReactCountryFlag from "react-country-flag";
import { changeLang } from "../utils/configSlice";

const Header = () => {

  const dispatch = useDispatch();

  const navigate = useNavigate();

  // Get user details from Redux store
  const user = useSelector((store) => store.user);

  const gptSearchView = useSelector((store) => store.gptSearch);

  console.log(gptSearchView.showGptSearch
  );

  // Handles user sign out
  const handleSignOut = () => {

    signOut(auth).then(() => {
      // Sign-out successful.
      navigate("/");
    }).catch((error) => {
      // Navigate to error page if sign-out fails
    });
  }


  // Listens for changes in the user's authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {

      // Add user details to Redux when the user is signed in
      if (user) {

        const { uid, email, phoneNumber, displayName, photoURL } = user;
        dispatch(addUser({ uid: uid, email: email, mob: phoneNumber, fullName: displayName, photoURL: photoURL }));
        navigate("/browse");
      }

      // Remove user details from Redux when the user signs out
      else {
        dispatch(removeUser());
        navigate("/");

      }
    });

    // Unsubscribe when component unmounts.
    return () => unsubscribe();
  }, []);


  const handleGptSearchToggle = () => {
    dispatch(toggleGptSearchView());
  }


  const selectedLanguage = useSelector(
    (store) => store.config.lang
  );


  const handleLanguageChange = (e) => dispatch(changeLang(e.target.value))

  return (
    <div className="absolute z-20 w-full bg-gradient-to-b from-slate-900 flex justify-between items-center px-8 py-2">

      {/* Netflix Logo */}
      <img
        className="w-40"
        src={NETFLIX_LOGO}
        alt="netflix-logo"
      />

      {/* User Section */}

      {user && <div className="flex items-center gap-4">


        {gptSearchView.showGptSearch &&
          <  select
            className="m-2 cursor-pointer rounded-md bg-gray-900 px-3 py-2 text-white outline-none hover:bg-gray-700"
            onChange={handleLanguageChange}
            value={selectedLanguage}
          >
            {SUPPORTED_LANGUAGES.map((lang) => (
              <option
                key={lang.identifier}
                value={lang.identifier}
              >
                {lang.flag} {lang.name}
              </option>
            ))}
          </select>
        }

        <div
          className="flex items-center gap-2 rounded-full px-3 py-2 transition-all duration-300 hover:bg-slate-400/50 cursor-pointer"
          onClick={handleGptSearchToggle}
        >
          <IoSearch className="text-white text-xl" />
          <span className="text-white">GPT Search</span>

        </div>




        <img
          className="w-10 h-10 cursor-pointer"
          alt="usericon"
          src={user?.photoURL} />

        <button className="text-white cursor-pointer hover:bg-slate-400/50 w-20 p-2 rounded-full" onClick={handleSignOut}>
          Sign-Out
        </button>

      </div>}

    </div>
  );
};

export default Header