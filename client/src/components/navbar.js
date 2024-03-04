import { TiShoppingCart } from "react-icons/ti";
import { FiAlignJustify } from "react-icons/fi";
import { GoChecklist } from "react-icons/go";
import { showContext } from "../context/showCartOrders";
import { cartContext } from "../context/CartContext";
import { useContext , useState, useEffect} from "react";

export default function Navbar() {

  // getting context values
  const {setshowCart , setshowOrders} = useContext(showContext);
  const {totalItems} = useContext(cartContext)

  // hamburger for mobiles
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const menu = document.querySelector(".menu");
    if (showMenu) menu.classList.add("visible");
    else menu.classList.remove("visible");
  }, [showMenu]);

  return (
    <nav className="nav">
      <div>
        <a href="/">Brewtopia</a>
      </div>
      <div className="menu">
        <div>
          <a href="#product1">HOT CLASSICS</a>
        </div>
        <div>
          <a href="#product2">ALL TIME CHILLERS</a>
        </div>
        <div>
          <a href="#product3">ALL DAY DELIGHTS</a>
        </div>
        <div>
          <a href="#product4">SWEET TOOTH</a>
        </div>
      </div>

      <div className="flex">
        <div className="cartOrders">
          <button onClick={() => setshowCart(true)}>
            <TiShoppingCart size={20}></TiShoppingCart> Cart{" "}
            {totalItems ? <p className="total-items">{totalItems}</p> : ""}
          </button>

          <button onClick={() => setshowOrders(true)}>
            <GoChecklist size={20}></GoChecklist>Orders
          </button>
        </div>
        <div className="hamburgerMenu">
          <button onClick={() => setShowMenu(!showMenu)}>
            <FiAlignJustify size={20}></FiAlignJustify>
          </button>
        </div>
      </div>
    </nav>
  );
}
