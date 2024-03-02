import "../styles/App.css";
import toast from "react-hot-toast";
import { useState, useEffect, useContext } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { cartContext } from "../context/CartContext";

export default function CartItem({ item }) {
  const [counter, setCounter] = useState(item.count || 1);
  const {cart , setCart,updateservercart} = useContext(cartContext);

  useEffect(() => {
    // Update the count in the parent cart state
    const currentCart = cart; // Access current cart value

    // Create a new cart with updated count
    const newCart = currentCart.map((object) =>
      object.name === item.name ? { ...object, count: counter } : object
    );
  
    setCart(newCart);
    updateservercart(newCart);
    
  }, [counter, item.name, setCart]);

  const removeItem = () => {
    const newCart = cart.filter((object) => object.name !== item.name);
    setCart(newCart);
    updateservercart(newCart);
    toast.error("Removed from cart");
  };

  return (
    <div className="item">
      <div style={{ width: "10.9vw" }}>
        <div style={{ display: "flex" }}>
          <img src={item.photo} width={65} alt={`${item.name} thumbnail`} />
          <button  onClick={() => removeItem()} style={{ color: "red", fontSize: "18px", cursor: "pointer", background: "none", border: "none", borderRadius: "50%", marginTop: "-10%" }}>
          <AiOutlineCloseCircle></AiOutlineCloseCircle>
          </button>
        </div>
        <h4 style={{ fontSize: "15px", marginTop: "2%", marginLeft: "-3%" }}>
          {item.name} x {counter}
        </h4>
      </div>
      <div>
      <p style={{ margin: "3% 0 0 0", fontWeight: "900", fontSize: "large", paddingLeft: "4px", paddingTop: "5px"}}>₹ {item.price * counter}</p>
        <button className="redbtn"
            type="button"
            onClick={() =>
            setCounter((prevCounter) => Math.max(prevCounter - 1, 1))} style={{ marginTop:"20%", borderTopLeftRadius: "20px", borderBottomLeftRadius: "20px", fontWeight: "600"}}
          >
            -
          </button>
          <button className="greenbtn"
            type="button"
            onClick={() => 
            setCounter((prevCounter) => prevCounter + 1)} style={{ borderTopRightRadius: "20px", borderBottomRightRadius: "20px", fontWeight: "600"}}
          >
            +
          </button>
      </div>
    </div>
  );
}