import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../../firebase/firebase";

export function signInWithGoogle() {
  let currentUser = null;
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      console.log("Token : ", token);
      // The signed-in user info.
      currentUser = result.user;
    })
    .catch((error) => console.log(error));

  return currentUser;
}
