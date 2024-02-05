import React, { useContext, useState } from 'react'
import { hotclassics, chillers, delights, sweettooth } from "../menu.js";
import Product from './product.js'
import '../styles/search.css'
import { FilterContext } from '../context/FilterContext';

import { TiShoppingCart } from "react-icons/ti";
import { FiAlignJustify } from "react-icons/fi";
import { GoChecklist } from "react-icons/go";

const Search = () => {
  const {setFilterValuesState, values , pro} = useContext(FilterContext);
  const [filterOpenState, setfilterOpenstate] = useState(false);
  const [cart, setCart] = useState([]);

  //for search Items
  const [searchItemName, setSearchItemName] = useState("")
  const [searchedItems, setSearchedItems] = useState([])
  const [total, setTotal] = useState(0);
  const [showMenu, setShowMenu] = useState(false);



  //for components cart and orders to show
  const [showCart, setshowCart] = useState(false);
  const [showOrders, setshowOrders] = useState(false);
  const [totalItems, settotalItems] = useState();


    const allItems = [...hotclassics, ...chillers, ...delights, ...sweettooth]
    const minimumPrice = Math.min(...allItems.map(item => Number(item.price)))
    const maximumPrice = Math.max(...allItems.map(item => Number(item.price)));
  console.log(values.filteredProducts.length)
  return (
    <>
    <main className='__search_main_container'>
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
    <section className='search__container'>
      
        
        <div className='search__sidebar'>
        <div className="filter__div">
          <div className={`active_filter__menu`}>
            <input type="text" 
            className="search_filter__input"
            placeholder="search"  
            value={values.searchTerm} 
            onChange={(e) => setFilterValuesState({...values, searchTerm: e.target.value})} 
            
            />
            <div className='input_price'>
              <label htmlFor="price">
              Price: {values.maxPrice === Number ? maximumPrice : values.maxPrice}
            </label>
        <input name="price" type="range" min={minimumPrice} max={maximumPrice} defaultValue={maximumPrice} onChange={(e)=> setFilterValuesState({
            ...values,
            minPrice:0,
            maxPrice:e.target.value,
          })} />
            </div>
            
            
          <div className='sort_btn'>
            <button onClick={()=> setFilterValuesState({
            ...values,
          sortOrder: 'desc'
          })}
          className={values.sortOrder === 'desc' ? 'activeSortBtn': 'notActiveBTN'}
          >
          high to low
          </button>

          <button onClick={()=> setFilterValuesState({
          ...values,
          sortOrder: 'asc'
          })}
          className={values.sortOrder === 'asc' ? 'activeSortBtn': 'notActiveBTN'}
          >
          low to high
          </button>
          </div>


            <div className='select_div'>
            <select
            
              className='sort_select'
              onChange={(e)=> setFilterValuesState({
              ...values,
              sortOrder: e.target.value
              })}
            >
              <option value={'asc'}>
                low to high
              </option>
              <option value={'desc'}>
                high to low
              </option>
            </select>
          
            <select
              className='select_category' 
              defaultValue={''}
              onChange={(e)=> setFilterValuesState({
              ...values,
              category: e.target.value
              })}
            >
              <option value={''}>
                Category
              </option>
              <option value={'chillers'}>
                Chillers
              </option>
              <option value={'delights'}>
                Delights
              </option>
              <option value={'sweet_tooth'}>
                Sweet tooth
              </option>
              <option value={'hot_classics'}>
                Hot Classics
              </option>
            </select>
            </div>

          </div>
      </div>
        </div>
              <div className='search__products'>
            {
                 values.filteredProducts.length !== 0 ? (
                    <div className="search_product-container">
                    {
                   
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
                    }
          </div>
                 ) : (
                    <div className='no__product'>No products found</div>
                 )       
            }          
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
    
  )
}

export default Search
