import { createSlice } from "@reduxjs/toolkit";
import { CHAINS_ID } from "../../constants/chains";

export interface IWallet {
  name?: string;
  chainIdApp: CHAINS_ID;
  connected: boolean;
}

const initialState: IWallet = {
  name: "",
  chainIdApp: Number(process.env.REACT_APP_CHAIN_ID_DEFAULT) as CHAINS_ID,
  connected: false,
};

const infoReducer = createSlice({
  name: "info",
  initialState,
  reducers: {
    _connect: (state) => {
      state.connected = true;
    },
    _disconnect: (state) => {
      state.connected = false;
    },
    _setChain: (state, action) => {
      state.chainIdApp = action.payload;
    },
  },
});

const { reducer, actions } = infoReducer;

export const { _connect, _disconnect, _setChain } = actions;
export default reducer;
