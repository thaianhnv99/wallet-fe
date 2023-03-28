import { useCallback, useState } from "react";
import Coin from "../common/Coin";

const Votes = () => {
  const [eth, setEth] = useState(20);
  const [btc, setBtc] = useState(10);
  const [link, setLink] = useState(50);

  const getRatio = useCallback(
    (tick: string, setPerc: (num: number) => void) => {
      const ratio = 2;
    },
    []
  );
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        gap: "1rem",
        justifyContent: "center",
        marginTop: "5rem",
      }}
    >
      <Coin perc={eth} token={"ETH"} setPerc={setEth} />
      <Coin perc={btc} token={"BTC"} setPerc={setBtc} />
      <Coin perc={link} token={"LINK"} setPerc={setLink} />
    </div>
  );
};

export default Votes;
