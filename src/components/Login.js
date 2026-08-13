import React from 'react'
import { useState } from 'react'
import Header from './Header'

const Login = () => {

    const [isSignInForm,setIsSignInForm] = useState(true);

    const toggleSignInForm = () =>{
        setIsSignInForm(!isSignInForm)
    }

    return (
        <div className="relative h-screen">
            <Header />
            <div>
                <img className="absolute inset-0 -z-10 h-full w-full object-cover"
                    src='https://occ-0-58-64.1.nflxso.net/dnm/api/v6/iMyKkw5SVrkCXbCfSBEb_Pjar5Y/AAAAQBTxE26zgLJoqZnmxUCfZtVJ2HbJUsVonZ_9Uo-pn68zarPK.png'
                    alt='netflix-bg-img'
                />
            </div>

            {/* Sign In Form */}
            <div className="absolute inset-0 flex items-center justify-center">

                <form className="w-96 rounded-md bg-slate-500/30 p-12">
                    <h1 className="mb-6 text-3xl font-bold text-white">
                        {isSignInForm ? "Sign In" : "Sign Up"}
                    </h1>

                    {
                        (!isSignInForm) &&  <input
                        type="name"
                        placeholder="Name"
                        className="mb-4 w-full rounded bg-gray-700 p-3 text-white placeholder-gray-300"
                    />
                    }

                    <input
                        type="email"
                        placeholder="Email"
                        className="mb-4 w-full rounded bg-gray-700 p-3 text-white placeholder-gray-300"
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        className="mb-6 w-full rounded bg-gray-700 p-3 text-white placeholder-gray-300"
                    />

                    <button
                        type="submit"
                        className="w-full rounded bg-red-600 p-3 font-semibold text-white"
                    >
                        {isSignInForm ? "Sign In" : "Sign Up"}
                    </button>

                    <p className='pt-3 text-white cursor-pointer' onClick={toggleSignInForm}>
                    {isSignInForm ? "New to Netflix? Sign Up Now" :" Already Registered? Sign In Now"}
                        </p>

                </form>

            </div>

        </div>


    )
}

export default Login