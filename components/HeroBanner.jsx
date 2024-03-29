import Link from "next/link";
import React from "react";
import Typewriter from "typewriter-effect";
import { useRouter } from "next/router";

function HeroBanner() {
  const router = useRouter();

  const randomNumber = Math.floor(Math.random() * 10);

  return (
    <div className=" bg-[url('https://images.pexels.com/photos/9486900/pexels-photo-9486900.jpeg?auto=compress&cs=tinysrgb&w=600')] flex-1 max-w-6xl bg-[#dcdcdc] rounded-lg py-6 px-12 h-4/5 pb-12 leading-3 bg-cover bg-center  relative sticky-0">
      <div className="py-12 -mt-12 text-white italic font-cinzel text-2xl">
        <Typewriter
          options={{
            autoStart: true,
            loop: true,
          }}
          onInit={(typewriter) => {
            typewriter
              .typeString(
                "  An effort made for the happiness of others lifts us above ourselves."
              )
              .pauseFor(2000)
              .start()
              .deleteAll();
          }}
        />

        <div className="flex flex-col mt-8 space-y-12  top-0">
          <div className="flex flex-col space-y-4 md:block md:space-x-8">
            <button
              onClick={() => router.push("/request")}
              type="button"
              className="rounded-lg py-2 px-6 bg-transparent text-white border border-white mt-12 text-2xl font-semibold cursor-pointer transition-transform duration-150 ease-out hover:scale-75 z-40"
            >
              Start campaign
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroBanner;
