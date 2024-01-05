import {  useState , useEffect} from "react";
import "../styles/App.css";
import toast from "react-hot-toast";

export default function Product(props) {
  const { product, cartState, setCart, total, setTotal, searchedItems } = props;
  const [clicked, setclicked] = useState(false);

  //used to update total and cart items
  const cart =   () => {
    if (clicked === false) {
      setTotal(total + product.price);
      setCart(cartState.concat({
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
    itemincart()? setclicked(true) : setclicked(false)
  },[cartState,searchedItems])
  
  //checking if item is already in cart to give button 
  //clicked or not clicked state
  function itemincart(){
    for(var i=0; i<cartState.length; i++){
        if(cartState[i].name === product.name){
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
