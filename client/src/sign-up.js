import "./styles/login.css";
import Axios from "axios";
import { useState ,useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import  toast from "react-hot-toast";

export default function Sign() {
  const Navigation = useNavigate();
  const [name, setname] = useState("");

  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");

  const cookies = new Cookies();
  let username_check = cookies.get('username');
  let name_check = cookies.get('name');

  const handlesubmit = (e) => {
    e.preventDefault();

    if(!name){
      return toast.error("Enter name");
    }else if(!username){
      return toast.error("Enter username");
    }else if(!password){
      return toast.error("Enter password");
    }else if(password.length < 7){
      return toast.error("Password must be atleast 7 characters long")
    }

    //posting data to api
    const newUserPromise = Axios.post("https://brewtopia.up.railway.app/createUser", {
      name: name,
      username: username,
      password: password,
    })
      .then((res) => {
        if(!res.data){
          throw new Error();
        }else{
          Navigation("/login");
        }
      })

    toast.promise(newUserPromise, {
      loading: 'Signing up',
      success: 'Signed successfully',
      error: 'User already exists',
    });
  };

  useEffect(() => {
    //checking if user is already logged in on every load of page
    if(username_check && name_check){
      Navigation("/");
    }
  },[username_check,name_check,Navigation])

  return (
    <div className="login-wrapper">
      <div className="login_card">
      <div className="background">
        <div className="shape" />
        <div className="shape" />
      </div>
      <form className="form">
        <h3>Sign Up here</h3>
        <input
          className="input"
          type="text"
          placeholder="Name"
          onChange={(e) => setname(e.target.value)}
        />
        <input
          className="input"
          type="text"
          placeholder="Username"
          onChange={(e) => setusername(e.target.value)}
        />
        <input
          className="input"
          type="password"
          placeholder="Password"
          onChange={(e) => {setpassword(e.target.value)}}
        />
        <p className="redirect">
          Already a user ? <a href="/login">Login</a>
        </p>
        <button type="button" onClick={handlesubmit} className="button">
          Sign Up
        </button>
      </form>
      </div>
    </div>
  );
}
