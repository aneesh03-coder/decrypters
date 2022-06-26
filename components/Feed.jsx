import React from 'react'

import { BiRefresh } from 'react-icons/bi';
import CardDisplay from './CardDisplay';

import { useState, useEffect, useCallback, useRef } from 'react';
import { db } from '../firebase';
import firebase from 'firebase/compat/app';
import { data } from 'autoprefixer';

function Feed() {
  const [info, setInfo] = useState([]);

  let shouldRun = useRef(true);
  useEffect(() => {
    const getInfo = async () => {
      const response = await fetch('/api/getAllCampaigns');
      const data = await response.json();
      setInfo(data);
    };
    if (shouldRun.current) {
      db.collection('campaigns').onSnapshot(() => {
        getInfo();
      });
      shouldRun.current = false;
    }
  }, []);
  const saveCampaign = async () => {
    const newCampaign = {
      Title:
        'Tuberculosis (TB) is a potentially serious infectious disease that mainly affects the lungs. The bacteria that cause tuberculosis are spread from person to person through tiny droplets released into the air via coughs and sneezes',
      goal: 1500,
      patient_address: 'Rynjah',
      patient_age: 43,
      patient_description: 'Really needs your help',
      patient_gender: 'male',
      patient_image:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Depiction_of_a_tuberculosis_patient.png/305px-Depiction_of_a_tuberculosis_patient.png',
      patient_name: 'Pankaj Das',
      relation: 'Uncle',
      requester_contact: 8325467432,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    };
    const response = await fetch('/api/addCampaign', {
      method: 'POST',
      body: JSON.stringify({ newCampaign }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
  };

  return (
    <div className=" max-w-6xl border-2 max-h-screen overflow-y-scroll scrollbar-hide p-3">
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

        {info.map((data) => (
          <div key={data.id}>
            <CardDisplay
              Id={data.id}
              caseImage={data.patient_image}
              caseTitle={data.Title}
              // caseDescription={data.Description}
              caseDescription={data.patient_description}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Feed;
