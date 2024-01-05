import "./styles/login.css";
import { useState} from "react";
import Axios from "axios";
import Cookies from 'universal-cookie';

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

    //getting data from backend port 
    const getUser = Axios.post("https://brewtopia.up.railway.app/getUser", {
      username: username,
      password: password,
    })
      .then((res) => {
          // setting cookies to keep user logged in
          if(res.data.username){
            cookies.set('username', res.data.username , { sameSite: 'strict' });
            cookies.set('name', res.data.name, { sameSite: 'strict' });
            window.location.reload(false);
          }else{
            throw new Error();
          }
      })

      toast.promise(getUser, {
        loading: 'Logging in',
        success: 'Logged in',
        error: 'Username/password combination is wrong',
      });

  };

  return (
    <div className="login-wrapper">
      <div className="login_card">
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
    </div>
  );
}