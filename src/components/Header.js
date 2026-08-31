import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addUser, removeUser } from "../utils/userSlice";
import { NETFLIX_LOGO } from "../utils/constants";

const Header = () => {

  const dispatch = useDispatch();

  const navigate = useNavigate();

  // Get user details from Redux store
  const user = useSelector((store) => store.user);

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

        <img
          className="w-10 h-10 cursor-pointer"
          alt="usericon"
          src={user?.photoURL} />

        <button className="text-white cursor-pointer" onClick={handleSignOut}>
          Sign-Out
        </button>

      </div>}

    </div>
  );
};

export default Header