import {React,useEffect} from 'react'
import "./styles/login.css";
import { useNavigate,useLocation,useParams } from 'react-router-dom';
import Cookies from "universal-cookie";
import Axios from "axios";


function EmailSentConfirmation() {
const apiUrl = process.env.REACT_APP_API_URL;

  const cookies=new Cookies();
  const email=cookies.get("email");
  const username=cookies.get("usernameforemail");
    const Navigation=useNavigate();
    useEffect(() => {
      //to prevent user from going on this route without intiating a forget password we are setting cookies and carrying its status so that passwordcofirmation can use the same  and decide whether it was intiated or not
        const cookies = new Cookies();
       const status= cookies.get("resetpassword");
       if(!status || status!=="emailinitiated"){
        Navigation("/login")

       }
       else{
          const cookies=new Cookies();
         
          cookies.set("resetpassword","resetdone")
       }
       
    }, []);
    const  handleResendEmailBtn=async ()=>{
 
      try {
        const response = await Axios.post(apiUrl+"/sendEmail", {
          username: username,
          to:email
        });
        const cookies = new Cookies();
        cookies.set("resetpassword","emailinitiated");
      Navigation("/emailconfirmation")
       } catch (error) {
        console.log(error)
       }
    }

  return (
    <div className="login-wrapper">
    <div className="login_card">
      <div className="background">
        <div className="shape" />
        <div className="shape" />
      </div>
      <div className='form'>
      <h3>Email Sent</h3>
      <p>We have sent an email to your registered email address with further instructions. Please check your inbox and follow the provided link to reset your password.</p>
      <button type="button" className="login_button" onClick={handleResendEmailBtn}>Resend Email</button>
      </div>
      </div>
      </div>
  )
}

export default EmailSentConfirmation
