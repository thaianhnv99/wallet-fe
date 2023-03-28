import { useWeb3React } from "@web3-react/core";
import { UserRejectedRequestError } from "@web3-react/injected-connector";
import { Web3Provider } from "@ethersproject/providers";
import { useCallback, useEffect } from "react";
import { injected } from "../../utils/connecttors";
import { formatAddress } from "../../utils/helpers";
import ETHbalanceSWR from "./ETHBalanceSWR";
import SwitchNetwork from "./SwitchNetwork";
import Coin from "../common/Coin";
import Votes from "../Votes";
import ReadERC20 from "../ReadERC20";

const Wallet = () => {
  const {
    chainId,
    account,
    activate,
    deactivate,
    setError,
    active,
    library: provider,
    connector,
  } = useWeb3React<Web3Provider>();

  console.log(chainId, account, active, provider, connector);

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
  }, [activate, setError]);

  const handleDisconnect = useCallback(() => {
    deactivate();
  }, [deactivate]);

  useEffect(() => {
    if (provider) {
      handleConnect();
    }
  }, [handleConnect, provider]);

  const addressContract='0x5fbdb2315678afecb367f032d93f642f64180aa3'

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
        <button hidden={!!(active && account)} onClick={handleConnect}>
          Connect Metamark
        </button>
        <button
          style={{
            marginLeft: "10px",
          }}
          hidden={!(active || account)}
          onClick={handleDisconnect}
        >
          Disconnect
        </button>
      </div>

      <div
        hidden={!(active || account)}
        style={{
          width: "min-content",
          margin: "auto",
          textAlign: "left",
          padding: "1rem",
        }}
      >
        <p>Address: {formatAddress(account || "", 4)}</p>
        <ETHbalanceSWR />
        <p>ChainId: {chainId}</p>
        <SwitchNetwork />
      </div>
      <hr />
      <ReadERC20 addressContract={addressContract} />
      <hr />
      <Votes />
    </div>
  );
};

export default Wallet;
