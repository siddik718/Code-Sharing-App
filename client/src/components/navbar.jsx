"use client";

import RootContext from '@/contexts/RootContext';
import Link from 'next/link';
import React, { useContext } from 'react'

const Navbar = () => {

    const { key } = useContext(RootContext);

    // console.log("Navbar Key : ", key);

    return (
        <div className='bg-blue-300'>
            <nav className='flex items-center mx-6 h-14 font-mono'>

                <div className='ml-5'>
                    <ul className='flex gap-10'>
                        <li className='hover:border-b hover:border-blue-600'>
                            <Link href='/'>
                                Home
                            </Link>
                        </li>
                        <li className='hover:border-b hover:border-blue-600'>
                            <Link href='/snippets'>
                                My Snippets
                            </Link>
                        </li>
                    </ul>
                </div>

                <div className='ml-auto'>
                    <ul className='flex gap-6'>
                        {key ?
                            <li className='hover:border-b hover:border-red-600'>
                                <Link href='/logout'>
                                    Logout
                                </Link>
                            </li>
                            :
                            <>
                                <li className='hover:border-b hover:border-blue-600'>
                                    <Link href='/login'>
                                        Login
                                    </Link>
                                </li>
                                <li className='hover:border-b hover:border-blue-600'>
                                    <Link href='/signup'>
                                        Signup
                                    </Link>
                                </li>
                            </>
                        }
                    </ul>
                </div>

            </nav>
        </div>
    )
}

export default Navbar;