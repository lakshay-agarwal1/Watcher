// const validateInput = (name, email, password) => {
//   const isNameValid = /^[a-zA-Z]+([ '-][a-zA-Z]+)*$/.test(name);
//   const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
//   const isPasswordValid =
//     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(password);

//   if (!isNameValid) return "Invalid Name";
//   if (!isEmailValid) return "Email ID is not valid";
//   if (!isPasswordValid) return "Password is not valid";
//   return null;
// };

// export default validateInput;
const validateInput = (name, email, password, isSignIn = false) => {
  if (!isSignIn) {
    const isNameValid = /^[a-zA-Z]+([ '-][a-zA-Z]+)*$/.test(name || "");
    if (!isNameValid) return "Invalid Name";
  }

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email || "");
  if (!isEmailValid) return "Email ID is not valid";

  const isPasswordValid =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(password || "");
  if (!isPasswordValid)
    return "Password must be 8+ chars with uppercase, lowercase, number & special char";

  return null;
};

export default validateInput;
