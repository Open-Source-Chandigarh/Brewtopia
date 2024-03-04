import "./styles/App.css";
import Product from "./components/product.js";
import { useState, useEffect, useContext } from "react";
import Cookies from "universal-cookie";
import { hotclassics, chillers, delights, sweettooth } from "./menuItems.js";
import AllOrders from "./components/allOrders.js";
import Cart from "./components/cart.js";
import ScrollToTop from "./components/scrolltoTop";
import { cartContext } from "./context/CartContext.js";

function App() {
    //importing cart and its functionality
    const { cart, setCart, total, setTotal } = useContext(cartContext);

    const [filterOpenState, setfilterOpenstate] = useState(false);

    //for search Items
    const [searchItemName, setSearchItemName] = useState("");
    const [searchedItems, setSearchedItems] = useState([]);

    //search items function
    // const searchFunction = () => {
    //   setSearchedItems([]);
    //   const allItems = [...hotclassics, ...chillers, ...delights, ...sweettooth];
    //   console.log(allItems);
    //   const searchItems = allItems.filter(
    //     (value) => searchItemName.toLowerCase() === value.name.toLowerCase()
    //   );
    //   setSearchedItems(searchItems);
    //   setSearchItemName("");
    // };

    //for Sort by price function

    // const sortByPrice = () => {
    //   setfilterOpenstate((prev) => !prev);

    //   const newArrHotClassics = [...hotclassicsItems];
    //   newArrHotClassics.sort((a, b) => a.price - b.price);
    //   setHotclassicsItems(newArrHotClassics);

    //   const newArrChillers = [...chillersItems];
    //   newArrChillers.sort((a, b) => a.price - b.price);
    //   setChillersItems(newArrChillers);

    //   const newArrDelights = [...delightsItems];
    //   newArrDelights.sort((a, b) => a.price - b.price);
    //   setDelightsItems(newArrDelights);

    //   const newArraySweettooth = [...sweettoothItems];
    //   newArraySweettooth.sort((a, b) => a.price - b.price);
    //   setSweettoothItems(newArraySweettooth);
    // };

    return (
        <div className="App">
            {/* Filter state management goes here */}

            {/* Search box*/}
            {/* <div className="search-bar">
        <input
          type="text"
          value={searchItemName}
          placeholder="Search Your Items"
          className="search-input"
          onChange={(e) => setSearchItemName(e.target.value)}
          onKeyDown={(e) => {
            if (e.code === "Enter") {
              searchFunction();
            }
          }}
        />
      </div> */}

            {/* Here we are mapping all the products in product1 grid -- it acts like wrap */}
            {/* then placing in product-container and mapping each category */}
            <main className="main">
                {/* Search Items */}

                {/* {searchedItems.length > 0 ? (
          <div className="search">
            <div className="product-container">
              {searchedItems.map((item, index) => {
                return (
                  <Product
                    key={index}
                    product={item}
                    searchedItems={searchedItems}
                  ></Product>
                );
              })}
            </div>
          </div>
        ) : ( */}
                <div>
                    <div id="product1">
                        <h2>HOT CLASSICS</h2>
                        <div className="product-container">
                            {hotclassics.map(
                                (
                                    classic,
                                    index = hotclassics.indexof(classic)
                                ) => {
                                    return (
                                        <Product
                                            key={index}
                                            product={classic}
                                        ></Product>
                                    );
                                }
                            )}
                        </div>
                    </div>
                    <div id="product2">
                        <h2>ALL TIME CHILLERS</h2>
                        <div className="product-container">
                            {chillers.map(
                                (
                                    classic,
                                    index = chillers.indexof(classic) * 2
                                ) => {
                                    return (
                                        <Product
                                            key={index}
                                            product={classic}
                                        ></Product>
                                    );
                                }
                            )}
                        </div>
                    </div>
                    <div id="product3">
                        <h2>ALL DAY DELIGHTS</h2>
                        <div className="product-container">
                            {delights.map(
                                (
                                    classic,
                                    index = delights.indexof(classic) * 3
                                ) => {
                                    return (
                                        <Product
                                            key={index}
                                            product={classic}
                                        ></Product>
                                    );
                                }
                            )}
                        </div>
                    </div>
                    <div id="product4">
                        <h2>SWEET TOOTH</h2>
                        <div className="product-container">
                            {sweettooth.map(
                                (
                                    classic,
                                    index = sweettooth.indexof(classic)
                                ) => {
                                    return (
                                        <Product
                                            key={index}
                                            product={classic}
                                        ></Product>
                                    );
                                }
                            )}
                        </div>
                    </div>
                </div>
                {/* )} */}
            </main>
            <ScrollToTop />
        </div>
    );
}

export default App;
