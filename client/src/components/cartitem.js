import "../styles/App.css";
import toast from "react-hot-toast";
import { useEffect, useContext, useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { cartContext } from "../context/CartContext";
import Quantity from "./quantity";

export default function CartItem({ item }) {
    const [counter, setCounter] = useState(item.count || 1);
    const { cart, setCart, updateservercart } = useContext(cartContext);

    return (
        <>
            <div
                style={{
                    position: "relative",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    border: "1px dashed var(--border-color)",
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
                        <Quantity
                            counter={counter}
                            item={item}
                            setCounter={setCounter}
                        />
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
