import TransactionList from "../../TransactionView";
import Transfer from "../../Transfer";
import Votes from "../../Votes";
import Wallet from "../../Wallet";
import "./transfer.scss";

const Main = () => {
  return (
    <>
      <h2
        style={{
          textAlign: "center",
        }}
      >
        Welcome to a decentralized Application
      </h2>
      <Wallet />
      <p
        style={{
          textAlign: "center",
        }}
      >
        -----------------------------------------------
      </p>
      <Votes />

      <hr />
      <div className="wrapper-from">
        <div className="transfer-box">
          <Transfer />
        </div>
        <div className="transaction-view">
          <TransactionList/>
        </div>
      </div>
    </>
  );
};

export default Main;
