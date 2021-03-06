/* eslint-disable @next/next/no-img-element */
import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";

const CardDisplay = ({ Title, patientDescription, id, patientImage }) => {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push(`/case-details/${id}`)}
      className="flex flex-col items-center bg-white rounded-lg border shadow-md md:flex-row md:max-w-6xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 mb-3"
    >
      <img
        className="object-cover rounded-t-lg md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
        src={patientImage}
        alt=""
        style={{ width: "350px", height: "280px" }}
      />

      <div className="flex flex-col justify-between p-4 leading-normal ">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {Title}
        </h5>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {patientDescription}
        </p>

        <div className="flex justify-end">
          <a
            href="#"
            className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-[#8f0d34] rounded-lg hover:bg-[rgb(143,13,52)] focus:ring-4 focus:outline-none dark:bg-[#870C30] dark:hover:bg-[rgb(143,13,52)] dark:focus:ring-[rgb(143,13,52)]"
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
