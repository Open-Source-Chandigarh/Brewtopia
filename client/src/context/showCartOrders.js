import { createContext } from "react";
import { useState, useEffect } from "react";

// context for showing cart or orders popup screens
export const showContext = createContext();

export default function ShowProvider({ children }) {

    const [showCart, setshowCart] = useState(false);
    const [showOrders, setshowOrders] = useState(false);

    //setting overflow:hidden when Popups are showing
    useEffect(() => {
        const body = document.querySelector("body");
        // Set the overflow style based on the state variables
        body.style.overflow = showCart || showOrders ? "hidden" : "auto";
    }, [showCart, showOrders]);

    return (
        <showContext.Provider value={{ showCart, setshowCart, showOrders, setshowOrders }}>
        {children}
        </showContext.Provider>
    );
}
