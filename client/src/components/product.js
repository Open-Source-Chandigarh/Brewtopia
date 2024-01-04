import { useState, useEffect } from "react";
import "../styles/App.css";
import toast from "react-hot-toast";

export default function Product(props) {
  const { product, cartState, setCart, total, setTotal } = props;
  const [clicked, setclicked] = useState(false);

  //used to update total and cart items
  const cart = () => {
    if (clicked === false) {
      setTotal(total + product.price);
      setCart(
        cartState.concat({
          name: product.name,
          photo: product.image,
          quantity: product.quantity,
          price: product.price,
        })
      );
      setclicked(true);

      toast.success("Added to cart");
    }
  };

  //on change in items of cart this function fires
  useEffect(() => {
    itemincart() ? setclicked(true) : setclicked(false);
  }, [cartState]);

  //checking if item is already in cart to give button
  //clicked or not clicked state
  function itemincart() {
    for (var i = 0; i < cartState.length; i++) {
      if (cartState[i].name === product.name) {
        return true;
      }
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
                onClick={() => cart()}
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
