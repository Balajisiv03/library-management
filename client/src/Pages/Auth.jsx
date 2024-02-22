import { useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const [signup, setSignup] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const gotohome = () => {
    navigate("Home");
  };

  const gotoadmin = () => {
    navigate("Admpage");
  };

  const handlebtn = () => {
    setSignup(!signup);
  };

  const Submitdata = (e) => {
    e.preventDefault();
    console.log("Form data:", { name, email, password });

    //forsignup
    if (signup) {
      if (!email && !password && !name) {
        alert("enter the name and password , email");
      } else {
        Axios.post("http://localhost:3001/signup", {
          name,
          email,
          password,
        })
          .then((response) => {
            if (response.data.Status === "Success") {
              alert("Sign up success");
              console.log("Insert successful:", response.data);
              gotohome();
            } else {
              //to check user is already registered
              alert(`Error: ${response.data.Error}`);
            }
          })
          .catch((error) => {
            console.error("Error inserting data:", error);
          });
      }
    }

    //forlogin
    if (!signup) {
      console.log(email, password, 1);
      //adminlogin

      if (email === "admin@gmail.com" && password === "admin") {
        gotoadmin();
      }

      //userlogin
      else {
        Axios.post("http://localhost:3001/login", {
          email,
          password,
        })
          .then((response) => {
            if (response.data && response.data.Status === "Success") {
              alert("Login successful!");
              navigate("/HomePage");
            } else {
              alert(`Error: ${response.data.Error}`);
            }
          })
          .catch((error) => {
            console.error("Error inserting data:", error);
          });
      }
    }
  };
  return (
    <div className="h-screen bg-gray-700 flex items-center justify-center">
      <form
        className="bg-zinc-400 w-[90vw] md:w-[40vw] lg:w-[25vw] rounded-md pt-6 pb-8 flex flex-col items-center"
        onSubmit={Submitdata}
      >
        {signup ? <h1>SignUp</h1> : <h1>Login</h1>}
        {signup && (
          <label htmlFor="name">
            <h2>Name</h2>
            <input
              className="shadow-sm focus:outline-none focus:ring focus:border-gray-500"
              type="name"
              name="name"
              id="name"
              autoComplete="name"
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
            autoComplete="current-password"
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
