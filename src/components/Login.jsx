import { useRef, useState } from "react";
import Header from "./Header";
import validateInput from "../utils/validation";

import { addUser } from "../utils/slices/userSlice";

import { useDispatch } from "react-redux";

import { signUpUser, signInUser } from "../utils/services/authService";

const Login = () => {
  const [isSigninForm, setSigninForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const handleSubmit = async () => {
    const enteredName = name.current ? name.current.value : null;
    const msg = validateInput(
      enteredName,
      email.current.value,
      password.current.value,
      isSigninForm
    );
    setErrorMessage(msg);
    if (msg) return;
    setIsLoading(true);
    try {
      if (!isSigninForm) {
        const user = await signUpUser(
          email.current.value,
          password.current.value,
          enteredName
        );
        dispatch(
          addUser({
            uid: user.uid,
            email: user.email,
            displayName: enteredName,
          })
        );
      } else {
       
        await signInUser(email.current.value, password.current.value);
       
      }
    } catch (error) {
      const errorCode = error.code;
      const errorMsg = error.message;
      setErrorMessage(`${errorCode} - ${errorMsg}`);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleForm = () => {
    console.log("toggle click");
    setSigninForm(!isSigninForm);
    setErrorMessage(null);
  };
  return (
    <div>
      <Header />

      <div
        className="absolute z-20 h-screen w-full bg-black bg-cover bg-top bg-no-repeat"
        style={{ backgroundImage: "url('./watcher_background.jpg')" }}
      ></div>

      <div className="relative z-20 flex flex-col items-center w-full h-screen inset-0 bg-black/55">
        <form className="bg-black/75 rounded-md w-full max-w-md p-10 mt-50 flex flex-col gap-6">
        

          <h2 className="text-3xl font-bold mb-4 text-white">
            {isSigninForm ? "Sign In" : "Sign Up"}
          </h2>

          {!isSigninForm && (
            <input
              ref={name}
              type="text"
              placeholder="Full Name"
              className="bg-neutral-800 text-white placeholder-gray-400 p-4 rounded outline-transparent  border-white"
            />
          )}
          <input
            ref={email}
            type="email"
            placeholder="Email or phone number"
            className="bg-neutral-800 text-white placeholder-gray-400 p-4 rounded outline-transparent  border-white "
          />

          <input
            ref={password}
            type="password"
            placeholder="Password"
            className="bg-neutral-800 text-white placeholder-gray-400 p-4 rounded outline-transparent  border-white"
          />
          <p className="text-red-500">{errorMessage}</p>

          <button
            onClick={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
            disabled={isLoading}
            className={`${
              isLoading
                ? "bg-red-400 cursor-not-allowed"
                : "bg-red-600 hover:bg-red-700"
            } transition text-white text-lg font-bold py-3 rounded mt-2`}
          >
            {isLoading ? "Loading..." : isSigninForm ? "Sign In" : "Sign Up"}
          </button>

          {isSigninForm && (
            <div className="flex items-center justify-between text-gray-400 text-xs mt-2">
              <label>
                <input type="checkbox" className="mr-1 accent-red-600" />
                Remember me
              </label>
              <a href="#" className="hover:underline">
                Need help?
              </a>
            </div>
          )}

          <div
            onClick={toggleForm}
            className="mt-6 text-gray-400 text-sm text-center hover:text-white hover:underline cursor-pointer"
          >
            {isSigninForm
              ? "New to Watcher ? Sign up now."
              : "Already Registered? Back to sign In"}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
