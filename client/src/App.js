import "./styles/App.css";
import Product from "./components/product.js";
import { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import { TiShoppingCart } from "react-icons/ti";
import Axios from "axios";
import { GoChecklist } from "react-icons/go";
import { FaGithub } from "react-icons/fa";
import { IoLogoLinkedin ,IoLogOut} from "react-icons/io5";
import { FaTwitterSquare } from "react-icons/fa";
import { hotclassics, chillers, delights, sweettooth } from "./menu.js";
import AllOrders from "./components/allOrders.js";
import Cart from "./components/cart.js";

function App() {
  //for user profile
  const [name, setName] = useState("");
  const [username, setuserName] = useState("");

  //for cart added items track
  const [total, setTotal] = useState(0);
  const [cart, setCart] = useState([]);

  //for components cart and orders to show
  const [showCart, setshowCart] = useState(false);
  const [showOrders, setshowOrders] = useState(false);
  const [totalItems, settotalItems] = useState();

  const cookies = new Cookies();
  
  const handleLogout =()=>{
    cookies.remove("username");
    cookies.remove("name");

    window.location.reload();

  }

  //setting overflow:hidden when Popups are showing
  useEffect(() => {
    const body = document.querySelector("body");
    // Set the overflow style based on the state variables
    body.style.overflow = showCart || showOrders ? "hidden" : "auto";
  }, [showCart, showOrders]);

  //making request to server for the data of user cart  and orders
  useEffect(() => {
    //setting username and name from cookies
    setuserName(cookies.get("username"));
    setName(cookies.get("name"));

    //request to server for cart
    const servercart = async () => {
      const cart = await Axios.post(
        "https://brewtopia.up.railway.app/getCart",
        {
          username: username,
        }
      );
      setCart(cart.data);
    };
    servercart();
  }, [username]);

  //updating server cart and also updating total on server side
  useEffect(() => {
    let total = 0;
    cart.forEach((item) => {
      total += item.price * item.count;
    });

    setTotal(total);
    settotalItems(cart.length);

    //posting server with updated cart
    Axios.post("https://brewtopia.up.railway.app/updateCart", {
      username: username,
      cart: cart,
      cartTotal: total,
    });
  }, [cart]); //whenever cart changes these requests will be made to server

  return (
    <div className="App">
      {/* Navbar of app */}
      <nav className="nav">
        <a href="/">Brewtopia</a>
        <div className="menu">
          <a href="#product1">HOT CLASSICS</a>
          <a href="#product2">ALL TIME CHILLERS</a>
          <a href="#product3">ALL DAY DELIGHTS</a>
          <a href="#product4">SWEET TOOTH</a>
        </div>
        <button onClick={() => setshowCart(true)}><TiShoppingCart size={20}></TiShoppingCart> Cart {totalItems ? <p className="total-items">{totalItems}</p> : ""}</button>
        <button onClick={() => setshowOrders(true)}><GoChecklist size={20}></GoChecklist>Orders</button>
        <button onClick={() => handleLogout()}> <IoLogOut size={20} />LogOut</button>
      </nav>

      {/* Showing all orders as popup */}
      {showOrders && (
        <AllOrders username={username} setshowOrders={setshowOrders} />
      )}

      {/* showing cart items as popup */}
      {showCart && (
        <Cart
          name={name}
          username={username}
          setshowCart={setshowCart}
          cookies={cookies}
          cart={cart}
          total={total}
          setCart={setCart}
        />
      )}

      {/* Here we are mapping all the products in product1 grid -- it acts like wrap */}
      {/* then placing in product-container and mapping each category */}
      <main className="main">
        <div id="product1">
          <h2>HOT CLASSICS</h2>
          <div className="product-container">
            {hotclassics.map(
              (classic, index = hotclassics.indexof(classic)) => {
                return (
                  <Product
                    key={index}
                    product={classic}
                    cartState={cart}
                    setCart={setCart}
                    total={total}
                    setTotal={setTotal}
                  ></Product>
                );
              }
            )}
          </div>
        </div>
        <div id="product2">
          <h2>ALL TIME CHILLERS</h2>
          <div className="product-container">
            {chillers.map((classic, index = chillers.indexof(classic) * 2) => {
              return (
                <Product
                  key={index}
                  product={classic}
                  cartState={cart}
                  setCart={setCart}
                  total={total}
                  setTotal={setTotal}
                ></Product>
              );
            })}
          </div>
        </div>
        <div id="product3">
          <h2>ALL DAY DELIGHTS</h2>
          <div className="product-container">
            {delights.map((classic, index = delights.indexof(classic) * 3) => {
              return (
                <Product
                  key={index}
                  product={classic}
                  cartState={cart}
                  setCart={setCart}
                  total={total}
                  setTotal={setTotal}
                ></Product>
              );
            })}
          </div>
        </div>
        <div id="product4">
          <h2>SWEET TOOTH</h2>
          <div className="product-container">
            {sweettooth.map((classic, index = sweettooth.indexof(classic)) => {
              return (
                <Product
                  key={index}
                  product={classic}
                  cartState={cart}
                  setCart={setCart}
                  total={total}
                  setTotal={setTotal}
                ></Product>
              );
            })}
          </div>
        </div>
      </main>

      {/* footer starts here */}
      <footer className="footer">
        <div className="col-1">
          <p>
            Brewtopia is a cozy and inviting cafe that offers a wide range of
            delicious coffee and tea beverages, as well as tasty snacks and
            treats. Our welcoming atmosphere and friendly staff make Brewtopia
            the perfect place to relax. Our menu features a variety of specialty
            drinks, including our signature lattes and cold brews, made with
            only the highest quality ingredients.
            <br />
          </p>
        </div>

        {/* for navigation */}
        <div className="col-2">
          <div class="socials">
            <a href="">
              <FaGithub size={23} />
            </a>
            <a href="">
              <IoLogoLinkedin size={25} />
            </a>
            <a href="">
              <FaTwitterSquare size={25} />
            </a>
          </div>
          <a href="">Cafe Policy</a>
          <span>© 2023 Published by Brewtopia cafe</span>
        </div>
      </footer>
    </div>
  );
}

export default App;
