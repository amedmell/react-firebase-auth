import {
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  GithubAuthProvider,
  TwitterAuthProvider,
} from "firebase/auth";
import { auth } from "../../firebase/firebase";

//google
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

export function signInWithFacebook() {
  let currentUser = null;
  const provider = new FacebookAuthProvider();

  signInWithPopup(auth, provider)
    .then((result) => {
      // The signed-in user info.
      const user = result.user;
      currentUser = result.user;

      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      const credential = FacebookAuthProvider.credentialFromResult(result);
      const accessToken = credential.accessToken;
    })
    .catch((error) => console.log(error));
  return currentUser;
}

export function signInWithGithub() {
  let currentUser = null;
  const provider = new GithubAuthProvider();
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a GitHub Access Token. You can use it to access the GitHub API.
      const credential = GithubAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;

      // The signed-in user info.
      const user = result.user;
      currentUser = result.user;
    })
    .catch((error) => console.log(error));
  return currentUser;
}

export function signInWithTwitter() {
  let currentUser = null;
  const provider = new TwitterAuthProvider();

  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a the Twitter OAuth 1.0 Access Token and Secret.
      // You can use these server side with your app's credentials to access the Twitter API.
      const credential = TwitterAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const secret = credential.secret;

      // The signed-in user info.
      const user = result.user;
      currentUser = user;
    })
    .catch((error) => console.log(error));

  return currentUser;
}
