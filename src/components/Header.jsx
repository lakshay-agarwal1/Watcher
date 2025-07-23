import React, { useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import {  useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser, removeUser } from "../utils/slices/userSlice";

const Header = () => {
  const user = useSelector((state) => state.user);
  
  const navigate = useNavigate();
  const dispatch = useDispatch(); 

  const handleSignout = () => {
    signOut(auth)
    .then(() => {
        
      })
      .catch((error) => {
    
        console.log(error);
      });
  };
  

useEffect(() => {
     const unsubscribe = 
     onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const { uid, email, displayName } = user;
        // ...
        dispatch (addUser({uid : uid , email: email , displayName: displayName }))
        navigate("/browse")
      } else {
        // User is signed out
        // ...
        dispatch (removeUser ());
        navigate("/")
      }
    });
    return () =>  unsubscribe ();
  }, [dispatch, navigate]);

  return (
    <div className="absolute px-13 py-8 w-full  bg-gradient-to-b from-black z-100 flex justify-between">
      <img
        src="./ChatGPT Image Jul 20, 2025, 07_25_15 PM.png"
        alt="watcher Logo"
        className="h-14 w-auto"
      />

      {/* here is the conditional render  */}

      {user && (
        <div className="flex items-center gap-3">
          <img
            src={`https://api.dicebear.com/7.x/thumbs/svg?seed=${user.email}`}
            alt="user"
            className="w-10 h-10 rounded-full border"
          />
          <button
            onClick={handleSignout}
            className="bg-red-600 hover:bg-red-700 text-white px-7 py-3 rounded-md text-m "
          >
            
            Log out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
// conditional render for other parts like - logout , profile , other nav[home , watchlist ]
