import { React, useState } from "react";
import "./styles/login.css";
import Axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import LoaderBlack from "./Loaders/loaderblack";

const apiUrl = process.env.REACT_APP_API_URL;

export default function Forgetpassword() {
    const Navigation = useNavigate();

    const [email, setEmail] = useState("");
    const [loading, setloading] = useState(false);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const sendEmail = async () => {
        try {
            const response = await Axios.post(apiUrl + "/sendEmail", {
                username: email,
                to: email,
            });
            setloading(false);
            const cookies = new Cookies();
            cookies.set("resetpassword", "emailinitiated");
            //in case user clicks on resend email then email and username required for sending email will be picked from cookies
            cookies.set("email", email);
            cookies.set("usernameforemail", email);
            setloading(false);
            Navigation("/emailconfirmation");
        } catch (error) {
            console.log(error);
            setloading(false);
        }
    };

    const handleForgetPassword = async (e) => {
        e.preventDefault();
        if (!email) {
            return toast.error("Email is required");
        }
        if (email.length > 0 && !emailRegex.test(email)) {
            return toast.error("please enter valid email");
        }
        try {
            setloading(true);
            const response = await Axios.post(apiUrl + "/forgetpassword", {
                username: email,
            });

            if (response.data.status === true) {
                // Setting cookies to keep the user logged in
                sendEmail();
            } else {
                toast.error("User doesn't exist. Please register.");
                setloading(false);
            }
        } catch (error) {
            console.error("An error occurred while making the request:", error);
            // Handle the error, you might want to show an error message to the user.
            toast.error("An error occurred while processing your request.");
            setloading(false);
        }
    };
    const handleEnterKey = (e) => {
        if (e.key === "Enter") {
            handleForgetPassword(e);
        }
    };
    return (
        <div className="login-wrapper">
            <div className="login_card">
                <div className="background">
                    <div className="shape" />
                    <div className="shape" />
                </div>
                <form className="form">
                    <input
                        className="input"
                        type="email"
                        placeholder="Email"
                        id="email"
                        onChange={(e) => setEmail(e.target.value)}
                        onKeyDown={handleEnterKey}
                    />
                    <button
                        type="button"
                        onClick={handleForgetPassword}
                        className="login_button"
                    >
                        {loading ? <LoaderBlack /> : "Submit"}
                    </button>
                </form>
            </div>
        </div>
    );
}
