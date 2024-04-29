"use client";

import Button from "@/components/Btn";
import Input from "@/components/CustomInput";
import Password from "@/components/password";
import { useContext, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import RootContext from "@/contexts/RootContext";

const LoginPage = () => {
    const router = useRouter();
    const [data, setData] = useState({
        email: "a@b.com",
        password: "admin123"
    });
    const [error, setError] = useState([])
    const { setKey } = useContext(RootContext);

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
            const endpoint = process.env.NEXT_PUBLIC_API + '/users/login/';
            const response = await axios.post(endpoint, data, {
                withCredentials: true
            })
            const token = response?.data?.access_key;
            // console.log(typeof token);
            if (token) {
                localStorage.setItem("token", token);
                setKey(token);
            }

            router.push('/');
        } catch (error) {
            // console.log(error);
            const data = error?.response?.data;
            setError(data)
        }
    }
    return (
        <div>
            <form className="border w-1/2 mx-auto mt-8 shadow-xl">

                <Input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={data.email}
                    handleChange={handleChange}
                    err={error?.message && error?.message}
                />

                <Password
                    value={data.password}
                    handleChange={handleChange}
                    err={error?.message && error?.message}
                />

                <div className="mx-4 mb-2 rounded">
                    <Button
                        style={{ width: "100%" }}
                        actionText={"login"}
                        handleSubmit={handleSubmit}
                    />
                </div>
            </form>
        </div>
    )
}

export default LoginPage;