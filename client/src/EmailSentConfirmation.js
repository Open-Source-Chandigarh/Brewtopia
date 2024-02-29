import { React, useEffect } from "react";
import "./styles/login.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Cookies from "universal-cookie";
import Axios from "axios";
import LoaderBlack from "./Loaders/loaderblack";
import toast from "react-hot-toast";

const apiUrl = process.env.REACT_APP_API_URL;

function EmailSentConfirmation() {

  const cookies = new Cookies();
  const email = cookies.get("email");
  const username = cookies.get("usernameforemail");

  const [loading, setloading] = useState(false);

  const Navigation = useNavigate();

  useEffect(() => {
    //to prevent user from going on this route without intiating a forget password we are setting cookies and carrying its status so that passwordcofirmation can use the same  and decide whether it was intiated or not
    const cookies = new Cookies();
    const status = cookies.get("resetpassword");
    if (!status || status !== "emailinitiated") {
      Navigation("/login");
    } else {
      const cookies = new Cookies();
      cookies.set("resetpassword", "resetdone");
    }
  }, []);
  const handleResendEmailBtn = async () => {
    setloading(true)
    try {
      const response = await Axios.post(apiUrl + "/sendEmail", {
        username: username,
        to: email,
      });
      setloading(false)
      toast.success("Email sent successfully");
      const cookies = new Cookies();
      cookies.set("resetpassword", "emailinitiated");
      Navigation("/emailconfirmation");
    } catch (error) {
      console.log(error);
      setloading(false);
      toast.error("An error occured.")
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login_card">
        <div className="background">
          <div className="shape" />
          <div className="shape" />
        </div>
        <div className="form">
          <h3>Email Sent</h3>
          <p>
            We have sent an email to your registered email address with further
            instructions. Please check your inbox and follow the provided link
            to reset your password.
          </p>
          <button
            type="button"
            className="login_button"
            onClick={handleResendEmailBtn}
          >
            {loading ? <LoaderBlack/> : "Resend Email"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default EmailSentConfirmation;
