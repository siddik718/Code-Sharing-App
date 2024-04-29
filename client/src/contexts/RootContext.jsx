"use client";

import React from "react"
import PropTypes from "prop-types";

const RootContext = React.createContext();

export const RootProvider = ({ children }) => {

    const [key, setKey] = React.useState("");

    React.useEffect(() => {
        let token = localStorage.getItem('token');
        // console.log("Root Context Token: ", token);
        if (token) {
            setKey(token);
        }
    }, []);

    const value = {
        key,
        setKey
    };

    return (
        <RootContext.Provider value={value}>
            {children}
        </RootContext.Provider>
    )
}
RootProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default RootContext;
