import Head from 'next/head';

import Feed from '../components/Feed';
import HeroBanner from '../components/HeroBanner';



export default function Home() {

  return (
 <div className=" flex justify-center items-center">

<div className="flex flex-col  justify-center space-y-2">
  <HeroBanner/>

  <Feed/>

  </div>
  

 </div>
  
  )

  

}
