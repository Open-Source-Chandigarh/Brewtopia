import { useState, useEffect, useContext } from "react";
import "../styles/App.css";
import toast from "react-hot-toast";
import { cartContext } from "../context/CartContext";

export default function Product({ product, searchedItems }) {
  const [clicked, setclicked] = useState(false);

  const {cart , setCart , total , setTotal, updateservercart} = useContext(cartContext);


  //used to update total and cart items
  const cartUpdate = async() => {
    if (clicked === false) {
      const newTotal = parseInt(total) + parseInt(product.price);
      const newCart = cart.concat({
          name: product.name,
          photo: product.image,
          quantity: product.quantity,
          price: product.price,
          count : product.count
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
    itemincart()? setclicked(true) : setclicked(false)
  },[cart,searchedItems])
  
  //checking if item is already in cart to give button 
  //clicked or not clicked state
  function itemincart(){
    for(var i=0; i<cart.length; i++){
        if(cart[i].name === product.name){
          return true
        };
    }
    return false;
  }

  return (
    <>
      <div className="product-card">
        <div className="product">
          <h3>{product.name}</h3>
          <h4>{product.stars}</h4>
          <div className="product-details">
            <p>{product.quantity}</p>

            <div className="pricing">
              <p>₹{product.price}/-</p>
              <button
                type="button"
                id="add"
                className={clicked ? "clicked" : "notclicked"}
                onClick={() => cartUpdate()}
              >
                {clicked ? "Added ✔" : "Add +"}
              </button>
            </div>
          </div>
        </div>

        <div className="product-image">
          <img src={product.image} alt={product.name} />
          <div className="parallelogram"></div>
        </div>
      </div>
    </>
  );
}
