import { useAppDispatch, useAppSelector } from "../hooks";
import { useWeb3React } from "@web3-react/core";
import { _connect, _disconnect, _setChain } from "./reducer";
import { injected } from "../../utils/connecttors";

export const useAppWallet = () => {
  const dispatch = useAppDispatch();
  const { activate, deactivate, setError } = useWeb3React();

  return {
    state: useAppSelector((state) => state.infoReducer),

    setChain: (chainId: number) => {
      dispatch(_setChain(chainId));
    },

    connect: async () => {
      if (typeof window.ethereum === "undefined") {
        return;
      }

      await activate(injected, undefined, true)
        .then(() => {
          dispatch(_connect());
        })
        .catch((error) => {
          setError(error);
          console.log(error);
        });
    },

    disconnect: () => {
      deactivate();
      dispatch(_disconnect());
    },
  };
};
