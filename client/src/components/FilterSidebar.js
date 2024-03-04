import "../styles/filterSidebar.css";
import React, { useContext, useEffect, useState } from "react";
import { hotclassics, chillers, delights, sweettooth } from "../menuItems.js";
import { FilterContext } from "../context/FilterContext";
import { IoSearchSharp } from "react-icons/io5";

const categories = ["Hot Classics", "All Time Chillers", "All Day Delights", "Sweet Tooth"];

const FilterSidebar = () => {
  const { setFilterValuesState, values } = useContext(FilterContext);
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);

  const allItems = [...hotclassics, ...chillers, ...delights, ...sweettooth];
  const minimumPrice = Math.min(...allItems.map((item) => Number(item.price)));
  const maximumPrice = Math.max(...allItems.map((item) => Number(item.price)));

  useEffect(() => {
    setFilterValuesState({
      ...values,
      minPrice: values.minPrice || minimumPrice,
      maxPrice: values.maxPrice || maximumPrice,
    });
  }, []);

  return (
    <div className="search__sidebar">
      <div className="filter__div">
        <span className="filter_Heading">Filter</span>
        <div className="search__input_div">
          <input
            type="text"
            name="searchTerm"
            className="search_filter__input"
            placeholder="Search"
            value={values.searchTerm}
            onChange={(e) =>
              setFilterValuesState({
                ...values,
                searchTerm: e.target.value,
              })
            }
          />
          <button className="search__input___btn">
            <IoSearchSharp style={{ fill: '#fff' }} size={20}/>
          </button>
        </div>
        <hr></hr>
        <div className="select_category">
          <span className="filter_Heading">Category</span>
          <div className="category__section">
            {" "}
            {categories.map((category) => (
              <span
                key={category}
                className="category"
                onClick={(e) =>
                  setFilterValuesState({
                    ...values,
                    category,
                  })
                }
              >
                {category}
              </span>
            ))}
          </div>
        </div>

        <hr></hr>
        <div className="price__range">
          <h6 className="filter_Heading">Price</h6>
          <div className="inputs">
            <input
              type="number"
              name="minPrice"
              className="price__input price__input--min"
              value={values.minPrice}
              min={minimumPrice}
              onChange={(e) =>
                setFilterValuesState({
                  ...values,
                  minPrice: e.target.value,
                })
              }
              placeholder="From"
            />
            <input
              type="number"
              className="price__input price__input--max"
              name="maxPrice"
              value={values.maxPrice}
              max={maximumPrice}
              onChange={(e) =>
                setFilterValuesState({
                  ...values,
                  maxPrice: e.target.value,
                })
              }
              placeholder="to"
            />
          </div>
          <div className="price__slider_container">
            <input
              type="range"
              id="points"
              name="maxPrice"
              min={minimumPrice}
              max={maximumPrice}
              onChange={(e) =>
                setFilterValuesState({
                  ...values,
                  maxPrice: e.target.value,
                })
              }
            />
          </div>
        </div>
        <hr></hr>
      </div>
    </div>
  );
};

export default FilterSidebar;
