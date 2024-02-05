import {React,useState,useEffect} from 'react'
import "./styles/login.css";
import { IoEyeOutline,IoEyeOffOutline, IoFlaskOutline  } from "react-icons/io5";
import  toast from "react-hot-toast";
import Cookies from "universal-cookie";
import {jwtDecode} from 'jwt-decode';
import { useNavigate,useLocation,useParams } from 'react-router-dom';

import Axios from "axios";



function ResetPassword() {
  const Navigation = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const token = params.get('token');

  const [password, setpassword] = useState("");
  const [confirmpassword, setconfirmpassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);                           
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);   
  const [username, setusername] = useState("");
  
  const apiUrl = process.env.REACT_APP_API_URL;
 useEffect(() => {
     setpassword("")
     setconfirmpassword("")
     const verifyToken =async  () => {
      try {
        if(!token ){
          Navigation("/login");


        }
      
      
        const decodedToken = jwtDecode(token);
        const currentTime = Math.floor(Date.now() / 1000); 
        if (!decodedToken  || !decodedToken?.username || (decodedToken?.exp && decodedToken?.exp < currentTime  ) ) {
        
          Navigation("/resetlinkexpired");

        }
         //check if the token is consumed or not
       try{
        const response= await Axios.post(apiUrl+"/tokenconsumed", {
         token: token,
         username:decodedToken.username
       
       });
       if(response.status===200){
         if(response.data.status===true){
           Navigation("/resetlinkexpired")
         }
         
       }
    }
    catch(error){
    console.log(error)
    }
        setusername(decodedToken.username);  
      } catch (error) {
        console.log("hey u are no more valid", error);
      }
    };

    verifyToken();
    
 }, [token]);

    
    
    const handlePasswordToggle=()=>{
        setShowPassword(!showPassword);
      };
      const handleConfirmPasswordToggle=()=>{
        setShowConfirmPassword(!showConfirmPassword);
      };

      const handleEnterKey=(e)=>{
        if (e.key === "Enter") {
            handlePasswordReset(e);
          }
      }
      const handlePasswordReset= async (e)=>{


e.preventDefault();
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

if (!password || !confirmpassword) {
    return toast.error("password and confirm password are required");
  }
  if(password!==confirmpassword){
      return toast.error("Both the passwords are not matching");
  }
  if(!passwordRegex.test(password)){
    return toast.error("Password must be atleast 8 digit and should contain atleast one letter,number and special symbol ");

  }
  else {
   
    try {
        const response = await Axios.post(apiUrl+"/resetPassword", {
          username: username,
          "newPassword":password,
          token:token
        });
      if(response.status >= 200 && response.status < 300){
      
       
      

        if (response.data.status === true) {
          const cookies=new Cookies();
         cookies.set("resetpassword","done");
           
            Navigation("/resetpasswordconfirmation");
        } else {
          toast.error("User doesn't exist. Please register.");
        }
      }
      } catch (error) {
        console.error("An error occurred while making the request:", error);
        // Handle the error, you might want to show an error message to the user.
        toast.error("An error occurred while processing your request.");
        
      }
  
    
  }
      }


  return (
    <div className="login-wrapper">
    <div className="login_card">
      <div className="background">
        <div className="shape" />
        <div className="shape" />
      </div>
      <form className="form form_login" onSubmit={handlePasswordReset}>
        <h3>Reset Password</h3>
        <div className="passwordinput">
        <input
          className="input"
          type={showPassword?"text":"password"}
          placeholder="Password"
          id="username"
          onChange={(e) => setpassword(e.target.value)}
          onKeyDown={handleEnterKey}
        />
        {password.length>0 && <button type="button" className="togglebutton" onClick={handlePasswordToggle}>{showPassword ? <IoEyeOffOutline size={16} />: <IoEyeOutline size={16} />}</button>}

        </div>
        <div className="passwordinput">
        <input
          className="input"
          type= {showConfirmPassword ? "text":"password"}
          placeholder="Confirm Password"
          id="confirmpassword"
          onChange={(e) => setconfirmpassword(e.target.value)}
          onKeyDown={handleEnterKey}

        />
       {confirmpassword.length>0 && <button type="button" className="togglebutton" onClick={handleConfirmPasswordToggle}>{showConfirmPassword ? <IoEyeOffOutline size={16} />: <IoEyeOutline size={16} />}</button>}
        </div>
      
        
        <button
          type="button"
          onClick={handlePasswordReset}
          className="login_button"
        >
        Submit
        </button>
      </form>
    </div>
  </div>
  )
}

export default ResetPassword
