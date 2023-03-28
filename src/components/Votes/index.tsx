import Coin from "../common/Coin";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { Contract } from "@ethersproject/contracts";
import abi from "../../config/abi/ERC20ABI.json";

const Votes = ({ addressContract }: { addressContract: any }) => {
  const { account, active, library } = useWeb3React<Web3Provider>();
  const [eth, setEth] = useState(0);
  const [btc, setBtc] = useState(0);
  const [link, setLink] = useState(0);

  const contract = useMemo(() => {
    return new Contract(addressContract, abi, library);
  }, [addressContract, library]);

  const getTicker = useCallback(
    async (numArr: number) => {
      try {
        return await contract["tickersArray"](numArr).then(
          (result: string) => result
        );
      } catch (error) {
        console.log(error);
      }
    },
    [contract]
  );

  const getRatio = useCallback(
    async (tick: string, setPerc: (num: number) => void) => {
      const { up, down } = await contract["getVotes"](tick).then(
        (result: any) => result
      );

      const upNum = Number(up);
      const downNum = Number(down);
      const ratio = Math.round((upNum / (upNum + downNum)) * 100);

      console.log(ratio);

      setPerc(ratio);
    },
    [contract]
  );

  const fetchTicker = useCallback(async () => {
    // const eth = await getTicker(0);
    // const btc = await getTicker(1);
    // const link = await getTicker(2);

    getRatio("ETH", setEth);
    getRatio("BTC", setBtc);
    getRatio("LINK", setLink);
  }, [getRatio]);

  useEffect(() => {
    if (account && active) {
      fetchTicker();
    }
  }, [account, active, fetchTicker]);

  ///
  const handleVote = useCallback(
    async (tick: string, pool: boolean) => {
      const contractWithSigner = new Contract(
        addressContract,
        abi,
        library?.getSigner()
      );

      try {
        const tx = await contractWithSigner.vote(tick, pool).then(() => {
          console.log("success");
        });

        if (tx) {
          fetchTicker();
        }
      } catch (error) {
        console.log(error);
      }

      console.log(contractWithSigner);
    },
    [addressContract, fetchTicker, library]
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
      <Coin
        perc={eth}
        token={"ETH"}
        setPerc={(pool) => handleVote("ETH", pool)}
      />
      <Coin
        perc={btc}
        token={"BTC"}
        setPerc={(pool) => handleVote("BTC", pool)}
      />
      <Coin
        perc={link}
        token={"LINK"}
        setPerc={(pool) => handleVote("LINK", pool)}
      />
    </div>
  );
};

export default Votes;
