<script type="module">
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-auth.js";

// Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyAm4PyWfIUI0mnXn8uNE2L0cqwdV4PK5yE",
    authDomain: "cobinar-prod.firebaseapp.com",
    projectId: "cobinar-prod",
    storageBucket: "cobinar-prod.firebasestorage.app",
    messagingSenderId: "1024793965812",
    appId: "1:1024793965812:web:2806c2a9cec7c7c1165aa1",
    measurementId: "G-9GY9ZXXW65"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

window.signInWithGoogle = function () {
  signInWithPopup(auth, provider)
    .then((result) => {
      console.log("User:", result.user);
      window.location.href = "/";
    })
    .catch((error) => {
      console.error(error);
    });
};
</script>