import "./styles/login.css";
import { useState , useEffect} from "react";
import Axios from "axios";
import Cookies from 'universal-cookie';
import {  useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';

export default function Login() {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");

  const cookies = new Cookies();

  //sending request to api for login
  const handleLogin = (e) => {

    //preventing default behaviour of refresh
    e.preventDefault();

    if(!username){
      return toast.error("Enter Username");
    }

    if(!password){
      return toast.error("Enter Password");
    }

    const getUser = Axios.post("https://cafe-management-system-api.onrender.com/getUser", {
          username: username,
          password: password,
        });

// Display a loading toast while the promise is pending
const loadingToast = toast.loading('Logging in');

getUser
  .then((res) => {
    // Update the loading toast with a success message and set the duration to 5000ms (5 seconds)
              // setting cookies to keep user logged in
          if(res.data.username){
            cookies.set('username', res.data.username , { sameSite: 'strict' });
            cookies.set('name', res.data.name, { sameSite: 'strict' });
            toast.success('Logged in', { id: loadingToast, duration: 1000 });
            window.location.reload(false);
          }else{
            throw new Error();
          } 
    // ...
  })
  .catch((err) => {
    // Update the loading toast with an error message and set the duration to 5000ms (5 seconds)
    toast.error('Username/password combination is wrong', { id: loadingToast, duration: 1000 });
  });

  };

  return (
    <div className="login-wrapper">
      <div className="background">
        <div className="shape" />
        <div className="shape" />
      </div>
      <form className="form">
        <h3>Login Here</h3>
        <input
          className="input"
          type="text"
          placeholder="Username"
          id="username"
          onChange={(e) => setusername(e.target.value)}
        />
        <input
          className="input"
          type="password"
          placeholder="Password"
          id="password"
          onChange={(e) => setpassword(e.target.value)}
        />
        <p className="redirect">
          Not a user ? <a href="/sign-up">sign up</a>
        </p>
        <button type="button" onClick={handleLogin} className="button">
          Log In
        </button>
      </form>
    </div>
  );
}
