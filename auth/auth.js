const auth = firebase.auth();

function signInWithGoogle() {
  const provider = new firebase.auth.GoogleAuthProvider();

  auth.signInWithPopup(provider)
    .then((result) => {
      console.log("User:", result.user);
      window.location.href = "/";
    })
    .catch((error) => {
      console.error(error);
    });
}