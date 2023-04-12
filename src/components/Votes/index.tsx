import Coin from "../common/Coin";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { Contract } from "@ethersproject/contracts";
import abi from "@config/abi/ERC20ABI.json";
import { ADDRESS_SC_VOTE } from "@constants/address";

const Votes = () => {
  const { account, active, library } = useWeb3React<Web3Provider>();
  const VoteSC = ADDRESS_SC_VOTE[80001];

  const [tickers, setTicker] = useState<{ token: string; perc: number }[]>([
    { token: "ETH", perc: 0 },
    { token: "BTC", perc: 0 },
    { token: "LINK", perc: 0 },
    { token: "HEX", perc: 0 },
  ]);

  const contract = useMemo(() => {
    return new Contract(VoteSC, abi, library);
  }, [VoteSC, library]);

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
    async (tick: string) => {
      const { up, down } = await contract["getVotes"](tick).then(
        (result: any) => result
      );

      const upNum = Number(up);
      const downNum = Number(down);
      const ratio = Math.round((upNum / (upNum + downNum)) * 100);
      setTicker((prev) =>
        [...prev].map((item) => {
          if (item.token === tick) {
            return { ...item, perc: ratio };
          } else {
            return item;
          }
        })
      );
    },
    [contract]
  );

  const fetchTicker = useCallback(async () => {
    // const eth = await getTicker(0);
    // const btc = await getTicker(1);
    // const link = await getTicker(2);

    getRatio("ETH");
    getRatio("BTC");
    getRatio("LINK");
  }, [getRatio]);

  useEffect(() => {
    if (account && active) {
      fetchTicker();
    }
  }, [account, active, fetchTicker]);

  ///
  const handleVote = useCallback(
    async (tick: string, pool: boolean) => {
      if (!account || !active) {
        alert("Connect metamark");
        return;
      }

      const contractWithSigner = new Contract(
        VoteSC,
        abi,
        library?.getSigner()
      );

      try {
        const tx = await contractWithSigner.vote(tick, pool);
        await tx.wait();

        console.log("success", tx);
        fetchTicker();
        alert(
          `Successfull\tLink: https://mumbai.polygonscan.com/tx/${tx.hash}`
        );
      } catch (error: any) {
        alert(error.data.message);
      }
    },
    [account, active, VoteSC, fetchTicker, library]
  );

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))",
        maxWidth: "700px",
        margin: "auto",
        gap: '1rem',
        textAlign: 'center'
      }}
    >
      {tickers.map((item, index) => {
        return (
          <Coin
            key={index}
            perc={item.perc}
            token={item.token}
            setPerc={(pool) => handleVote(item.token, pool)}
          />
        );
      })}
    </div>
  );
};

export default Votes;
