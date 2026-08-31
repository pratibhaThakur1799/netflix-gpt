// firebase.js
// Purpose: Configures and initializes Firebase for the Netflix GPT application.
// Provides Firebase Authentication to the application.

// Import Firebase app initialization function.
import { initializeApp } from "firebase/app";

// Import Firebase Analytics.
import { getAnalytics } from "firebase/analytics";

// Import Firebase Authentication.
import { getAuth } from "firebase/auth";

// Firebase project configuration.
const firebaseConfig = {
  apiKey: "AIzaSyA-arR7qr1mNRfjvZjgvgcvOcpxiYjnjjE",
  authDomain: "netflixgpt-822fe.firebaseapp.com",
  projectId: "netflixgpt-822fe",
  storageBucket: "netflixgpt-822fe.firebasestorage.app",
  messagingSenderId: "625567198326",
  appId: "1:625567198326:web:bd1d3254ee07701efc4357",
  measurementId: "G-XD13HBLWXB"
};

// Initialize Firebase using the project configuration.
const app = initializeApp(firebaseConfig);

// Initialize Firebase Analytics.
const analytics = getAnalytics(app);

// Initialize Firebase Authentication.
// Export auth so it can be used in Login, Header, Body, etc.
export const auth = getAuth();