"use client";

import Button from "@/components/Btn";
import Input from "@/components/CustomInput";
import RootContext from "@/contexts/RootContext";
import axios from "@/lib/base";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";


const SigleSnippet = ({ params }) => {
    const { slug } = params;
    const { key } = useContext(RootContext);

    const [snippet, setSnippet] = useState({
        code: "",
        title: "",
        language: "",
        isOwner: false,
        url: "",
    });

    const handleChange = event => {
        const { name, value } = event.target;
        console.log(name, value);
        setSnippet(previous => ({
            ...previous,
            [name]: value
        }));
    }

    useEffect(() => {
        const fetch = async () => {

            try {
                const response = await axios.get(`/snippets/${slug}/`);
                setSnippet(response.data);
                console.log(response);
            } catch (error) {
                throw new Error(error)
                // console.log(error);
            }
        }
        fetch();

    }, [slug]);

    
    const handleUpdate = async (id) => {
        const path = window.location.pathname;
        try {
            const response = await axios.put(`/snippets${path}/`,snippet,{
                headers: {
                    Authorization: `Bearer ${key}`,
                }
            });
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        snippet ? <div>
            <div className="mx-6 my-2">
                <p>
                    URL :
                    {snippet.url &&
                        <Link className="ml-2 underline cursor-pointer text-gray-600"
                            href={snippet.url}
                        >
                            {snippet.url}
                        </Link>
                    }
                </p>
            </div>

            <div className="mx-4 w-min"  >
                <Input
                    type="text"
                    name="title"
                    placeholder="Enter title"
                    value={snippet.title}
                    handleChange={handleChange}
                    err=""
                />
            </div>

            <div>
                <textarea
                    name="code"
                    placeholder="Enter your code snippet here"
                    value={snippet.code}
                    onChange={handleChange}
                    className="border-2 resize-none w-[400px] h-[400px] mt-6 ml-8 text-gray-700 p-4 rounded hover:border-blue-300 shadow-md"
                />
            </div>

            {snippet.isOwner &&
                <div className="w-[400px] ml-8 p-2 flex">

                    <div className="w-1/2">
                        <select name="language" className="appearance-none w-full cursor-pointer text-lg bg-white border border-gray-400 p-1 rounded-sm"
                            value={snippet.language}
                            onChange={handleChange}
                        >
                            <option value="C++">C++</option>
                            <option value="Python">Python</option>
                            <option value="Javascript">Javascript</option>
                        </select>
                    </div>
                    <div className="ml-auto">
                        <Button
                            actionText={"update"}
                            handleSubmit={handleUpdate}
                            style={{}}
                        />
                    </div>

                </div>
            }

        </div> : <div>
            <p> 404 | No Code Snippets Found!</p>
        </div>
    )
}

export default SigleSnippet;