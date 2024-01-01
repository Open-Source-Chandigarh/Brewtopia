import "../styles/App.css"
import toast from "react-hot-toast";
import { useState } from "react";
import {MdDeleteOutline} from "react-icons/md"


export default function CartItem(props){

    //destructuring from the props object to obtain vars
    const { item, cart ,setCart } = props;
    const [counter, setcounter] = useState(1);

    //to remove an item from the cart
    const removeitem = () => {
        const newCart = cart.filter((object) => object.name !== item.name);
        setCart(newCart);

        toast.error("Removed from cart")
    }
    
    return(
        <div className="item">
            <img src={item.photo} width={50} alt={item.name} />
            <div>
            <h4>{item.name} x {item.count}</h4>
            </div>
            <div className="range">
            <button
              type="button"
              onClick={() => {
                if (counter === 1) {
                } else {
                  setcounter(counter - 1);
                }
              }}
            >
              -
            </button>
            <p>{counter}</p>
            <button
              type="button"
              onClick={() => {
                setcounter(counter + 1);
              }}
            >
              +
            </button>
          </div>
            
            <div>
                <p>₹{item.price * counter}</p>
                <button type="button" onClick={removeitem}><MdDeleteOutline></MdDeleteOutline></button>
            </div>
        </div>
    )
}