import { React, useEffect } from "react";
import "./styles/login.css";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

function PasswordResetConfirmation() {
  const Navigation = useNavigate();

  useEffect(() => {
    const cookies = new Cookies();
    const status = cookies.get("resetpassword");
    if (!status) {
      Navigation("/resetlinkexpired");
    } else {
      //since we are done with resetting the password we can remove it to prevent others accidently coming across this route
      cookies.remove("resetpassword");
    }
  }, []);
  const handlePasswordResetConfirmation = (e) => {
    e.preventDefault();
    Navigation("/login");
  };
  return (
    <div className="login-wrapper">
      <div className="login_card">
        <div className="background">
          <div className="shape" />
          <div className="shape" />
        </div>
        <form className="form" onSubmit={handlePasswordResetConfirmation}>
          <h3>Password Reset Successful</h3>

          <p>
            Your password has been successfully reset. You can now log in with
            your new password.
          </p>

          <button
            type="button"
            onClick={handlePasswordResetConfirmation}
            className="login_button"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default PasswordResetConfirmation;
