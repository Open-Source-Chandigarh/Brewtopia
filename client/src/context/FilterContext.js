import { createContext, useState } from "react";
import { chillers, delights, hotclassics, sweettooth } from "../menuItems";

const allItems = [...hotclassics, ...chillers, ...delights, ...sweettooth];
const initialValue = {
  minPrice: Number,
  maxPrice: Number,
  sortOrder: String,
  searchTerm: "",
  category: "",
  filteredProducts: allItems,
};


const FilterContext = createContext(initialValue);

const FilterProvider = ({ children }) => {
  const [values, setValues] = useState(initialValue);

  const setFilterValuesState = (props) => {
    if (values.maxPrice && values.maxPrice !== 0) {
      const filteredProduct = allItems.filter(
        (items) => items.price <= props.maxPrice
      );
      if (props.sortOrder === "asc") {
        filteredProduct.sort((a, b) => {
          return a.price - b.price;
        });
        if (props.category !== "") {
          setValues({
            minPrice: props.minPrice,
            maxPrice: props.maxPrice,
            sortOrder: props.sortOrder,
            searchTerm: props.searchTerm,
            category: props.category,
            filteredProducts: filteredProduct.filter(
              (items) =>
                items.name
                  .toLowerCase()
                  .includes(props.searchTerm.toLowerCase()) &&
                items.category === props.category
            ),
          });
        } else {
          setValues({
            minPrice: props.minPrice,
            maxPrice: props.maxPrice,
            sortOrder: props.sortOrder,
            searchTerm: props.searchTerm,
            category: props.category,
            filteredProducts: filteredProduct.filter((items) =>
              items.name.toLowerCase().includes(props.searchTerm.toLowerCase())
            ),
          });
        }
      } else {
        filteredProduct.sort((a, b) => {
          return b.price - a.price;
        });
        if (props.category !== "") {
          setValues({
            minPrice: props.minPrice,
            maxPrice: props.maxPrice,
            sortOrder: props.sortOrder,
            searchTerm: props.searchTerm,
            category: props.category,
            filteredProducts: filteredProduct.filter(
              (items) =>
                items.name
                  .toLowerCase()
                  .includes(props.searchTerm.toLowerCase()) &&
                items.category === props.category
            ),
          });
        } else {
          setValues({
            minPrice: props.minPrice,
            maxPrice: props.maxPrice,
            sortOrder: props.sortOrder,
            searchTerm: props.searchTerm,
            category: props.category,
            filteredProducts: filteredProduct.filter((items) =>
              items.name.toLowerCase().includes(props.searchTerm.toLowerCase())
            ),
          });
        }
      }
    }
  };

  return (
    <FilterContext.Provider value={{ values, setFilterValuesState }}>
      {children}
    </FilterContext.Provider>
  );
};
export { FilterContext, FilterProvider };
