import React, { useState, useEffect, useMemo } from "react";
import { API_URL } from "./services/constants";
// import { useCookies } from "react-cookie";
export const Context = React.createContext();

export const ContextStore = ({ children }) => {
  let initialValue = null;
  // const [cookies, setCookie, removeCookie] = useCookies(["USER_SESSION"]);
  const [userData, setUserData] = useState(initialValue);

  useEffect(() => {
    // if (cookies.USER_SESSION) {
    fetch(`${API_URL}/auth/getUser`, { credentials: "include" })
      .then((res) => res.json())
      .then((res) => {
        return setUserData(res.user);
      });
    // }
  }, []);

  // console.log(userData)
  const providerValue = useMemo(() => ({ userData, setUserData }), [userData, setUserData]);

  return <Context.Provider value={providerValue}>{children}</Context.Provider>;
};
