import Footer from "./footer";
import Navbar from "./navbar";
// import FilterSidebar from "./FilterSidebar";
import ShowProvider from "../context/showCartOrders";
import CartProvider from "../context/CartContext";
import { showContext } from "../context/showCartOrders";
import { useContext } from "react";
import AllOrders from "./allOrders";
import Cart from "./cart";

export default function Layout({ children }) {
    const { showCart, showOrders } = useContext(showContext);

    return (
        <>
            <CartProvider>
                {/* Showing all orders as popup */}
                {showOrders && <AllOrders />}

                {/* showing cart items as popup */}
                {showCart && <Cart />}

                <Navbar />
                <div className="LayoutWrap">
                    {/* <div className="filtersidebar">
                        <FilterSidebar />
                    </div> */}
                    <div style={{ margin: "0 auto" }}>{children}</div>
                </div>
                <Footer />
            </CartProvider>
        </>
    );
}
