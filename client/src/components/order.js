import { MdDone } from "react-icons/md"

//this is function for each order to display 
//it is mapped by app page
export default function Order(props) {

    //destructuring of props
    const { order } = props
    const { amount, order_id, time, method } = order

    return (

        // displaying order by user
        <div className="order">
            <h4><MdDone style={{ fontSize: "17px", color: "white", background: "#67df67", padding: "1px", borderRadius: "10px" }} /> {order_id}</h4>
            <p>Order of ₹{amount / 100}</p>
            <p>Mode of payment : {method}</p>
            <h6>{time}</h6>
        </div>
    )
}