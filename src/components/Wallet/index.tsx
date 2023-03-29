import { useWeb3React } from "@web3-react/core";
import { UserRejectedRequestError } from "@web3-react/injected-connector";
import { Web3Provider } from "@ethersproject/providers";
import { useCallback, useEffect, useMemo } from "react";
import {
  getStateConnect,
  injected,
  setStateConnect,
} from "../../utils/connecttors";
import { formatAddress } from "../../utils/helpers";
import SwitchNetwork from "./SwitchNetwork";
import Votes from "../Votes";
import ETHbalance from "./ETHbalance";

const Wallet = () => {
  const {
    chainId,
    account,
    activate,
    deactivate,
    setError,
    active,
    library: provider,
  } = useWeb3React<Web3Provider>();

  const connected = getStateConnect();
  const stateConnectedApp = useMemo(() => {
    return !!(active && account && connected);
  }, [account, active, connected]);

  console.log();

  const handleConnect = useCallback(() => {
    activate(
      injected,
      (error) => {
        if (error instanceof UserRejectedRequestError) {
          console.log("user refused");
        } else {
          setError(error);
        }
      },
      false
    );
    setStateConnect(true);
  }, [activate, setError]);

  const handleDisconnect = useCallback(() => {
    deactivate();
    setStateConnect(false);
  }, [deactivate]);

  const addressContract = "0x6ce9925389763Eaac35Ba023645A9c1996Ffc464";

  return (
    <div
      className="App"
      style={{
        textAlign: "center",
        margin: "2rem",
      }}
    >
      <h2>Welcome to a decentralized Application</h2>
      <div>
        <button
          hidden={stateConnectedApp}
          onClick={handleConnect}
        >
          Connect Metamark
        </button>
        <button
          style={{
            marginLeft: "10px",
          }}
          hidden={!stateConnectedApp}
          onClick={handleDisconnect}
        >
          Disconnect
        </button>
      </div>

      <div
        hidden={!stateConnectedApp}
        style={{
          width: "min-content",
          margin: "auto",
          textAlign: "left",
          padding: "1rem",
        }}
      >
        <p>Address: {formatAddress(account || "", 4)}</p>
        <ETHbalance />
        <p>ChainId: {chainId}</p>
        <SwitchNetwork />
      </div>
      <hr />
      <Votes addressContract={addressContract} />
    </div>
  );
};

export default Wallet;
