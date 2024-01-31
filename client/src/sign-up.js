import "./styles/login.css";
import Axios from "axios";
import { useState ,useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import  toast from "react-hot-toast";
import LoaderBlack from "./Loaders/loaderblack";
import { IoEyeOutline,IoEyeOffOutline  } from "react-icons/io5";

const apiUrl = process.env.REACT_APP_API_URL;

export default function Sign() {
  const Navigation = useNavigate();
  const [name, setname] = useState("");

  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [confirmpassword, setconfirmpassword] = useState("");

  const [loading,setloading] = useState(false);
  const [showPassword,setShowPassword]=useState(false);
  const [showConfirmPassword,setShowConfirmPassword]=useState(false);
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const cookies = new Cookies();
  let username_check = cookies.get('username');
  let name_check = cookies.get('name');

  const handlesubmit = async (e) => {

    e.preventDefault();

    if(!name){
      return toast.error("Enter name");
    }else if(!username){
      return toast.error("Enter username");
    }else if(!password){
      return toast.error("Enter password");
    }else if(!confirmpassword){
      return toast.error("Enter confirm password");
    }else if(password!==confirmpassword){
      return toast.error("Both the passwords are not matching");
    }else if(!passwordRegex.test(password.trim())){
      console.log(passwordRegex.test(password))
      return toast.error("Password must be atleast 8 digit and should contain atleast one letter,number and special symbol ");
    }
    else{

    //display loader
    setloading(true)

    //posting data to api
    await Axios.post(apiUrl+"/createUser", {
      name: name, 
      username: username,
      password: password
    })
      .then((res) => {
        if(res.data.username && res.data.password===res.data.confirmpassword){
          toast.success("registered successfully")
          Navigation("/login");
        }else{
          toast.error(res.data.error || "an error occured")
          setloading(false);
        }
      }).catch((err)=>console.log(err))
    }
  };

  useEffect(() => {
    //checking if user is already logged in on every load of page
    if(username_check && name_check){
      Navigation("/");
    }
  },[username_check,name_check,Navigation])

  const handleEnterKey = (e) => {
    if (e.key === "Enter") {
      handlesubmit(e);
    }
  };
  const handlePasswordToggle=()=>{
    setShowPassword(!showPassword);
  };
  const handleConfirmPasswordToggle=()=>{
    setShowConfirmPassword(!showConfirmPassword);
  };

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
          onKeyDown={handleEnterKey}
        />
        <input
          className="input"
          type="text"
          placeholder="Username"
          onChange={(e) => setusername(e.target.value)}
          onKeyDown={handleEnterKey}
        />
        <div className="passwordinput">
        <input
          className="input"
          type= {showPassword ? "text":"password"}
          placeholder="Password"
          onChange={(e) => {setpassword(e.target.value)}}
          onKeyDown={handleEnterKey}
        />
         <button type="button" className="togglebutton" onClick={handlePasswordToggle}>{showPassword ? <IoEyeOffOutline size={16} />: <IoEyeOutline size={16} />}</button>
            </div>
            <div className="passwordinput">
        <input
          className="input"
          type= {showConfirmPassword ? "text":"password"}
          placeholder="Confirm Password"
          onChange={(e) => {setconfirmpassword(e.target.value)}}
          onKeyDown={handleEnterKey}
        />
         <button type="button" className="togglebutton" onClick={handleConfirmPasswordToggle}>{showConfirmPassword ? <IoEyeOffOutline size={16} />: <IoEyeOutline size={16} />}</button>
            </div>
        <p className="redirect">
          Already a user ? <a href="/login">Login</a>
        </p>
        <button type="button" onClick={handlesubmit} className="login_button">
          {loading? <LoaderBlack/>:"Sign Up"}
        </button>
      </form>
      </div>
    </div>
  );
}
