import "./styles/login.css";
import { useState } from "react";
import LoaderBlack from "./Loaders/loaderblack";
import Axios from "axios";
import Cookies from "universal-cookie";
import toast from "react-hot-toast";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

const apiUrl = process.env.REACT_APP_API_URL;

export default function Login() {
  
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [loading, setloading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const cookies = new Cookies();

  //sending request to api for login
  const handleLogin = async (e) => {
    //preventing default behaviour of refresh
    e.preventDefault();

    try {
      if (!username || !password) {
        return toast.error("username and password are required");
      } else if (username.length > 0 && !emailRegex.test(username)) {
        return toast.error("Enter a valid email address");
      }

      setloading(true);

      //getting data from backend port
      await Axios.post(apiUrl + "/getUser", {
        username: username,
        password: password,
      }).then((res) => {
        // setting cookies to keep user logged in
        if (res.data.username) {
          cookies.set("username", res.data.username, { sameSite: "strict" });
          cookies.set("name", res.data.name, { sameSite: "strict" });
          window.location.reload(false);
        } else {
          toast.error(res.data.error || "an error occured");
          setloading(false);
        }
      });
    } catch (err) {
      // network errors or other exceptions
      toast.error("Failed to connect to the server");
      setloading(false);
    }
  };
  const handleToggle = () => {
    setShowPassword((prev) => !prev);
  };

  //whenever user presses enter key
  const handleEnterKey = (e) => {
    if (e.key === "Enter") {
      handleLogin(e);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login_card">
        <div className="background">
          <div className="shape" />
          <div className="shape" />
        </div>
        <form className="form form_login" onSubmit={handleLogin}>
          <h3>Login Here</h3>
          <input
            className="input"
            type="text"
            placeholder="Email"
            id="username"
            onChange={(e) => setusername(e.target.value)}
            onKeyDown={handleEnterKey}
          />
          <div className="passwordinput">
            <input
              className="input"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              id="password"
              onChange={(e) => setpassword(e.target.value)}
              onKeyDown={handleEnterKey}
            />
            <button
              type="button"
              className="togglebutton"
              onClick={handleToggle}
            >
              {showPassword ? (
                <IoEyeOffOutline size={16} />
              ) : (
                <IoEyeOutline size={16} />
              )}
            </button>
          </div>
          <button></button>
          <p className="redirect">
            <a
              href="/Forgetpassword"
              style={{ textAlign: "right", paddingTop: "10px" }}
            >
              Forgot Password?
            </a>
          </p>

          <p className="redirect">
            Not a user ? <a href="/sign-up">sign up</a>
          </p>
          <button type="button" onClick={handleLogin} className="login_button">
            {loading ? <LoaderBlack /> : "Log In"}
          </button>
        </form>
      </div>
    </div>
  );
}
