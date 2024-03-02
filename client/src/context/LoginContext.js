import { createContext } from "react";
import Cookies from "universal-cookie";
import { useState  , useEffect} from "react";
import { useMemo } from "react";

export const loginContext = createContext();

const apiUrl = process.env.REACT_APP_API_URL;

export default function LoginProvider({children}){

    //for user profile
    const [name, setName] = useState("");
    const [email, setemail] = useState("");

    const cookies = new Cookies();

    useMemo(() => {
      //setting email and name from cookies
      setemail(cookies.get("username"));
      setName(cookies.get("name"));
    }, []);  

    return(
        <loginContext.Provider value={{email , name}}>
            {children}
        </loginContext.Provider>
    )
}