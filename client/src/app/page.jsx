"use client";

import Button from "@/components/Btn";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Input from "@/components/CustomInput";

export default function Home() {

  const router = useRouter();
  const [data, setData] = useState({
    title: "My Code Snippets",
    code: "",
    language: "C++",
  });

  const handleChange = event => {
    const { name, value } = event.target;
    setData(previous => ({
      ...previous,
      [name]: value
    }));
  }

  const handleSubmit = async () => {

    if (!data.code) {
      alert("Please add some code first");
      return;
    }
    const token = localStorage.getItem("token");
    if (!token) {
      router.push('/login');
    }

    try {
      const endpoint = process.env.NEXT_PUBLIC_API + '/snippets/';
      const response = await axios.post(endpoint, data, {
        withCredentials: true
      });
      setData({
        title: "My Code Snippets",
        code: "",
        language: "C++",
      });
      // console.log(response);
      router.push(`/${response?.data?.unique_address}`)
    } catch (error) {
      console.log(error);
    }

  }

  return (
    <main>

      <div className="mx-4 w-min"  >
        <Input
          type="text"
          name="title"
          placeholder="Enter title"
          value={data.title}
          handleChange={handleChange}
          err=""
        />
      </div>

      <div>
        <textarea
          name="code"
          placeholder="Enter your code snippet here"
          value={data.code}
          onChange={handleChange}
          className="border-2 resize-none w-[400px] h-[400px] mt-6 ml-8 text-gray-700 p-4 rounded hover:border-blue-300 shadow-md"
        />
      </div>

      <div className="w-[400px] ml-8 p-2 flex">

        <div className="w-1/2">
          <select name="language" className="appearance-none w-full cursor-pointer text-lg bg-white border border-gray-400 p-1 rounded-sm"
            value={data.language}
            onChange={handleChange}
          >
            <option value="C++">C++</option>
            <option value="Python">Python</option>
            <option value="Javascript">Javascript</option>
          </select>
        </div>

        <div className="ml-auto">
          <Button
            actionText={"submit"}
            handleSubmit={handleSubmit}
            style={{}}
          />
        </div>

      </div>

    </main>
  );
}
