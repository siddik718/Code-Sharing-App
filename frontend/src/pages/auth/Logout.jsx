import { useNavigate } from 'react-router-dom';
import RootContext from '../../contexts/Root';
import { useContext } from 'react';

const Logout = () => {

    const navigate = useNavigate();
    const { setUsername, setId } = useContext(RootContext);

    const handleClick = async () => {
        const url = import.meta.env.VITE_API + "users/logout/";
        const response = await fetch(url, {
            credentials: "include",
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (response.ok) {
            sessionStorage.removeItem('access');
            setUsername("");
            setId(0);
            navigate('/');
        } else {
            alert("Ann Error Occured");
        }
    }

    return (
        <div>
            <button onClick={handleClick}>Are You Sure </button>
        </div>
    )
}

export default Logout;