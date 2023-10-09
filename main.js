// Initialize Firebase with your config (replace with your actual config)
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

firebase.initializeApp(firebaseConfig);

// DOM elements
const signupForm = document.querySelector("#signup-form");
const googleSignupButton = document.querySelector("#google-signup");
const signupStatus = document.querySelector("#signup-status");

// Sign-up with email/password
signupForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(() => {
            signupStatus.textContent = "Verification email has been sent. Please check your inbox.";
        })
        .catch((error) => {
            signupStatus.textContent = error.message;
        });
});

// Sign-up with Google
googleSignupButton.addEventListener("click", () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
        .then(() => {
            // User signed in with Google
            signupStatus.textContent = "Signed in with Google.";
        })
        .catch((error) => {
            signupStatus.textContent = error.message;
        });
});

// Firebase authentication state change listener (for page navigation)
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        // User is signed in
        // Redirect to the dashboard or another page
        window.location.href = "dashboard.html";
    } else {
        // User is signed out
        // Redirect to the sign-in page
        window.location.href = "signin.html";
    }
});
