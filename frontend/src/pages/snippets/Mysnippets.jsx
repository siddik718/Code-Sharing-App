import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

const Mysnippets = () => {

    const [snippets, setSnippets] = useState([]);

    useEffect(() => {

        const fetchData = async () => {
            const url = import.meta.env.VITE_API + "snippets/";
            const response = await fetch(url, {
                credentials: "include",
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (response.ok) {
                const data = await response.json();
                setSnippets(data)
            } else {
                alert('Network Err');
            }
        }
        fetchData();
    }, []);

    const navigate = useNavigate();
    const handleClick = (address) => {
        navigate('/'+address);
    }

    return (
        <div>
            <div>
                <p>My Snippets</p>
            </div>
            <div>
                {snippets && snippets.map(snippet => (
                    <div key={snippet.id} style={{
                        border: "1px solid red",
                        margin: "5px 0",
                        padding: "5px"
                    }}>
                        <div>
                            <p>ID: {snippet.id}</p>
                        </div>
                        <div>
                            <p>Title : {snippet.title} </p>
                        </div>
                        <div>
                            <button onClick={() => {
                                handleClick(snippet.unique_address)
                            }}>
                                Find Me Here
                            </button>
                        </div>
                        <div>
                            <p>CreatedAt: {(new Date(snippet.createdAt)).toLocaleString()}</p>

                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Mysnippets;