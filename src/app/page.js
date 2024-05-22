"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function Home() {

  
  // Data array for the divs
  

  const [artistDataWP, setArtistDataWP] = useState([]);


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
    setArtistDataWP(data);
    
    
    
    
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

  return (
    <>
    <div className="bg-black min-h-screen">
    <h1 className="pt-4 text-xl text-gray-300 font-bold text-center">Saturday</h1>
    {/* <h2 className="text-gray-300 font-bold text-center">Artists</h2> */}
      <div className="flex flex-col items-center justify-center pt-2 ">
        {artistDataWP.slice().reverse().map((artistName, index) => (
          <div key={index}>
          
          <motion.div
            key={index}
            style={{
                    backgroundImage: `url(${artistName?._embedded?.['wp:featuredmedia']?.[0]?.source_url})`,
                  }}
            className="w-72 rounded-xl my-2 mx-auto bg-[url('https://develop.dailyoperation.uk/schedule/wp-content/uploads/2024/05/pexels-brett-sayles-1309240-1-scaled.jpg')] bg-cover bg-center bg-fit bg-no-repeat  flex items-center justify-center font-semibold text-2xl text-white"
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
          <p className={ hoverStates[index] ? "block text-gray-200 text-sm my-4 mx-12" : "hidden"}>{artistName.excerpt.rendered.replace(/<\/?([a-z][a-z0-9]*)\b[^>]*>/gi, '')}</p>
          {/* <p is="url">{artistName?._embedded?.['wp:featuredmedia']?.[0]?.source_url}</p> */}
          </div>
        ))}
      </div>
      
      </div>
    </>
  );
}
