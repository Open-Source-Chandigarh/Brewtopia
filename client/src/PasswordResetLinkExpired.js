import React from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import "./styles/login.css";

function PasswordResetLinkExpired() {
  const Navigation = useNavigate();

  const handleLoginBtn = () => {
    Navigation("/login");
  };
  return (
    <div className="login-wrapper">
      <div className="login_card">
        <div className="background">
          <div className="shape" />
          <div className="shape" />
        </div>
        <div className="form">
          <h3>Password Reset Link Expired</h3>
          <p>
            The link to reset your password has expired. Password reset links
            are typically valid for a limited time for security reasons.
          </p>
          <p>
            Please initiate the password reset process again to receive a new
            link.
          </p>
          <button type="button" class="login_button" onClick={handleLoginBtn}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default PasswordResetLinkExpired;
