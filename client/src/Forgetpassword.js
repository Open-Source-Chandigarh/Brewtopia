import {React,useState} from 'react'
import "./styles/login.css";
import Axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from 'react-router-dom';
import Cookies from "universal-cookie";





export default function Forgetpassword() {

  const Navigation=useNavigate();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [hideEmailInput, sethideEmailInput] = useState(true);
    const apiUrl = process.env.REACT_APP_API_URL;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
   
    const handleForgetPasswordWithUsernameAndEmail=async (e)=>{
      e.preventDefault();
      if(!username){
        return  toast.error("Username is required")
       }
       if(!email){
        return  toast.error("Email is required")
       }
       if(!emailRegex.test(email)){
        return  toast.error("please enter valid email")
       }
     try {
      const response = await Axios.post(apiUrl+"/sendEmail", {
        username: username,
        to:email
      });
      const cookies = new Cookies();
      cookies.set("resetpassword","emailinitiated");
      //in case user clicks on resend email then email and username required for sending email will be picked from cookies
      cookies.set("email",email);
      cookies.set("usernameforemail",username);
      
    Navigation("/emailconfirmation")
     } catch (error) {
      console.log(error)
     }
    }
    const handleForgetPasswordWithUsername= async (e)=>{
        e.preventDefault();
        if(!username){
         return  toast.error("Username is required")
        }
        try {
          const response = await Axios.post(apiUrl+"/forgetpassword", {
            username: username
          });
        
          if (response.data.status === true) {
            // Setting cookies to keep the user logged in
            sethideEmailInput(false);
          } else {
            sethideEmailInput(true);
            toast.error("User doesn't exist. Please register.");
          }
        } catch (error) {
          console.error("An error occurred while making the request:", error);
          // Handle the error, you might want to show an error message to the user.
          toast.error("An error occurred while processing your request.");
        }
        
    }
    const handleEnterKey = (e) => {
        if (e.key === "Enter") {
          hideEmailInput===true? handleForgetPasswordWithUsername(e):handleForgetPasswordWithUsernameAndEmail(e);
        }
      };
  return (
    
    <div className="login-wrapper">
        <div className="login_card">
          <div className="background">
            <div className="shape" />
            <div className="shape" />
          </div>
          <form className="form"   >
          <input
          className="input"
          type="text"
          placeholder="Username"
          id="username"
          onChange={(e) => setUsername(e.target.value)}
          onKeyDown={handleEnterKey}
        />
        <input
          className="input"
          type="email"
          placeholder="Email"
          id="email"
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={handleEnterKey}
          style={{
            display:hideEmailInput===true?"none":"block"
          }}
        />
        <button  type="button" onClick={hideEmailInput===true?handleForgetPasswordWithUsername:handleForgetPasswordWithUsernameAndEmail} className="login_button">Reset Password</button>
          </form>
        </div>
      </div>
  )
}


