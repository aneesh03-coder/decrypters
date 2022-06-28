import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router'

const CardDisplay = ({ caseTitle, caseDescription, Id }) => {

  const router = useRouter()
  return (
    <div onClick={()=>router.push(`/case-details/${Id}`)} className="flex flex-col items-center bg-white rounded-lg border shadow-md md:flex-row md:max-w-6xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 mb-3">
      <Image
        className="object-cover rounded-t-lg md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
        src="https://i2-prod.mirror.co.uk/incoming/article20801229.ece/ALTERNATES/n615/0_In-California-Simah-Herman-18-started-a-campaign-to-stop-vaping-after-she-suffered-from-lung-fail.jpg"
        alt=""
        width={700}
        height={700}
      />

      

      <div className="flex flex-col justify-between p-4 leading-normal">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {caseTitle}
        </h5>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {caseDescription}
        </p>

        <div className="flex justify-end">
          <a
            href="#"
            className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Read more
            <svg
              className="ml-2 -mr-1 w-4 h-4"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default CardDisplay;
