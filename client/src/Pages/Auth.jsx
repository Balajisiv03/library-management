import { useState } from "react";

const Auth = () => {
  const [signup, setSignup] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handlebtn = () => {
    setSignup(!signup);
  };
  return (
    <div className="h-screen bg-gray-700 flex items-center justify-center">
      <form className="bg-zinc-400 w-[90vw] md:w-[40vw] lg:w-[25vw] rounded-md pt-6 pb-8 flex flex-col items-center">
        {signup ? <h1>SignUp</h1> : <h1>Login</h1>}
        {signup && (
          <label htmlFor="name">
            <h2>Name</h2>
            <input
              className="shadow-sm focus:outline-none focus:ring focus:border-gray-500"
              type="name"
              name="name"
              id="name"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </label>
        )}
        <label htmlFor="email">
          <h2>Email</h2>
          <input
            type="email"
            name="email"
            id="email"
            className="shadow-sm focus:outline-none focus:ring focus:border-gray-500"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </label>
        <label htmlFor="password">
          <h2>Password</h2>
          <input
            type="password"
            name="password"
            id="password"
            className="shadow-sm focus:outline-none focus:ring focus:border-gray-500"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </label>
        <button
          type="submit"
          className="bg-gray-500 text-white px-20 py-1 rounded-md mt-4 focus:outline-none hover:bg-gray-900 mb-4 "
        >
          {signup ? "Sign Up" : "Log in"}
        </button>
        <p>
          {signup ? "Already have an account? " : "Dont have an account? "}
          <button
            type="button"
            onClick={handlebtn}
            className="focus:outline-none hover:bg-gray-300 text-black font-semibold py-2 px-4 rounded-md transition-colors uppercase text-center"
          >
            {signup ? "Log in" : "Sign Up"}
          </button>
        </p>
      </form>
    </div>
  );
};

export default Auth;
