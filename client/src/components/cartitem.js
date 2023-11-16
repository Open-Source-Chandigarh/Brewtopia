import "../styles/App.css"
import toast from "react-hot-toast";
import {MdDeleteOutline} from "react-icons/md"


export default function CartItem(props){

    //destructuring from the props object to obtain vars
    const { item, cart ,setCart } = props;

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
            
            <div>
                <p>₹{item.price * item.count}</p>
                <button type="button" onClick={removeitem}><MdDeleteOutline></MdDeleteOutline></button>
            </div>
        </div>
    )
}