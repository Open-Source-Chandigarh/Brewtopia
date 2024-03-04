import { createContext, useState } from "react";

const initialValue = {
    isCollapsed: false,
    tab: "Dashboard",
};

const SidebarContext = createContext(initialValue);
const SidebarProvider = ({ children }) => {
    const [isCollapsed, setCollapse] = useState(false);
    const [tab, setTab] = useState("initialValue.tab");

    const toggleSidebarcollapse = () => {
        setCollapse((prevState) => !prevState);
    };
    const toggleTab = (name) => {
        setTab(name);
    };

    return (
        <SidebarContext.Provider
            value={{ isCollapsed, toggleSidebarcollapse, toggleTab, tab }}
        >
            {children}
        </SidebarContext.Provider>
    );
};

export { SidebarContext, SidebarProvider };
