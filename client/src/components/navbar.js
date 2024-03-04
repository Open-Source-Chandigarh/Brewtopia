import { RiSearchLine } from "react-icons/ri";
import { RiShoppingCartLine } from "react-icons/ri";
import { FiAlignJustify } from "react-icons/fi";
import { RiFileList3Line } from "react-icons/ri";
import { GoChecklist } from "react-icons/go";
import { showContext } from "../context/showCartOrders";
import { cartContext } from "../context/CartContext";
import { useContext, useState, useEffect } from "react";

export default function Navbar() {
    // getting context values
    const { setshowCart, setshowOrders } = useContext(showContext);
    const { totalItems } = useContext(cartContext);

    // hamburger for mobiles
    const [showMenu, setShowMenu] = useState(false);

    return (
        <nav className="nav">
            <div>
                <a href="/">Brewtopia</a>
            </div>

            <div className="flex">
                <div className="cartOrders">
                    <div className="search">
                        <RiSearchLine size={25} style={{ padding: "2px" }} />
                        <input
                            type="search"
                            placeholder="Search"
                            style={{
                                marginLeft: "12px",
                                height: "25px",
                                background: "none",
                                border: "none",
                                outline: "none",
                                borderBottom: "1px solid",
                                letterSpacing: "1.5px",
                            }}
                        />
                    </div>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                        }}
                        onClick={() => setshowCart(true)}
                    >
                        <div
                            style={{
                                position: "relative",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <RiShoppingCartLine
                                size={25}
                                style={{ padding: "2px" }}
                            ></RiShoppingCartLine>
                            {totalItems ? (
                                <p className="total-items">{totalItems}</p>
                            ) : (
                                ""
                            )}
                        </div>
                        <label
                            style={{
                                marginLeft: "12px",
                                letterSpacing: "1.5px",
                                cursor: "pointer",
                                marginLeft: "12px",
                            }}
                        >
                            Cart
                        </label>
                    </div>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                        }}
                        onClick={() => setshowOrders(true)}
                    >
                        <RiFileList3Line size={20}></RiFileList3Line>
                        <label
                            style={{
                                marginLeft: "12px",
                                letterSpacing: "1.5px",
                                cursor: "pointer",
                                marginLeft: "12px",
                            }}
                        >
                            Orders
                        </label>
                    </div>
                </div>
                <div className="hamburgerMenu">
                    <div onClick={() => setShowMenu(!showMenu)}>
                        <FiAlignJustify size={20}></FiAlignJustify>
                    </div>
                </div>
            </div>
        </nav>
    );
}
