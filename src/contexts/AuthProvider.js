import app from "../firebase/firebase.config";
import { createUserWithEmailAndPassword, getAuth, GithubAuthProvider, onAuthStateChanged, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';


export const AuthContext = createContext();
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();

  const createUser = (email, password) => {
    setLoading(true)
    return createUserWithEmailAndPassword(auth, email, password);
  }

  const userInfoUpdate = (profile) => {
    return updateProfile(auth.currentUser, profile);
  }

  const userLogin = (email, password) => {
    setLoading(true)
    return signInWithEmailAndPassword(auth, email, password);
  }

  const userGoogleSignIn = () => {
    return signInWithPopup(auth, googleProvider)
  }

  const userGithubSignin = () => {
    return signInWithPopup(auth, githubProvider);
  }

  const logOut = () => {
    setLoading(true)
    return signOut(auth);
  }

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, currentUser => {
      setLoading(false)
      console.log(currentUser);
      setUser(currentUser);
    })
    return () => {
      unSubscribe();
    }
  }, [])

  const userInfo = { user, createUser, userInfoUpdate, userLogin, logOut, loading, userGoogleSignIn, userGithubSignin };

  return (
    <AuthContext.Provider value={userInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;





















// import { createContext, useEffect, useState } from "react";
// import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth'
// import app from "../firebase/firebase.config";



// export const AuthContext = createContext();
// const auth = getAuth(app)

// const AuthProvider = ({ children }) => {

//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const googleProvider = new GoogleAuthProvider();


//   const createUser = (email, password) => {
//     setLoading(true)
//     return createUserWithEmailAndPassword(auth, email, password);
//   }

//   //user details
//   const updateUser = (userInfo) => {

//     return updateProfile(auth.currentUser, userInfo)
//   }


//   //login /signin  with email and password

//   const signIn = (email, password) => {
//     setLoading(true)
//     return signInWithEmailAndPassword(auth, email, password)
//   }

//   const userGoogleSignIn = () => {
//     return signInWithPopup(auth, googleProvider)
//   }


//   //logout

//   const logOut = () => {
//     setLoading(true)
//     return signOut(auth)
//   }

//   //set an observer

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, currentUser => {
//       // console.log('user observing')
//       setUser(currentUser)
//       setLoading(false)
//     })
//     return () => unsubscribe()
//   }, [])


//   const authInfo = {
//     createUser,
//     user,
//     loading,
//     updateUser,
//     signIn,
//     userGoogleSignIn,
//     logOut

//   }

//   return (
//     <AuthContext.Provider value={authInfo}>

//       {children}
//     </AuthContext.Provider>
//   )
// }

// export default AuthProvider




















