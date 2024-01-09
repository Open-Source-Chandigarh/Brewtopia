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
        <button
          type="button"
          onClick={() =>
            setCounter((prevCounter) => Math.max(prevCounter - 1, 1))
          }
        >
          -
        </button>
        <p>{counter}</p>
        <button
          type="button"
          onClick={() => setCounter((prevCounter) => prevCounter + 1)}
        >
          +
        </button>
      </div>
      <div>
        <p>₹ {item.price * counter}</p>
        <button type="button" onClick={removeItem}>
          <MdDeleteOutline></MdDeleteOutline>
        </button>
      </div>
    </div>
  );
}
