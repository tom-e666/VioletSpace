// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB7TMiN-04-Ds0qnOMgzlBWCfW9hysgpzU",
    authDomain: "rosespace-4e949.firebaseapp.com",
    projectId: "rosespace-4e949",
    storageBucket: "rosespace-4e949.firebasestorage.app",
    messagingSenderId: "1029429149851",
    appId: "1:1029429149851:web:bc7705a7b50dfb9879463e",
    measurementId: "G-N267JMVMTG"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// export const analytics = getAnalytics(app);
