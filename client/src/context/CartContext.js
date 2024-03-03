import { createContext, useContext, useEffect } from "react";
import { useState } from "react";
import Axios from "axios";
import { loginContext } from "./LoginContext";

//All cart related operations take place here
// Updating , deleting , server side loading

export const cartContext = createContext();

const apiUrl = process.env.REACT_APP_API_URL;

export default function CartProvider({ children }) {
    //for cart added items track
    const [total, setTotal] = useState(0);
    const [cart, setCart] = useState([]);
    const [totalItems, settotalItems] = useState();
    const { email } = useContext(loginContext);

    const updateTotal = (cart, totalitem) => {
        let total = 0;
        cart?.forEach((item) => {
            total += parseInt(item.price) * parseInt(item.count);
        });
        setTotal(parseInt(total));
        settotalItems(totalitem);
    };

    const updateservercart = async (newCart) => {
        updateTotal(newCart, newCart.length);

        //posting server with updated cart
        await Axios.post(apiUrl + "/updateCart", {
            username: email,
            cart: newCart,
            cartTotal: total,
        });
    };

    //updating server cart and also updating total on server side
    // useEffect(() => {

    // }, [cart , total, email]); //whenever cart changes these requests will be made to server

    useEffect(() => {
        //request to server for cart
        const servercart = async () => {
            const cart = await Axios.post(apiUrl + "/getCart", {
                username: email,
            });
            setCart(cart.data);
            updateTotal(cart.data, cart.data.length);
        };
        servercart();
    }, [email]);

    return (
        <cartContext.Provider
            value={{
                cart,
                setCart,
                total,
                setTotal,
                totalItems,
                updateservercart,
            }}
        >
            {children}
        </cartContext.Provider>
    );
}
