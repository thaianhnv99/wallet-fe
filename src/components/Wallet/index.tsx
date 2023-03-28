import { useWeb3React } from "@web3-react/core";
import { UserRejectedRequestError } from "@web3-react/injected-connector";
import { Web3Provider } from "@ethersproject/providers";
import { useCallback, useEffect } from "react";
import { injected } from "../../utils/connecttors";
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

  const addressContract='0x6ce9925389763Eaac35Ba023645A9c1996Ffc464'

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
        <ETHbalance />
        <p>ChainId: {chainId}</p>
        <SwitchNetwork />
      </div>
      <hr />
      <Votes addressContract={addressContract}/>
    </div>
  );
};

export default Wallet;
