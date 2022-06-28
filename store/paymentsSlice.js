import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allPayments: [],
};

export const payementsSlice = createSlice({
  name: "payements",
  initialState,
  reducers: {
    paymentOverviewFetch: (state, action) => {
      state.allPayments = [action.payload];
    },
  },
});

// Action creators are generated for each case reducer function
export const { paymentOverviewFetch } = payementsSlice.actions;

export default payementsSlice.reducer;
