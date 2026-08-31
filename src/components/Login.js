import React from 'react'
import { useState, useRef } from 'react'
import Header from './Header'
import { checkValidData } from '../utils/validate'
import { auth } from '../utils/firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useDispatch } from 'react-redux'
import { addUser } from '../utils/userSlice'
import { NETFLIX_BG, USER_AVATAR } from '../utils/constants'


const Login = () => {

    const [isSignInForm, setIsSignInForm] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);
    const dispatch = useDispatch();

    const email = useRef(null);
    const password = useRef(null);
    const name = useRef(null);


    // Handles Sign In and Sign Up form submission
    const handleButtonClick = () => {

        const validateMessage = checkValidData(
            email.current.value,
            password.current.value,
            isSignInForm ? "" : name.current.value
        );
        setErrorMessage(validateMessage);

        if (validateMessage) return;

        // Create a new user when Sign Up form is submitted
        if (!isSignInForm) {
            createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then((userCredential) => {
                    const user = userCredential.user;

                    // Update the newly created user's profile
                    updateProfile(user, {
                        displayName: name.current.value,
                        photoURL: USER_AVATAR
                    }).then(() => {

                        // Add user details to Redux store
                        const { uid, email, phoneNumber, displayName, photoURL } = auth.currentUser;
                        dispatch(addUser({
                            uid: uid,
                            email: email,
                            mob: phoneNumber,
                            fullName: displayName,
                            photoURL: photoURL
                        }));

                    }).catch((error) => {
                        setErrorMessage(error.message);
                    });
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log(errorMessage);
                    setErrorMessage(errorCode + " - " + errorMessage)
                });

        }
        // Sign in an existing user
        else {
            signInWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then((userCredential) => {
                    const user = userCredential.user;
                    console.log(user);

                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log(errorMessage);
                    setErrorMessage(errorCode + " - " + errorMessage)
                });
        }
    }

    // Toggles between Sign In and Sign Up forms
    const toggleSignInForm = () => {
        setIsSignInForm(!isSignInForm)
    }

    return (
        <div className="relative h-screen">
            <Header />

            <div>
                <img className="absolute inset-0 -z-10 h-full w-full object-cover"
                    src={NETFLIX_BG}
                    alt='netflix-bg-img'
                />
            </div>

            {/* Sign In / Sign Up Form */}
            <div className="absolute inset-0 flex items-center justify-center">

                <form className="w-96 rounded-md bg-slate-500/30 p-12"
                    onSubmit={(e) => e.preventDefault()}>

                    <h1 className="mb-6 text-3xl font-bold text-white">
                        {isSignInForm ? "Sign In" : "Sign Up"}
                    </h1>

                    {
                        (!isSignInForm) && <input
                            ref={name}
                            type="name"
                            placeholder="Full Name"
                            className="mb-4 w-full rounded bg-gray-700 p-3 text-white placeholder-gray-300"
                        />
                    }

                    <input
                        ref={email}
                        type="email"
                        placeholder="Email Address"
                        className="mb-4 w-full rounded bg-gray-700 p-3 text-white placeholder-gray-300"
                    />

                    <input
                        ref={password}
                        type="password"
                        placeholder="Password"
                        className="mb-6 w-full rounded bg-gray-700 p-3 text-white placeholder-gray-300"
                    />

                    <p className="mt-2 mb-4 text-sm font-semibold text-red-600">
                        {errorMessage}
                    </p>

                    <button
                        onClick={handleButtonClick}
                        type="submit"
                        className="w-full rounded bg-red-600 p-3 font-semibold text-white"
                    >
                        {isSignInForm ? "Sign In" : "Sign Up"}
                    </button>

                    <p className='pt-3 text-white cursor-pointer' onClick={toggleSignInForm}>
                        {isSignInForm ? "New to Netflix? Sign Up Now" : " Already Registered? Sign In Now"}
                    </p>

                </form>

            </div>

        </div>
    )
}

export default Login