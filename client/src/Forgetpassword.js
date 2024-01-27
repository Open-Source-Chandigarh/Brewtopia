import {React,useState} from 'react'
import "./styles/login.css";

export default function Forgetpassword() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [hideEmailInput, sethideEmailInput] = useState(true);

    const handleForgetPassword=(e)=>{
        e.preventDefault();
    }
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
          <form className="form"   onSubmit={handleForgetPassword}>
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
        <button  type="button" onClick={handleForgetPassword} className="button">Submit</button>
          </form>
        </div>
      </div>
  )
}


