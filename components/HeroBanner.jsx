import Link from 'next/link'
import React from 'react';


function HeroBanner() {
  return (
    <div className=" bg-[url('https://images.pexels.com/photos/9486900/pexels-photo-9486900.jpeg?auto=compress&cs=tinysrgb&w=600')] flex-1 max-w-4xl bg-[#dcdcdc] rounded-lg py-24 px-12 h-4/5 leading-3 bg-cover bg-center  relative sticky-0">

       {/* <video
                className="w-full h-screenn  object-cover  opacity-90"
                src=" ../bgvideo.mp4" 
                type="video/mp4"
                loop
                controls={false}g
                muted
                autoPlay
                /> */}

    
        
        <div className="flex">
          <div className="flex flex-col space-y-6 md:block md:space-x-8">
            <button type="button" className="rounded-lg py-2 px-6 bg-transparent hover:bg-blue- text-white border border-white mt-12 text-lg font-semibold cursor-pointer transition-transform duration-150 ease-out hover:scale-150 z-40">Request</button>
            <button type="button" className="rounded-lg py-2 px-6 bg-transparent text-white border border-white mt-12 text-lg font-semibold cursor-pointer transition-transform duration-150 ease-out hover:scale-150 z-40">Donate</button>
          </div>
  

      </div>
     
    
    </div>
  )
}

export default HeroBanner
