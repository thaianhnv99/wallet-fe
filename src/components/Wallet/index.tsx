import { useWeb3React } from "@web3-react/core";
import { UserRejectedRequestError } from "@web3-react/injected-connector";
import { Web3Provider } from "@ethersproject/providers";
import { useCallback, useMemo } from "react";
import {
  getStateConnect,
  injected,
  setStateConnect,
} from "../../utils/connecttors";
import { formatAddress } from "../../utils/helpers";
import SwitchNetwork from "../SwitchNetwork";
import ETHbalance from "../ETHBalance";

const Wallet = () => {
  const {
    chainId,
    account,
    activate,
    deactivate,
    setError,
    active,
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
    setStateConnect(chainId || null);
  }, [activate, chainId, setError]);

  const handleDisconnect = useCallback(() => {
    deactivate();
    setStateConnect(null);
  }, [deactivate]);

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
          margin: "auto",
          textAlign: "center",
          padding: "1rem",
        }}
      >
        <p>Address: {formatAddress(account || "", 4)}</p>
        <ETHbalance />
        <p>ChainId: {chainId}</p>
        <SwitchNetwork />
      </div>
    </div>
  );
};

export default Wallet;
