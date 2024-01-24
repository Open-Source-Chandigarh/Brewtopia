import profilepic from "../images/profilepic.jpg";
import CartItem from "./cartitem";
import { AiOutlineCloseCircle } from "react-icons/ai"
import { BiLogOut } from "react-icons/bi"
import Axios from "axios";
import { TiShoppingCart } from "react-icons/ti";
import toast from "react-hot-toast";
import Loader from "../Loaders/loader";
import { useState } from "react";

const apiUrl = process.env.REACT_APP_API_URL;

export default function Cart({name,username,setshowCart,cookies,cart,total,setCart}){

    const [loading,setloading] = useState(false);

      //logout function 
    function logout() {
        cookies.remove("username");
        cookies.remove("name");

        toast.error("logged out");

        //reloading the page to reflect changes
        window.location.reload(false);
    }

    //handling payment when clicked on checkout button
    const handlePayment = async (total, username) => {

      setloading(true);

      try{
        //checking if cart has items
        if (cart.length === 0) {
          setloading(false);
          return toast.error("Cart is empty");
        }

        //getting razorpay key from server
        const { data: { key } } = await Axios.get(apiUrl + "/getKey");

        //posting server with amount 
        const { data: { order } } = await Axios.post(apiUrl + "/checkout", {
        amount: total
       })

        //options for razorpay window [...all copied from razorpay setup sdk]
        var options = {
        key: key, // Enter the Key ID generated from the Dashboard
        amount: order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: "INR",
        name: "Brewtopia",
        description: "Test Transaction",
        image: "https://avatars.githubusercontent.com/u/98728916?v=4",
        order_id: order.id,
        callback_url: `${apiUrl}/paymentverification?username=${username}`,
        prefill: {
            name: { username },
            email: { username },
            contact: "9000090000"
        },
        notes: {
            address: "Razorpay Corporate Office"
        },
        theme: {
            color: "#ecd3bd"
        }
        }

        //here opens the razorpay window ... window has Razorpay method
        //because we put script tag of razorpay in index.html
        var razor = new window.Razorpay(options);
        razor.open();
        setloading(false);
      }catch(err){
        toast.error("an error occured");
        setloading(false);
        console.log(err);
      };

    }
    return(
        <div className="cartBack">
        <div className="backDrop" onClick={() => setshowCart(false)}></div>
        <div className="cart">
          <h2>Your Cart</h2>
          <AiOutlineCloseCircle onClick={() => setshowCart(false)} style={{
            position: "absolute",
            right: "24px",
            top: "20px",
            color: "#54290C",
            fontSize: "26px",
            cursor: "pointer"
          }}></AiOutlineCloseCircle>
          <div className="cart-items">

            {/* checking if cart has any objects */}
            {cart.length > 0
              ? cart.map((item, index = cart.indexof(item)) => {

                // giving props to cartitem and giving states also so we can change them there
                return (
                  <CartItem
                    key={index}
                    item={item}
                    cart={cart}
                    setCart={setCart}
                    total={total}
                  ></CartItem>
                );
              })
              : "Added items will be shown here"}
          </div>
          {/* showing cart total  */}
          <div className="cart-total">
            <p style={{paddingLeft: "10px"}}>Total : <a style={{margin: "0 0 0 60%"}}>₹ {total}</a></p>
            <button type="button" onClick={() => handlePayment(total, username)} style={{ marginTop: "2%" }}>
            {loading ? <Loader/>:
              <><TiShoppingCart color="white" style={{ fontSize: "1.2rem" }}></TiShoppingCart>
              Checkout</>}
            </button>
          </div>

          {/* showing user profile with logout button */}
          <div className="user">
            <img src={profilepic} alt="profile" />
            <div className="username">
              <h3>{name}</h3>
              <p>@{username}</p>
            </div>
            <button type="button" onClick={() => logout()}>
              <BiLogOut></BiLogOut>
            </button>
          </div>
        </div>


      </div>
    )
}