import React, { useState, useEffect } from "react";
import Styles from "../styles/scrolltoTop.module.css";
import { AiOutlineUp } from "react-icons/ai";

const GoTop = () => {
    const [showButton, setShowButton] = useState(false);

    const handleScroll = () => {
        if (window.scrollY > 300) {
            setShowButton(true);
        } else {
            setShowButton(false);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };
    return (
        <div
            className={`${Styles.goTop} ${showButton ? "" : Styles.inactive}`}
            onClick={() => scrollToTop()}
        >
            <AiOutlineUp
                fill="white"
                style={{
                    background: "#54290C",
                    borderRadius: "50%",
                    padding: "10px",
                }}
                fontSize={40}
            />
        </div>
    );
};

export default GoTop;
