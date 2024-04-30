
"use client";

import { useRouter } from "next/navigation";
import axios from "@/lib/base";
import { useContext } from "react";
import RootContext from "@/contexts/RootContext";

const LogoutPage = () => {
    const router = useRouter();
    const { setKey } = useContext(RootContext);

    const handleLogout = async () => {
        try {
            await axios.post('/users/logout/',{});
            localStorage.removeItem("token");
            setKey("");
            router.push('/');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="flex justify-center items-center h-screen">
            <p className="text-xl font-semibold font-mono">
                Are You Sure ?
                <button className="mx-2 underline text-red-400" onClick={handleLogout}>Yes</button>

                <span className="text-gray-500">|</span>

                <button className="ml-2 underline text-blue-400" onClick={() => router.back()}>Go Back</button>

            </p>
        </div>
    )
}

export default LogoutPage;