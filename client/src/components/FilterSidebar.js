import "../styles/filterSidebar.css";
import React, { useContext, useEffect, useState } from "react";
import { hotclassics, chillers, delights, sweettooth } from "../menu.js";
import { FilterContext } from "../context/FilterContext";

const StarRating = () => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);

  const handleStarHover = (hoveredStar) => {
    setHoveredRating(hoveredStar);
  };

  const handleStarClick = (clickedStar) => {
    setRating(clickedStar);
  };

  const resetHoveredRating = () => {
    setHoveredRating(0);
  };

  return (
    <div className="star-rating">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`star ${
            star <= (hoveredRating || rating) ? "filled" : ""
          }`}
          onMouseEnter={() => handleStarHover(star)}
          onMouseLeave={resetHoveredRating}
          onClick={() => handleStarClick(star)}
        >
          ★
        </span>
      ))}
    </div>
  );
};

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
    <div className="wholeBody">
      <div className="nav"></div>
      <div className="search__sidebar">
        <div className="filter__div">
          <div className="search__input">
            <input
              type="text"
              name="searchTerm"
              className="search_filter__input"
              placeholder="search"
              value={values.searchTerm}
              onChange={(e) =>
                setFilterValuesState({
                  ...values,
                  searchTerm: e.target.value,
                })
              }
            />
            <div className="sort__search">
              <button
                onClick={() =>
                  setFilterValuesState({
                    ...values,
                    sortOrder: "desc",
                  })
                }
                className={
                  values.sortOrder === "desc" ? "activeSortBtn" : "notActiveBTN"
                }
              >
                High To Low
              </button>

              <button
                onClick={() =>
                  setFilterValuesState({
                    ...values,
                    sortOrder: "asc",
                  })
                }
                className={
                  values.sortOrder === "asc" ? "activeSortBtn" : "notActiveBTN"
                }
              >
                Low To High
              </button>
            </div>
          </div>
          <select
            name="category"
            className="select_category"
            defaultValue={""}
            value={values.category}
            onChange={(e) =>
              setFilterValuesState({
                ...values,
                category: e.target.value,
              })
            }
          >
            <option value={""}>Category</option>
            <option value={"chillers"}>Chillers</option>
            <option value={"delights"}>Delights</option>
            <option value={"sweet_tooth"}>Sweet tooth</option>
            <option value={"hot_classics"}>Hot Classics</option>
          </select>

          <div className="price__range">
            <h6 className="price__label">Price</h6>
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
            ></input>
          </div>
          <div className="ratings__filter">
            <h6 className="Rating__label">Rating</h6>
            <StarRating />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
