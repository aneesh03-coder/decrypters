import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { createWrapper, HYDRATE } from "next-redux-wrapper";
import campaign from "./campaignSlice";
import payments from "./paymentsSlice";

const combineReducer = combineReducers({
  campaign,
  payments,
});

const masterReducer = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state, // use previous state
      campaign: {
        allCampaigns: [
          ...state.campaign.allCampaigns,
          action.payload.campaign.allCampaigns,
        ],
      },
      payments: {
        allPayments: [
          ...state.payments.allPayments,
          action.payload.payments.allPayments,
        ],
      },
    };
    return nextState;
  } else {
    return combineReducer(state, action);
  }
};

export const makeStore = () =>
  configureStore({
    reducer: masterReducer,
  });

export const wrapper = createWrapper(makeStore);
