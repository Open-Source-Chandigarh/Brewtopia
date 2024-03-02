import Order from "./order";
import { GoChecklist } from "react-icons/go";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useContext, useEffect, useState } from "react";
import Axios  from "axios";
import {ReactComponent as Rolling} from "../Loaders/RollingLoadersvg.svg"
import { loginContext } from "../context/LoginContext";
import { showContext } from "../context/showCartOrders";

const apiUrl = process.env.REACT_APP_API_URL;

export default function AllOrders(){

    const[orders, setOrders] = useState([]);
    const [loading,setloading] = useState(true);
    const {email} = useContext(loginContext)
    const {setshowOrders} = useContext(showContext)
    console.log(email)

    useEffect(() => {
        
        async function fetchOrders() {
            const AllOrders = await Axios.post(apiUrl + "/getOrders", {
                username : email
            });
            setOrders(AllOrders.data);
            setloading(false);
        }
        fetchOrders();

      },[email]);

    return(
        <div className="ordersBack">
        <div className="backDrop" onClick={() => setshowOrders(false)}></div>
        <div className="orders-wrap">
          <h2><GoChecklist></GoChecklist> Your Orders</h2>
          <AiOutlineCloseCircle onClick={() => setshowOrders(false)} style={{
            position: "absolute",
            right: "24px",
            top: "20px",
            fontSize: "26px",
            cursor: "pointer"
          }}></AiOutlineCloseCircle>
          <div className="orders">

            {/* checking if there are previous orders  by user */}
            {loading? <Rolling/>:orders.length > 0 ?
              orders.map((order, index = orders.indexOf(order)) => {
                return <Order key={index} order={order}></Order>
              })
              : "No orders yet..."
            }
          </div>
        </div>
      </div>
    )
}