import React from "react";

const MODAL_WRAPPER = {
    position: "fixed",
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgb(0,0,0,0.5)",
    zIndex: 1000,
    top: "0",
    backdropFilter: "brightness(0.5) blur(0.5px)",
};

const MODAL_STYLES = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "5px",
};

export default function Modal({ open, children, onClose }) {
    if (!open) return null;

    return (
        <div style={MODAL_WRAPPER}>
            <div style={MODAL_STYLES}>{children}</div>
        </div>
    );
}
