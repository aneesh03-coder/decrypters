/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getSession, useSession } from "next-auth/react";
import { useSelector } from "react-redux";
import { paymentOverviewFetch } from "../../store/paymentsSlice";
import { wrapper } from "../../store/store";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { uuid } from "react-uuid";

const ReadMore = ({ children }) => {
  const text = children;
  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };
  return (
    <p className="text">
      {/* {isReadMore ? text.slice(0, 150) : text} */}
      <span
        onClick={toggleReadMore}
        className="read-or-hide cursor-pointer hover:text-green-500"
      >
        {isReadMore ? "...read more" : " show less"}
      </span>
    </p>
  );
};

const CardDetails = ({ allPayments }) => {
  const { data: session } = useSession();
  const [info, setInfo] = useState([]);
  const [totalDonations, setTotalDonations] = useState([]);
  let completeSetOfPayments = [];
  allPayments.forEach((payment) => {
    completeSetOfPayments.push(payment);
  });

  const [showDonationDetails, setShowDonationDetails] = useState(
    completeSetOfPayments
  );
  showDonationDetails.splice(4, showDonationDetails.length - 4);
  const router = useRouter();
  const caseDetailsId = router.query.caseDetailsId;
  // const allPayments = useSelector((state) => state.payments?.allPayments);
  const allCampaigns = useSelector((state) => state.campaign?.allCampaigns[0]);

  const selectedCampaign1 = [];
  useEffect(() => {
    allCampaigns?.forEach((campaign) => {
      if (campaign.id == caseDetailsId) {
        selectedCampaign1.push(campaign);
      }
    });
    setInfo(selectedCampaign1[0]);
  }, []);

  useEffect(() => {
    let finalDonationAmount = 0;
    allPayments.forEach((payment) => {
      finalDonationAmount =
        finalDonationAmount + (payment?.donation_amount || 0);
    });
    setTotalDonations(finalDonationAmount);
  });

  const donation = {
    name: "alex",
    price: 100,
  };

  const publishableKey = `${process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}`;
  const stripePromise = loadStripe(publishableKey);
  let num = 0;

  const makePayment = async () => {
    console.log(`Is it coming here`);
    const paymentDetails = {
      campaignId: caseDetailsId,
      paymentId: "324jh32b432kjb32",
      donater: donation.name,
      donation_amount: donation.price,
    };
    console.log(`These are the payment Details ${paymentDetails}`);
    const response = await fetch("/api/addPaymentDetails", {
      method: "POST",
      body: JSON.stringify({ paymentDetails }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(`This is the data recieved from the server ${data}`);
  };

  const checkout = async () => {
    makePayment();
    const stripe = await stripePromise;
    const checkoutSession = await axios.post("/api/create-stripe-session", {
      donation: donation,
    });
    const result = await stripe.redirectToCheckout({
      sessionId: checkoutSession.data.id,
    });
    if (result.error) {
      alert(result.error.message);
    }
  };

  return (
    <div className="max-w-6xl mx-auto mt-4 mb-4 p-3">
      <div
        onClick={() => router.push("/")}
        className="flex flex-row items-center gap-[3px] cursor-pointer text-[#8f0d34] hover:text-[#530319]"
      >
        <div className="overflow-hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7 16l-4-4m0 0l4-4m-4 4h18"
            />
          </svg>
        </div>
        <p className="text-lg font-semibold">Go back</p>
      </div>
      <div className="max-w-6xl mx-auto mt-4 mb-4">
        <h3 className="text-2xl font-semibold mb-2">
          Case ID <span className="font-light">{caseDetailsId}</span>
        </h3>

        <div className="flex flex-col items-center md:flex-row  gap-12">
          {/* Left side */}
          <div>
            <h4 className="text-xl font-bold mb-3">
              {/* {data.Title} */}
              {info?.Title}
            </h4>

            <img
              className="object-cover md:h-auto md:w-auto rounded-md mb-3"
              src={info?.patient_image}
              alt=""
            />

            <div className="flex flex-row items-center gap-3">
              <div className="relative w-10 h-10 overflow-hidden rounded-full bg-[#8f0d3450]">
                <svg
                  className="absolute w-12 h-12 text-[#8f0d34] -left-1"
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
                {session?.user?.name || info?.requestor || "Anonymous"} started
                this fundraiser
              </p>
            </div>
            <div className="flex flex-row items-center gap-3 border-b-2 border-t-2 py-2 mt-3 px-4">
              <p>Created at </p>
              <span>|</span>
              <span>
                Goal <span className="font-semibold">$</span>
                {info?.goal}
              </span>
              <span>|</span>
              <span>
                Raised <span className="font-semibold">$</span>
                {totalDonations}
              </span>
            </div>

            <div className="mt-3 mb-14">
              <h3 className="text-lg font-semibold mb-3">{info?.Title}</h3>
              <div>{info?.patient_description}</div>
              {/* <ReadMore>{info?.patient_description}</ReadMore> */}
            </div>

            <div className="border-b-2 border-t-2 py-2 mt-3">
              <h3 className="text-lg font-semibold mb-3">Patient Details</h3>
              <div className="px-4">
                <h5 className="text-lg font-semibold mb-3">
                  Name:{" "}
                  <span className="font-light">
                    {info?.patient_name || "Anonymous"}{" "}
                  </span>
                </h5>
                <h5 className="text-lg font-semibold mb-3">
                  Age: <span className="font-light">{info?.patient_age}</span>
                </h5>
                <h5 className="text-lg font-semibold mb-3">
                  Gender:{" "}
                  <span className="font-light">{info?.patient_gender} </span>
                </h5>
                <h5 className="text-lg font-semibold mb-3">
                  Address:{" "}
                  <span className="font-light">{info?.patient_address}</span>
                </h5>
              </div>
            </div>

            <div className="border-b-2 py-2 mt-3">
              <h3 className="text-lg font-semibold mb-3">Orginizer</h3>
              <div className="px-4 flex flex-row gap-4">
                <div className="relative w-10 h-10 overflow-hidden rounded-full bg-[#8f0d3450]">
                  <svg
                    className="absolute w-12 h-12 text-[#8f0d34] -left-1"
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
                    Name:{" "}
                    <span className="font-light">
                      {info?.requestor || "Anonymous"}{" "}
                    </span>
                  </h5>
                  <h5 className="text-lg font-semibold mb-3">
                    Email:{" "}
                    <span className="font-light">
                      {session?.user?.email || "***** (Hidden due to security)"}
                    </span>
                  </h5>
                  <h5 className="text-lg font-semibold mb-3">
                    Phone:{" "}
                    <span className="font-light">
                      {info?.requester_contact}
                    </span>
                  </h5>
                </div>
              </div>
            </div>
          </div>

          {/* Right side */}
          <div className="bg-white shadow-lg rounded-md p-4 w-full">
            <h5 className="text-lg font-semibold mb-3">
              {" "}
              <span className="font-light">
                ${totalDonations} USD raised of ${info?.goal}{" "}
              </span>
            </h5>
            <p className="mb-3">{allPayments.length} donations</p>
            <button
              className="btn bg-[#8f0d34] hover:bg-[#530319] p-3 mb-3 w-full rounded-md text-white font-bold"
              onClick={checkout}
            >
              Donate
            </button>
            <div className="flex flex-row items-center gap-3 mb-3">
              <div className="relative w-10 h-10 overflow-hidden rounded-full bg-[#8f0d3450]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute w-6 h-6 text-[#8f0d34] left-2 top-2"
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
                {allPayments.length == 0
                  ? "Be the first to donate"
                  : "We would love for you to care"}
              </p>
            </div>
            {showDonationDetails.map((payments, index) => (
              <div
                key={index}
                className="flex flex-row items-center gap-3 border-t-2 py-3"
              >
                <div className="relative w-10 h-10 overflow-hidden rounded-full bg-[#8f0d3450]">
                  <svg
                    className="absolute w-12 h-12 text-[#8f0d34] -left-1"
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
                  <p className="text-slate-500 text-lg font-semibold">
                    {payments?.donater || "Anonymous"}
                  </p>
                  <div className="text-slate-500 text-sm font-semibold flex items-center">
                    Donated $
                    {payments?.donation_amount || "Offline for this cause"}
                    {payments?.donation_amount == undefined ? (
                      ""
                    ) : (
                      <div className="text-xs ml-1"> USD for this cause</div>
                    )}
                    {/* {"$"} <div className="text-xs"> USD for this cause</div> */}
                  </div>
                </div>
              </div>
            ))}
            <div className="flex justify-center xs text-gray-400">
              {allPayments.length - showDonationDetails.length}
              &nbsp;
              <div> more donations made ... </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const caseDetailsId1 = context.query.caseDetailsId;

    const response = await fetch("http:localhost:3000/api/getPaymentDetails", {
      method: "POST",
      body: JSON.stringify({ campaign: { campaignId: caseDetailsId1 } }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    store.dispatch(paymentOverviewFetch(data));
    return { props: { allPayments: data } };
  }
);

export default CardDetails;
