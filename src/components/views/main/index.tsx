import Transfer from "../../Transfer";
import Votes from "../../Votes";
import Wallet from "../../Wallet";

const Main = () => {
  return (
    <>
      <Wallet />
      <hr />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexBasis: "50%",
        }}
      >
        <div
          style={{
            width: "100%",
            borderRight: "1px solid red",
            paddingRight: "1rem",
          }}
        >
          <Votes />
        </div>
        <div
          style={{
            width: "100%",
            padding: "1rem",
            paddingTop: '0'
          }}
        >
          <Transfer />
        </div>
      </div>
    </>
  );
};

export default Main;
