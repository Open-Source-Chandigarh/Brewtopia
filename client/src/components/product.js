import { useState, useEffect, useContext } from "react";
import "../styles/App.css";
import toast from "react-hot-toast";
import { cartContext } from "../context/CartContext";
import Quantity from "./quantity";
import { createContext } from "react";

export default function Product({ product, searchedItems }) {
    const [clicked, setclicked] = useState(false);

    const {
        cart,
        setCart,
        total,
        setTotal,
        updateservercart,
    } = useContext(cartContext);

    const [counter, setCounter] = useState(1);

    //used to update total and cart items
    const cartUpdate = async () => {
        if (clicked === false) {
            const newTotal = parseInt(total) + parseInt(product.price);
            const newCart = cart.concat({
                name: product.name,
                photo: product.image,
                quantity: product.quantity,
                price: product.price,
                count: product.count,
            });

            // Update the state using promises for reliable ordering
            await Promise.all([setTotal(newTotal), setCart(newCart)]);

            await updateservercart(newCart);
            setclicked(true);
            toast.success("Added to cart");
        }
    };

    //on change in items of cart this function fires
    useEffect(() => {
        itemincart() ? setclicked(true) : setclicked(false);
    }, [cart, searchedItems]);

    //checking if item is already in cart to give button
    //clicked or not clicked state
    function itemincart() {
        for (var i = 0; i < cart.length; i++) {
            if (cart[i].name === product.name) {
                if (cart[i].count) {
                    setCounter(cart[i].count);
                }
                return true;
            }
        }
        return false;
    }

    return (
        <>
            <div className="product-card">
                <div className="product-image">
                    <img src={product.image} alt={product.name} />
                    {/* <div className="parallelogram"></div> */}
                </div>
                <div className="product-main">
                    <div className="product">
                        <div>
                            <h3>{product.name}</h3>
                        </div>
                        <div className="product-details">
                            <h4>{product.stars}</h4>
                            <p>{product.quantity}</p>
                        </div>
                        <div className="pricing">
                            <p>₹{product.price}/-</p>
                            {clicked ? (
                                <Quantity
                                    counter={counter}
                                    setCounter={setCounter}
                                    item={product}
                                />
                            ) : (
                                <button
                                    type="button"
                                    id="add"
                                    className={
                                        clicked ? "clicked" : "notclicked"
                                    }
                                    onClick={() => {
                                        cartUpdate();
                                    }}
                                >
                                    Add +
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
