import "../styles/App.css";
import toast from "react-hot-toast";
import { useState, useEffect, useContext } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { cartContext } from "../context/CartContext";

export default function CartItem({ item }) {
    const [counter, setCounter] = useState(item.count || 1);
    const { cart, setCart, updateservercart } = useContext(cartContext);

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

    const removeItem = () => {
        const newCart = cart.filter((object) => object.name !== item.name);
        setCart(newCart);
        updateservercart(newCart);
        toast.error("Removed from cart");
    };

    return (
        <>
            <div
                style={{
                    position: "relative",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    border: "1px dashed #54290c",
                    height: "85px",
                    borderRadius: "10px",
                    width: "95%",
                    padding: "0px 20px 0px 20px",
                    marginBottom: "15px",
                    boxShadow: "rgba(0, 0, 0, 0.15) 6px 6px 10px 0px",
                }}
            >
                {/* <div
                    style={{
                        position: "absolute",
                        right: "-2px",
                        top: "-2px",
                    }}
                >
                    <button
                        onClick={() => removeItem()}
                        style={{
                            color: "red",
                            fontSize: "18px",
                            cursor: "pointer",
                            background: "none",
                            border: "none",
                            borderRadius: "50%",
                        }}
                    >
                        <AiOutlineCloseCircle></AiOutlineCloseCircle>
                    </button>
                </div> */}
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        height: "100%",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                width: "65px",
                                height: "65px",
                                // overflow: "hidden",
                            }}
                        >
                            <img
                                style={{
                                    objectFit: "cover",
                                    width: "65px",
                                    height: "auto",
                                }}
                                src={item.photo}
                                alt={`${item.name} thumbnail`}
                            />
                        </div>
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                paddingLeft: "12px",
                            }}
                        >
                            <h4
                                style={{
                                    fontSize: "15px",
                                    marginTop: "2%",
                                    // marginLeft: "-3%",
                                }}
                            >
                                {item.name}
                            </h4>
                            <p
                                style={{
                                    margin: "3% 0 0 0",
                                    fontWeight: "700",
                                    fontSize: "14px",
                                    color: "gray",
                                    // paddingLeft: "4px",
                                    // paddingTop: "5px",
                                }}
                            >
                                ₹ {item.price} x {counter}
                            </p>
                        </div>
                    </div>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "end",
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                            }}
                        >
                            <button
                                className="redbtn"
                                type="button"
                                onClick={() => {
                                    setCounter((prevCounter) => {
                                        const newCounter = Math.max(
                                            prevCounter - 1,
                                            1
                                        ); // Ensure the counter doesn't go below 1
                                        return newCounter;
                                    });
                                    if (counter === 1) {
                                        removeItem(); // Call removeItem() when counter becomes 1
                                    }
                                }}
                                style={{
                                    // marginTop: "20%",
                                    background: "#54290C",
                                    border: "1px solid #54290c",
                                    // borderStyle: "solid none solid solid",
                                    borderTopLeftRadius: "2px",
                                    borderBottomLeftRadius: "2px",
                                    fontWeight: "600",
                                    height: "25px",
                                    color: "#fff",
                                }}
                            >
                                -
                            </button>

                            <p
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontWeight: "400",
                                    border: "1px solid #54290c",
                                    borderStyle: "solid none",
                                    width: "30px",
                                }}
                            >
                                {counter}
                            </p>
                            <button
                                className="greenbtn"
                                type="button"
                                onClick={() =>
                                    setCounter((prevCounter) => prevCounter + 1)
                                }
                                style={{
                                    background: "#54290C",
                                    border: "1px solid #54290c",
                                    // borderStyle: "solid solid solid none",
                                    borderTopRightRadius: "2px",
                                    borderBottomRightRadius: "2px",
                                    fontWeight: "600",
                                    color: "white",
                                }}
                            >
                                +
                            </button>
                        </div>
                        {/* <p
                            style={{
                                margin: "3% 0 0 0",
                                fontWeight: "700",
                                fontSize: "14px",
                                // paddingLeft: "4px",
                                // paddingTop: "5px",
                            }}
                        >
                            ₹ {item.price * counter}
                        </p> */}
                    </div>
                </div>
            </div>
        </>
    );
}
