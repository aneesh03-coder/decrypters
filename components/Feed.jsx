import React from "react";
import { BiRefresh } from "react-icons/bi";
import CardDisplay from "./CardDisplay";
import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

function Feed() {
  const [info, setInfo] = useState([]);
  const allCampaigns = useSelector((state) => state.campaign?.allCampaigns[0]);

  useEffect(() => {
    setInfo(allCampaigns);
  }, [allCampaigns]);

  return (
    <div className=" max-w-6xl border-2 min-h-screen overflow-y-scroll scrollbar-hide p-3">
      <div className="flex  items-center justify-between">
        <h1 className="p-5 pb-0 text-xl font-bold">
          Fundraisers in your communnity
        </h1>
        <BiRefresh
          onClick={null}
          className="w-8 h-8 mt-5 mr-5 cursor-pointer text-red-500 transition-all duration-500 ease-out hover:rotate-180 active:scale-125"
        />
      </div>

      {/* Feed */}
      <div>
        {/* Marty's component */}

        {info.map(({ id, patient_image, patient_description, Title }) => (
          <div key={id}>
            <CardDisplay
              id={id}
              patientImage={patient_image}
              Title={Title}
              patientDescription={patient_description}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Feed;
