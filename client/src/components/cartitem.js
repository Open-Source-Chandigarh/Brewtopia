import "../styles/App.css";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";
import { MdDeleteOutline } from "react-icons/md";

export default function CartItem({ item, cart, setCart }) {
  const [counter, setCounter] = useState(item.count || 1);

  useEffect(() => {
    // Update the count in the parent cart state
    setCart((prevCart) =>
      prevCart.map((object) =>
        object.name === item.name ? { ...object, count: counter } : object
      )
    );
  }, [counter, item.name, setCart]);

  const removeItem = () => {
    const newCart = cart.filter((object) => object.name !== item.name);
    setCart(newCart);
    toast.error("Removed from cart");
  };

  return (
    <div className="item">
      <img src={item.photo} width={50} alt={`${item.name} thumbnail`} />
      <div>
        <h4>
          {item.name} x {counter}
        </h4>
      </div>
      <div className="range">
        <button className="redbtn"
          type="button"
          onClick={() =>
            setCounter((prevCounter) => Math.max(prevCounter - 1, 1))} style={{borderRadius: "20px", backgroundColor: "#FF6969", fontWeight: "600"}}>
          -
        </button>
        <p style={{fontWeight: "600", fontSize: "medium" }}>{counter}</p>
        <button className="greenbtn"
          type="button"
          onClick={() => setCounter((prevCounter) => prevCounter + 1)} style={{borderRadius: "20px", backgroundColor: "#9DBC98", fontWeight: "600"}}
        >
          +
        </button>
      </div>
      <div>
        <p style={{fontWeight: "600", fontSize: "large", paddingLeft: "4px", paddingTop: "5px"}}>₹ {item.price * counter}</p>
        <button className="redbtn" type="button" onClick={removeItem} style={{borderRadius: "20px", backgroundColor: "#FF6969", fontWeight: "600", fontSize: "medium"}}>
          <MdDeleteOutline></MdDeleteOutline>
        </button>
      </div>
    </div>
  );
}