import "../styles/App.css";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";

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
      {/* <div className="range">
      <button className="redbtn"
          type="button"
          onClick={() =>
            setCounter((prevCounter) => Math.max(prevCounter - 1, 1))} style={{borderRadius: "20px", fontWeight: "600"}}
            >
          -
        </button>
        <p style={{fontWeight: "600", fontSize: "medium" }}>{counter}</p>
        <button className="greenbtn"
          type="button"
          onClick={() => setCounter((prevCounter) => prevCounter + 1)} style={{borderRadius: "20px", fontWeight: "600"}}
        >
          +
        </button>
      </div> */}
      {/* <div>
        <button className="redbtn" type="button" onClick={removeItem} style={{borderRadius: "20px", fontWeight: "600", fontSize: "medium"}}>
          <MdDeleteOutline></MdDeleteOutline>
        </button>
      </div> */}
    </div>
  );
}