"use client";

import RootContext from "@/contexts/RootContext";
import axios from "@/lib/base";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";


const SnippetsPage = () => {

    const [snippets, setSnippets] = useState([]);
    const { key } = useContext(RootContext);
    const router = useRouter();

    useEffect(() => {
        const fetch = async () => {
            try {
                const response = await axios.get('/snippets',{
                    headers: {
                        Authorization: `Bearer ${key}`,
                    }
                });
                console.log(response);
                setSnippets(response.data);
            } catch (error) {
                if (error.message === "Network Error") {
                    console.log("Network!!");
                    throw new Error(error);
                } else {
                    router.push('/login');
                }
            }
        }
        fetch();
    }, [key]);

    const handleDelete = async (url) => {
        try {
            const response = await axios.delete(`/snippets/${url}/`,{
                headers: {
                    Authorization: `Bearer ${key}`,
                }
            });
            console.log(response);
            location.reload();
        } catch (error) {
            console.log("Err")
            console.log(error);
        }
    }

    return (
        <div>
            <div className="m-4 p-2">
                {snippets && snippets.map(snippet => {
                    const { title, unique_address, updatedAt } = snippet;
                    const time = new Date(updatedAt).toLocaleTimeString();
                    return (
                        <div key={snippet.id} className="border p-2 shadow-sm bg-slate-50">
                            <p className="font-mono text-lg">
                                <span className="text-gray-500">Title : </span>
                                {title}
                            </p>

                            <button onClick={() => {
                                console.log(unique_address);
                                router.push(`/${unique_address}`);
                            }} className="font-mono">
                                <span className="text-gray-500 mr-2">For More Details : </span>
                                <span className="underline bg-green-100 p-1">
                                    Click Here
                                </span>
                            </button>

                            <p className="font-mono text-md ">
                                <span className="text-gray-500 mr-2">
                                    Last Updated At :
                                </span>
                                {time}
                            </p>
                            <button
                                onClick={() => handleDelete(unique_address)} className="underline text-red-900">Delete Snippet</button>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}

export default SnippetsPage;