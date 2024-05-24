"use client";
import React from 'react'
import Link from 'next/link'
import { MdOutlineInfo } from "react-icons/md";
import { IoIosArrowDropleft } from "react-icons/io";


const page = () => {
  return (
    <>
    <div className="bg-black min-h-screen ">
    <div className="mx-auto pt-4 text-2xl w-72  text-gray-400 flex justify-between">
    
    <Link href="./" >
    <IoIosArrowDropleft />
    </Link>
    <h1 className="text-xl text-gray-400 font-bold text-center">Info</h1>
    <Link href="/information" >
    <MdOutlineInfo />
    </Link>
    </div>
    <h2 className="text-xs font-bold text-gray-400 text-center">August 24th-25th</h2>
    <h2 className="text-xs text-gray-400 text-center">Orchard Square - Sheffield</h2>
    <p className="text-sm pt-4 px-4 text-gray-400 text-center">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sodales eleifend nibh vel pellentesque. Etiam luctus magna eget luctus dapibus. Ut cursus nibh quam, ac commodo metus ornare ut. Curabitur pretium massa in dui pulvinar, et venenatis felis euismod. Sed quis fermentum libero, a dictum urna. Mauris risus velit, porttitor non nisl pretium, cursus porta tellus. Sed pellentesque mi vitae ornare imperdiet.
    </p>
    </div>
    
    
    </>
  )
}

export default page