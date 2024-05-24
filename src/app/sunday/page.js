"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { MdOutlineInfo } from "react-icons/md";
import { IoIosArrowDropleft } from "react-icons/io";
import Link from 'next/link';

export default function Home() {

  
  // Data array for the divs
  

  const [artistDataWP, setArtistDataWP] = useState([]);

  

  const [isLoaded, setIsLoaded] = useState(false);


  const [artistImageWP, setArtistImageWP] = useState([]);

  const artistData = [{title: "Artist 1"}, 
                      {title: "Artist 2"}, 
                      {title: "Artist 3"}, 
                      {title: "Artist 4"}]; // Example data, replace with your actual data



  useEffect(() => {
    fetch('https://develop.dailyoperation.uk/schedule/wp-json/wp/v2/posts?_embed')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    // Work with the received post data
    setArtistDataWP(data)
    setIsLoaded(true);
    
    
    
    
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });

  

  }, []); // Empty dependency array ensures this effect runs only once on component moun



  useEffect(() => {
    console.log("artists", artistDataWP);
    // console.log("images", artistDataWP._embedded['wp:featuredmedia'][0]);   
  }, [artistDataWP]); // Log artists whenever it changes

  // Initialize state for hover effects, one for each div
  const [hoverStates, setHoverStates] = useState(Array(artistDataWP.length).fill(false));

  // Function to handle hover start
  const handleClick = (index) => {
    const newHoverStates = [...hoverStates];
    newHoverStates[index] = !newHoverStates[index];
    setHoverStates(newHoverStates);
  };

  // Function to handle hover end
  const handleHoverEnd = (index) => {
    const newHoverStates = [...hoverStates];
    newHoverStates[index] = false;
    setHoverStates(newHoverStates);
  };

  const filteredArtistDataWPSunday = artistDataWP.filter(artist => artist.categories[0] === 4);

  

  return (
    <>
    <div className="bg-black min-h-screen ">
    <div className="mx-auto pt-4 text-2xl w-72  text-gray-400 flex justify-between">
    
    <Link href="./" >
    <IoIosArrowDropleft />
    </Link>
    <h1 className="text-xl text-gray-400 font-bold text-center">Sunday</h1>
    <Link href="/information" >
    <MdOutlineInfo />
    </Link>
    </div>
    <h2 className="text-xs font-bold text-gray-400 text-center">August 24th-25th</h2>
    <h2 className="text-xs text-gray-400 text-center">Orchard Square - Sheffield</h2>
    {/* <h2 className="text-gray-300 font-bold text-center">Artists</h2> */}

    {!isLoaded ? (
      <p className="text-gray-300 text-center"><span className="loading loading-ball loading-lg"></span></p>
    ) : (
    
      <div className="flex flex-col items-center justify-center pt-2 ">
        {filteredArtistDataWPSunday.slice().reverse().map((artistName, index) => (

          
          <div key={index}>
          {/* <p id="day"className="text-gray-300">{artistName.categories[0]}</p> */}
          
          
          <motion.div
            key={index}
            style={{
                    backgroundImage: `url(${artistName?._embedded?.['wp:featuredmedia']?.[0]?.source_url})`,
                  }}
            className="w-72 rounded-xl my-2 mx-auto  bg-cover bg-center bg-fit bg-no-repeat  flex items-center justify-center font-semibold text-2xl text-white"
            onClick={() => handleClick(index)}
            onMouseLeave={() => handleHoverEnd(index)}
            initial={{ height: 12, 
                        width: 300,
                        opacity: 1,
                        alignSelf: "center",
                        
                         }}
            animate={{
              height: hoverStates[index] ? 288 : 40,
              width: hoverStates[index] ? 320 : 300,
              opacity: hoverStates[index] ? 1 : 0.6,
              alignSelf: "center",
              // darken: hoverStates[index] ? 0 : 0.5,
            }}
            transition={{ duration: 0.5, ease: "backInOut" }}
          ><p className="text-center px-2 bg-white  text-black">{artistName.title.rendered}</p>
            {/* {artistName.title.rendered} */}
            
            
          </motion.div>
          <p className="text-gray-300 -mt-1 text-xs text-center">{artistName.date.substring(artistName.date.length - 8).toString().slice(0, -3)}</p>
          <p className={ hoverStates[index] ? "w-72 block text-gray-200 text-sm my-4 mx-12" : "hidden"}>{artistName.excerpt.rendered.replace(/<\/?([a-z][a-z0-9]*)\b[^>]*>/gi, '')}</p>
          {/* <p is="url">{artistName?._embedded?.['wp:featuredmedia']?.[0]?.source_url}</p> */}
          </div>
        ))}
      </div>
      


    )}
      </div>
    </>
  );
}
