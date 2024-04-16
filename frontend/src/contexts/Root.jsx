
import React from "react"
import PropTypes from "prop-types";
import { jwtDecode } from "jwt-decode";

const RootContext = React.createContext();

export const RootProvider = ({ children }) => {

    const [username, setUsername] = React.useState("");
    const [id, setId] = React.useState(0);

    React.useEffect(() => {
        const token = sessionStorage.getItem('access');
        if (token) {
            const data = jwtDecode(token);
            if (data) {
                setUsername(data.username);
                setId(data.id);
            }
        }
    }, []);

    const value = {
        username,
        id,
        setUsername,
        setId,
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
