
"use client";

import { useRouter } from "next/navigation";
import axios from "axios";

const LogoutPage = () => {
    const router = useRouter();

    const handleLogout = async () => {
        try {
            const endpoint = process.env.NEXT_PUBLIC_API + '/users/logout/';
            await axios.post(endpoint, {}, {
                withCredentials: true
            });
            localStorage.removeItem("token");
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