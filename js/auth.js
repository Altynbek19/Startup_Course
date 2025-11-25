// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
// import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBSOK9vO5fiVMvyv13Rzpz6fygd6yxSzPs",
    authDomain: "startupcourse-25eee.firebaseapp.com",
    projectId: "startupcourse-25eee",
    storageBucket: "startupcourse-25eee.firebasestorage.app",
    messagingSenderId: "28333205124",
    appId: "1:28333205124:web:a3d9fd6ac7189522cc44d1",
    measurementId: "G-TT3R3VQB1M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
auth.laguageCode = 'en'
const provider = new GoogleAuthProvider();
const googleLogin = document.getElementById("btn-google")
googleLogin.addEventListener("click", function(){
    signInWithPopup(auth, provider)
    .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        // The signed-in user info.
        const user = result.user;

        // Сохраняем данные пользователя
        localStorage.setItem("user", JSON.stringify({
            name: user.displayName,
            email: user.email,
            photo: user.photoURL
        }));

        // Переход на другую страницу

        // IdP data available using getAdditionalUserInfo(result)
        console.log(user)
        window.location.href = "../courses.html"
    }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
    });
})

// function updateUserProfile(user){
//     const userName = user.displayName
//     const userEmail = user.email
//     document.getElementById("userName").textContent = userName
//     document.getElementById("userEmail").textContent = userEmail
// }


const overlay = document.getElementById("auth-overlay");
const openBtn = document.getElementById("open-auth");
const openBtn2 = document.getElementById("open-auth2");
const closeBtn = document.getElementById("auth-close");

openBtn.addEventListener("click", () => {
    overlay.style.display = "flex";
});
openBtn2.addEventListener("click", () => {
    overlay.style.display = "flex";
});

closeBtn.addEventListener("click", () => {
    overlay.style.display = "none";
});

overlay.addEventListener("click", (e) => {
    if (e.target === overlay) {
        overlay.style.display = "none";
    }
});


