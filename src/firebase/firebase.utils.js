import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
const config = {
  apiKey: "AIzaSyAaRruM_PB1Y-Pv2EFypXMkJgNCQefuh7Y",
  authDomain: "crwn-clothing-b8539.firebaseapp.com",
  projectId: "crwn-clothing-b8539",
  storageBucket: "crwn-clothing-b8539.appspot.com",
  messagingSenderId: "578910251885",
  appId: "1:578910251885:web:f9d3f647178ec2765dc864",
  measurementId: "G-RQ1GW7J8R6",
};
firebase.initializeApp(config);

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();
  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }
  return userRef;
};
export const auth = firebase.auth();
export const firestore = firebase.firestore();

export default firebase;
