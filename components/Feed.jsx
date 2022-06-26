import React from 'react'

import { BiRefresh } from 'react-icons/bi'
import CardDisplay from './CardDisplay';

function Feed() {
  return (
    <div className=" max-w-4xl border-2 max-h-screen overflow-y-scroll scrollbar-hide">
      <div className="flex  items-center justify-between">
        <h1 className="p-5 pb-0 text-xl font-bold">Home</h1>
        <BiRefresh
          onClick={null}
          className="w-8 h-8 mt-5 mr-5 cursor-pointer text-red-500 transition-all duration-500 ease-out hover:rotate-180 active:scale-125"
        />
      </div>

      {/* Feed */}
      <div>
        
        {/* Marty's component */}

        <CardDisplay
          Id="123"

          caseImage="https://i2-prod.mirror.co.uk/incoming/article20801229.ece/ALTERNATES/n615/0_In-California-Simah-Herman-18-started-a-campaign-to-stop-vaping-after-she-suffered-from-lung-fail.jpg"
          caseTitle="Help me raise money for my Mothers Heart surgery"
          caseDescription="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
          lobortis venenatis ex, at tincidunt eros faucibus tincidunt. Mauris ac
          nunc tortor. Vivamus non urna ipsum. Vestibulum in magna non sapien
          pellentesque dignissim. Sed tortor sapien, blandit id elementum in,
          tempor at nisi. Sed non risus non libero eleifend molestie."
        />
        <CardDisplay
         Id="12333"

          caseImage="https://i2-prod.mirror.co.uk/incoming/article20801229.ece/ALTERNATES/n615/0_In-California-Simah-Herman-18-started-a-campaign-to-stop-vaping-after-she-suffered-from-lung-fail.jpg"
          caseTitle="Help me raise money for my Mothers Heart surgery"
          caseDescription="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
          lobortis venenatis ex, at tincidunt eros faucibus tincidunt. Mauris ac
          nunc tortor. Vivamus non urna ipsum. Vestibulum in magna non sapien
          pellentesque dignissim. Sed tortor sapien, blandit id elementum in,
          tempor at nisi. Sed non risus non libero eleifend molestie."
        />

        <CardDisplay
          caseImage="https://i2-prod.mirror.co.uk/incoming/article20801229.ece/ALTERNATES/n615/0_In-California-Simah-Herman-18-started-a-campaign-to-stop-vaping-after-she-suffered-from-lung-fail.jpg"
          caseTitle="Help me raise money for my Mothers Heart surgery"
          caseDescription="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
          lobortis venenatis ex, at tincidunt eros faucibus tincidunt. Mauris ac
          nunc tortor. Vivamus non urna ipsum. Vestibulum in magna non sapien
          pellentesque dignissim. Sed tortor sapien, blandit id elementum in,
          tempor at nisi. Sed non risus non libero eleifend molestie."
        />
      </div>
    </div>
  );
}

export default Feed
