"use client";

import { useState } from 'react'
import Image from "next/image";
import eye from './../../public/eye.svg';
import eyeSlash from './../../public/eye-slash.svg';

const Password = ({ value, handleChange, err }) => {

    const [visible, setVisible] = useState(false);

    const handlePasswordVisibility = event => {
        event.preventDefault();
        setVisible(prev => !prev);
    }

    return (
        <div>
            <div className={`${err ? "mb-2" : "mb-4" } border border-blue-300 mx-4 px-4 py-1 rounded flex items-center`}>
                <input
                    type={visible ? "text" : "password"}
                    name="password"
                    placeholder="Enter your password"
                    value={value}
                    onChange={handleChange}
                />
                <button onClick={handlePasswordVisibility} className='ml-auto'>
                    {visible ?
                        <Image
                            src={eyeSlash}
                            alt="Eye Slash image"
                        />
                        :
                        <Image
                            src={eye}
                            alt="Eye image"
                        />
                    }

                </button>
            </div>

            <div className="mx-5 my-2">
                <p className="text-sm text-red-500">{err}</p>
            </div>
        </div>
    )
}

export default Password;