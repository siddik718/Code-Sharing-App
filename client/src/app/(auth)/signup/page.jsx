"use client";

import Input from "@/components/CustomInput";
import Button from "@/components/Btn";
import Password from "@/components/password";
import { useState } from "react";
import axios from "@/lib/base";
import { useRouter } from 'next/navigation'


const SignupPage = () => {
    const router = useRouter()
    const [data, setData] = useState({
        username: "admin",
        first_name: "Example",
        last_name: "1",
        email: "a@b.com",
        password: "admin123"
    });

    const [error,setError] = useState({})

    const handleChange = event => {
        const { name, value } = event.target;
        setData(previous => ({
            ...previous,
            [name]: value
        }));
    }

    const handleSubmit = async event => {
        event.preventDefault();
        try {
            const response = await axios.post('/users/register/', data)
            console.log(response);
            router.push('/login')
        } catch (error) {
            const data = error?.response?.data;
            if(data) {
                setError(data)
            }else {
                console.log(error);
            }
        }
    }


    return (
        <div>
            <form className="border w-1/2 mx-auto mt-8 shadow-xl" >
                <Input
                    type="text"
                    name="username"
                    placeholder="Enter your username"
                    value={data.username}
                    handleChange={handleChange}
                    err={error.username && error.username[0]}
                    />
                <Input
                    type="text"
                    name="first_name"
                    placeholder="Enter your first name"
                    value={data.first_name}
                    handleChange={handleChange}
                    err={error.first_name && error.first_name[0]}
                    />
                <Input
                    type="text"
                    name="last_name"
                    placeholder="Enter your last name"
                    value={data.last_name}
                    handleChange={handleChange}
                    err={error.last_name && error.last_name[0]}
                    />
                <Input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={data.email}
                    handleChange={handleChange}
                    err={error.email && error.email[0]}
                    />
                <Password
                    value={data.password}
                    handleChange={handleChange}
                    err={error.password && error.password[0]}
                />

                <div className="mx-4 mb-2 rounded">
                    <Button
                        style={{ width: "100%" }}
                        actionText={"signup"}
                        handleSubmit={handleSubmit}
                    />
                </div>

            </form>
        </div>
    )
}

export default SignupPage;