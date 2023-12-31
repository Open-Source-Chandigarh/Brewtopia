import {  useState , useEffect} from "react";
import "../styles/App.css";
import toast from "react-hot-toast";

export default function Product(props) {
  const { product, cartState, setCart, total, setTotal } = props;
  const [clicked, setclicked] = useState(false);
  const [counter, setcounter] = useState(1);

  //used to update total and cart items
  const cart =   () => {
    if (clicked === false) {
      setTotal(total + product.price * counter);
      setCart(cartState.concat({
          name: product.name,
          photo: product.image,
          quantity: product.quantity,
          price: product.price,
          count: counter,
        })
      );
      setclicked(true);

      toast.success("Added to cart");
    }
  };

  //on change in items of cart this function fires
  useEffect(() => {
    itemincart()? setclicked(true) : setclicked(false)
  },[cartState])
  
  //checking if item is already in cart to give button 
  //clicked or not clicked state
  function itemincart(){
    for(var i=0; i<cartState.length; i++){
        if(cartState[i].name == product.name){
          setcounter(cartState[i].count);
          return true
        };
        
    }
    return false;
  }

  return (
    <>
      <div className="product">
        <img src={product.image} alt={product.name} />
        <div className="product-details">
          <h3>{product.name}</h3>
          <p>{product.quantity}</p>
          <h4>{product.stars}</h4>
          <div className="range">
            <button
              type="button"
              onClick={() => {
                if (clicked || counter === 1) {
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
                if (clicked == false) {
                  setcounter(counter + 1);
                }
              }}
            >
              +
            </button>
          </div>
          <div className="pricing">
            <p>₹{product.price}/-</p>
            <button
              type="button"
              id="add"
              className={clicked? "clicked" : "notclicked"}
              onClick={() => cart()}
            >
              {clicked ? "Added ✔" : "Add +"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
