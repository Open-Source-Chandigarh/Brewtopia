import { cartContext } from "../context/CartContext";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import { createPortal } from "react-dom";
import Modal from "./Modal";
import "../styles/quantity.css";

export default function Quantity({ counter, setCounter, item }) {
    const { cart, setCart, updateservercart } = useContext(cartContext);
    const [showDel, setshowDel] = useState(false);
    const [confirmed, setConfirmed] = useState(false);

    const body = document.querySelector("body");

    if (showDel) {
        body.style.overflow = "hidden";
    } else {
        body.style.overflow = "auto";
    }

    const removeItem = async () => {
        const newCart = cart.filter((object) => object.name !== item.name);
        await setCart(newCart);
        await updateservercart(newCart);
        toast.error("Removed from cart");
    };

    useEffect(() => {
        // Update the count in the parent cart state
        const currentCart = cart; // Access current cart value
        // Create a new cart with updated count
        const newCart = currentCart.map((object) =>
            object.name === item.name ? { ...object, count: counter } : object
        );

        setCart(newCart);
        updateservercart(newCart);
    }, [counter, item.name, setCart]);

    return (
        <>
            <div
                style={{
                    display: "flex",
                }}
            >
                <div>
                    <button
                        className="redbtn"
                        type="button"
                        onClick={() => {
                            setCounter((prevCounter) => {
                                const newCounter = Math.max(prevCounter - 1, 1); // Ensure the counter doesn't go below 1

                                return newCounter;
                            });
                            if (counter === 1) {
                                setshowDel(true);
                            }
                        }}
                        style={{
                            // marginTop: "20%",
                            background: "var(--background-color)",
                            border: "1px solid var(--border-color)",
                            // borderStyle: "solid none solid solid",
                            borderTopLeftRadius: "2px",
                            borderBottomLeftRadius: "2px",
                            fontWeight: "600",
                            height: "25px",
                            color: "var(--text-color)",
                        }}
                    >
                        {counter === 1 ? <RiDeleteBinLine /> : "-"}
                    </button>
                </div>

                <p
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: "400",
                        border: "1px solid var(--border-color)",
                        borderStyle: "solid none",
                        width: "30px",
                        color: "var(--text-color)",
                    }}
                >
                    {counter}
                </p>
                <button
                    className="greenbtn"
                    type="button"
                    onClick={() => {
                        setCounter((prevCounter) => prevCounter + 1);
                    }}
                    style={{
                        background: "var(--background-color)",
                        border: "1px solid var(--border-color)",
                        // borderStyle: "solid solid solid none",
                        borderTopRightRadius: "2px",
                        borderBottomRightRadius: "2px",
                        fontWeight: "600",
                        color: "var(--text-color)",
                    }}
                >
                    +
                </button>
            </div>
            {showDel &&
                createPortal(
                    <Modal open={showDel}>
                        <div>
                            <p>
                                Are you sure you want to remove this item from
                                cart?
                            </p>
                            <div className="yesno">
                                <button
                                    onClick={() => setshowDel(false)}
                                    className="no"
                                >
                                    No
                                </button>
                                <button
                                    onClick={() => {
                                        removeItem();
                                        setshowDel(false);
                                    }}
                                    className="yes"
                                >
                                    Yes
                                </button>
                            </div>
                        </div>
                    </Modal>,
                    document.body
                )}
        </>
    );
}
