import Head from "next/head";

import Feed from "../components/Feed";
import HeroBanner from "../components/HeroBanner";
import { campaignFetch } from "../store/campaignSlice";

import { wrapper } from "../store/store";

export default function Home() {
  return (
    <div className=" flex justify-center items-center">
      <div className="flex flex-col  justify-center space-y-2">
        <HeroBanner />
        <Feed />
      </div>
    </div>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async () => {
    console.log("coming back")
    const response = await fetch("http:localhost:3000/api/getAllCampaigns");
    const data = await response.json();
    store.dispatch(campaignFetch(data));
  }
);
