import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

const ReadMore = ({ children }) => {
  const text = children;
  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };
  return (
    <p className="text">
      {isReadMore ? text.slice(0, 150) : text}
      <span
        onClick={toggleReadMore}
        className="read-or-hide cursor-pointer hover:text-green-500"
      >
        {isReadMore ? '...read more' : ' show less'}
      </span>
    </p>
  );
};

const CardDetails = () => {
  const router = useRouter();
  const caseDetailsId = router.query.caseDetailsId;
  return (
           
    <div  className="max-w-6xl mx-auto mt-4 mb-4">
      <h3 className="text-2xl">Case Details {caseDetailsId}</h3>

      <div className="flex flex-col items-center md:flex-row  gap-12">
        {/* Left side */}
        <div>
          <h4 className="text-2xl font-bold mb-3">
            Help me raise money for my Mothers Heart surgery
          </h4>

          <Image
            className="object-cover md:h-auto md:w-48 rounded-lg"
            src="https://i2-prod.mirror.co.uk/incoming/article20801229.ece/ALTERNATES/n615/0_In-California-Simah-Herman-18-started-a-campaign-to-stop-vaping-after-she-suffered-from-lung-fail.jpg"
            alt=""
            width={700}
            height={300}
          />

          <div className="flex flex-row items-center gap-3">
            <div className="relative w-10 h-10 overflow-hidden rounded-full bg-green-200">
              <svg
                className="absolute w-12 h-12 text-green-500 -left-1"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
            <p className="text-slate-500 text-lg font-semibold">
              Marty started this fundraiser
            </p>
          </div>
          <div className="flex flex-row items-center gap-3 border-b-2 border-t-2 py-2 mt-3 px-4">
            <p>Created 3 days ago</p>
            <span>|</span>
            <span>
              Goal <span className="font-semibold">$</span>2,400
            </span>
            <span>|</span>
            <span>
              Raised <span className="font-semibold">$</span>400
            </span>
          </div>

          <div className="mt-3 mb-14">
            <h3 className="text-lg font-semibold mb-3">
              My mother, my super being! Always been strong as ever
            </h3>

            <ReadMore>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
              varius porttitor urna. Aenean luctus eros nunc, nec luctus augue
              pulvinar quis. Vestibulum metus turpis, feugiat in ipsum ac,
              luctus facilisis velit. Ut et urna varius, condimentum ipsum nec,
              dictum libero. Curabitur maximus malesuada ante quis mollis.
              Suspendisse at turpis id nibh finibus suscipit. Phasellus id
              ornare nisi. Donec vulputate ante a mattis posuere. Aliquam vitae
              nisl a lacus suscipit commodo quis a risus. Phasellus libero urna,
              tempus ut augue ac, tempor fermentum sem. Quisque placerat libero
              arcu. Phasellus vitae massa eget massa tincidunt viverra ut in
              felis. Cras sit amet magna sed ante elementum pulvinar sit amet at
              libero.
            </ReadMore>
          </div>

          <div className="border-b-2 border-t-2 py-2 mt-3">
            <h3 className="text-lg font-semibold mb-3">Patient Details</h3>
            <div className="px-4">
              <h5 className="text-lg font-semibold mb-3">
                Name: <span className="font-light">John Doe </span>
              </h5>
              <h5 className="text-lg font-semibold mb-3">
                Age: <span className="font-light">45 </span>
              </h5>
              <h5 className="text-lg font-semibold mb-3">
                Gender: <span className="font-light">Male </span>
              </h5>
              <h5 className="text-lg font-semibold mb-3">
                Address: <span className="font-light">Brooklyn, NY</span>
              </h5>
            </div>
          </div>

          <div className="border-b-2 py-2 mt-3">
            <h3 className="text-lg font-semibold mb-3">Orginizer</h3>
            <div className="px-4 flex flex-row gap-4">
              <div className="relative w-10 h-10 overflow-hidden rounded-full bg-green-200">
                <svg
                  className="absolute w-12 h-12 text-green-500 -left-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
              <div>
                <h5 className="text-lg font-semibold mb-3">
                  Name: <span className="font-light">Marty </span>
                </h5>
                <h5 className="text-lg font-semibold mb-3">
                  Email: <span className="font-light">marty@gmail.com</span>
                </h5>
                <h5 className="text-lg font-semibold mb-3">
                  Phone: <span className="font-light">+971 564 485932</span>
                </h5>
              </div>
            </div>
          </div>
        </div>

        {/* Right side */}
        <div className="bg-white shadow-lg rounded-md p-4 w-full">
          <h5 className="text-lg font-semibold mb-3">
            $400 <span className="font-light">USD raised of $2,400 </span>
          </h5>

          <p>26 donations</p>

          <button className="btn bg-yellow-400 p-3">Donate</button>

          <div className="flex flex-row items-center gap-3">
            <div className="relative w-10 h-10 overflow-hidden rounded-full bg-green-200">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="absolute w-6 h-6 text-green-500 left-2 top-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                />
              </svg>
            </div>
            <p className="text-slate-500 text-lg font-semibold">
              26 people just donated
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardDetails;
