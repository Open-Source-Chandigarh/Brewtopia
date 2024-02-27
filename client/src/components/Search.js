import React, { useContext, useState } from "react";
import { hotclassics, chillers, delights, sweettooth } from "../menu.js";
import Product from "./product.js";
import "../styles/search.css";
import { FilterContext } from "../context/FilterContext";

import { TiShoppingCart } from "react-icons/ti";
import { FiAlignJustify } from "react-icons/fi";
import { GoChecklist } from "react-icons/go";
import FilterSidebar from "./FilterSidebar.js";

const Search = () => {
  const { setFilterValuesState, values, pro } = useContext(FilterContext);
  const [filterOpenState, setfilterOpenstate] = useState(false);
  const [cart, setCart] = useState([]);

  //for search Items
  const [searchItemName, setSearchItemName] = useState("");
  const [searchedItems, setSearchedItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [showMenu, setShowMenu] = useState(false);

  //for components cart and orders to show
  const [showCart, setshowCart] = useState(false);
  const [showOrders, setshowOrders] = useState(false);
  const [totalItems, settotalItems] = useState();

  const allItems = [...hotclassics, ...chillers, ...delights, ...sweettooth];
  const minimumPrice = Math.min(...allItems.map((item) => Number(item.price)));
  const maximumPrice = Math.max(...allItems.map((item) => Number(item.price)));
  console.log(values.filteredProducts.length);
  return (
    <>
      <main className="__search_main_container">
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
        <section className="search__container">
          {/*Filter Sidebar starts*/}
          <div className="sidebarFilter">
            <FilterSidebar />
          </div>

          {/*Filter Sidebar ends */}
          <div className="search__products">
            {values.filteredProducts.length !== 0 ? (
              <div className="search_product-container">
                {values.filteredProducts.map((item, index) => {
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
                })}
              </div>
            ) : (
              <div className="no__product">No products found</div>
            )}
            {/* <div className="search_product-container">
            {
              values.filteredProducts.length !== 0 ? (
              values.filteredProducts.map(
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
                )
            ) : (
                <div className='no__product'>No products found</div>
            )             
            }
          </div> */}
          </div>
        </section>
      </main>
    </>
  );
};

export default Search;
