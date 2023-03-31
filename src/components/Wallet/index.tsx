import { formatAddress } from "../../utils/helpers";
import SwitchNetwork from "../SwitchNetwork";
import ETHbalance from "../ETHBalance";
import { useAppWallet } from "../../state/info/hooks";
import { useWeb3Activity } from "../../hooks/useWeb3Activity";

const Wallet = () => {
  const {
    connect,
    disconnect,
    state: { chainIdApp },
  } = useAppWallet();
  const {
    context: { account },
    hasAccount,
  } = useWeb3Activity();

  return (
    <div
      className="App"
      style={{
        textAlign: "center",
        margin: "2rem",
      }}
    >
      <div>
        <button hidden={hasAccount} onClick={connect}>
          Connect Metamark
        </button>
        <button
          style={{
            marginLeft: "10px",
          }}
          hidden={!hasAccount}
          onClick={disconnect}
        >
          Disconnect
        </button>
      </div>

      <div
        hidden={!hasAccount}
        style={{
          margin: "auto",
          textAlign: "center",
          padding: "1rem",
        }}
      >
        <p>Address: {formatAddress(account || "", 4)}</p>
        <ETHbalance />
        <p>ChainId: {chainIdApp}</p>
        <SwitchNetwork />
      </div>
    </div>
  );
};

export default Wallet;
