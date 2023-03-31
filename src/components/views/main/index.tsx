import Transfer from "../../Transfer";
import Votes from "../../Votes";
import Wallet from "../../Wallet";

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
      <p style={{
        textAlign: 'center'
      }}>-----------------------------------------------</p>
      <Votes />

      <hr />
      <div
        style={{
          width: "50vw",
          margin: "auto",
        }}
      >
        <Transfer />
      </div>
    </>
  );
};

export default Main;
