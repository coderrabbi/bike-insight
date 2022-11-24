import React, { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GithubAuthProvider,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { app } from "../Firebase/Firebase.cofig";
// import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
export const AuthContext = createContext();

const auth = getAuth(app);
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // const location = useLocation();
  // const navigate = useNavigate();
  // const from = location.state?.from?.pathname || "/";

  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
    setLoading(false);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();

  const googleSignIn = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const user = result.user;
        console.log(user);
        setUser(user);
        if (user.uid) {
          // navigate(from, { replace: true });
          setLoading(false);
          toast.success("login sucessfull");
        }
      })
      .catch((error) => {
        console.log(error);
        toast.warning(error);
      });
  };

  const handleGithubSignIn = () => {
    signInWithPopup(auth, githubProvider)
      .then((result) => {
        const user = result.user;
        if (user.uid) {
          // navigate(from, { replace: true });
          toast.success("login success");
          setLoading(false);
        }
        setUser(user);
      })
      .catch((error) => {
        console.error(error);
        toast.warning(error.message);
      });
  };

  useEffect(() => {
    const unsbscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      return () => unsbscribe();
    });
  }, []);
  const logOut = () => {
    setLoading(true);
    signOut(auth);
  };
  const authInfo = {
    createUser,
    signIn,
    logOut,
    user,
    loading,
    setLoading,
    handleGithubSignIn,
    googleSignIn,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
