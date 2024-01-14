import "./styles/App.css";
import Product from "./components/product.js";
import { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import { TiShoppingCart } from "react-icons/ti";
import { FiAlignJustify } from "react-icons/fi";
import Axios from "axios";
import { GoChecklist } from "react-icons/go";
import { hotclassics, chillers, delights, sweettooth } from "./menu.js";
import AllOrders from "./components/allOrders.js";
import Cart from "./components/cart.js";
import ScrollToTop from "./components/scrolltoTop";
import Footer from "./components/footer.js";

const apiUrl = process.env.REACT_APP_API_URL;

function App() {
  //for user profile
  const [name, setName] = useState("");
  const [username, setuserName] = useState("");

  //for storing items
  const[hotclassicsItems,setHotclassicsItems] = useState(hotclassics)
  const[chillersItems,setChillersItems] = useState(chillers)
  const[delightsItems,setDelightsItems] = useState(delights)
  const[sweettoothItems,setSweettoothItems] = useState(sweettooth)

  //for cart added items track
  const [total, setTotal] = useState(0);
  const [cart, setCart] = useState([]);

  //for search Items
  const[searchItemName,setSearchItemName] = useState("")
  const[searchedItems,setSearchedItems] = useState([])

  //for components cart and orders to show
  const [showCart, setshowCart] = useState(false);
  const [showOrders, setshowOrders] = useState(false);
  const [totalItems, settotalItems] = useState();

  // Hamburger Menu
  const [showMenu, setShowMenu] = useState(false);

  const cookies = new Cookies();

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
        apiUrl + "/getCart",
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
    Axios.post(apiUrl + "/updateCart", {
      username: username,
      cart: cart,
      cartTotal: total,
    });
  }, [cart]); //whenever cart changes these requests will be made to server

  // update menu state on hamburger click
  useEffect(() => {
    const menu = document.querySelector(".menu");
    if(showMenu)
      menu.classList.add("visible");
    else
      menu.classList.remove("visible");

  }, [showMenu])

  //search items function
  const searchFunction = () =>{
    setSearchedItems([])
    const allItems = [...hotclassics, ...chillers, ...delights, ...sweettooth ]

    const searchItems = allItems.filter(
      (value) => searchItemName.toLowerCase() === value.name.toLowerCase()
    )
    setSearchedItems(searchItems)
    setSearchItemName("")
  }
  
  //for Sort by price function

  const sortByPrice = () =>{
    const newArrHotClassics =  [...hotclassicsItems]
    newArrHotClassics.sort((a,b) => a.price - b.price)
    setHotclassicsItems(newArrHotClassics)

    const newArrChillers = [...chillersItems]
    newArrChillers.sort((a,b) => a.price - b.price)
    setChillersItems(newArrChillers)

    const newArrDelights = [...delightsItems]
    newArrDelights.sort((a,b) => a.price - b.price)
    setDelightsItems(newArrDelights)

    const newArraySweettooth = [...sweettoothItems]
    newArraySweettooth.sort((a,b) => a.price - b.price)
    setSweettoothItems(newArraySweettooth)

  }
  
  return (
    <div className="App">
      {/* Navbar of app */}
      <nav className="nav">
        <div>
          <a href="/">Brewtopia</a>
        </div>
        <div className="menu">
          <div><a href="#product1">HOT CLASSICS</a></div>
          <div><a href="#product2">ALL TIME CHILLERS</a></div>
          <div><a href="#product3">ALL DAY DELIGHTS</a></div>
          <div><a href="#product4">SWEET TOOTH</a></div>
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
              <FiAlignJustify size={20} ></FiAlignJustify>
            </button>
          </div>
        </div>
        
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
        
       {/* Search box*/}
       <div className="search-bar">
        <div className="search-box">
          <input type="text" value={searchItemName} placeholder="Search Your Items"  className="search-input" 
          onChange={(e) => setSearchItemName(e.target.value)}
          /> 
          <button onClick={searchFunction} className="search-btn">Search</button>
        </div>
       
        <div>
          <button onClick={sortByPrice} className="sort-btn">Sort By Price</button>
        </div>
        
       </div>

      {/* Here we are mapping all the products in product1 grid -- it acts like wrap */}
      {/* then placing in product-container and mapping each category */}
      <main className="main">
        {/* Search Items */}

        {
          searchedItems.length >0
           ?
          <div className="search">
            <div className="product-container">
            {searchedItems.map(
              (item, index) => {
                return (
                  <Product
                    key={index}
                    product={item}
                    cartState={cart}
                    setCart={setCart}
                    total={total}
                    setTotal={setTotal}
                    searchedItems={searchedItems}
                  ></Product>
                );
              }
            )}
          </div>
          </div>
          :
          <div>
          <div id="product1">
          <h2>HOT CLASSICS</h2>
          <div className="product-container">
            {hotclassicsItems.map(
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
            {chillersItems.map((classic, index = chillers.indexof(classic) * 2) => {
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
            {delightsItems.map((classic, index = delights.indexof(classic) * 3) => {
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
            {sweettoothItems.map((classic, index = sweettooth.indexof(classic)) => {
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
          </div>
        }
      </main>
      <ScrollToTop/>
      <Footer/>
    </div>
  );
}

export default App;
