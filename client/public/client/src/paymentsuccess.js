import "./styles/App.css";
import { useSearchParams } from "react-router-dom"

export default function PaymentSuccess(){

    const searchQuery = useSearchParams()[0];
    const referenceNum = searchQuery.get("reference");

    return(
        <div className="success-wrap">
            <div className="payment-success">
                <img src="https://cdn-icons-png.flaticon.com/512/4436/4436481.png"></img>
                <h1>Success</h1>
                <p>{referenceNum}</p> 
                <a href="/">Home</a>
            </div>
        </div>
    )
}