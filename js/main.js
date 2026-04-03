// main.js
import { auth } from "./firebase-init.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-auth.js";

onAuthStateChanged(auth, (user) => {
  const loginBtn = document.getElementById("login-btn");
  const logoutBtn = document.getElementById("logout-btn");
  const userInfo = document.getElementById("user-info");

  if (user) {
    console.log("Logged in:", user.email);

    if (userInfo) {
      userInfo.innerText = "Welcome " + user.displayName;
    }

    if (loginBtn) loginBtn.style.display = "none";
    if (logoutBtn) logoutBtn.style.display = "block";
  } else {
    console.log("Not logged in");

    if (loginBtn) loginBtn.style.display = "block";
    if (logoutBtn) logoutBtn.style.display = "none";
  }
});

// logout function
window.logout = function () {
  signOut(auth).then(() => {
    window.location.href = "/";
  });
};