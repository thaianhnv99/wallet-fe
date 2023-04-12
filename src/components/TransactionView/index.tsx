import { useWeb3React } from "@web3-react/core";
import { useCallback, useEffect, useState } from "react";
import { Web3Provider } from "@ethersproject/providers";
import { useWeb3Activity } from "@hooks/useWeb3Activity";

const TransactionList = () => {
  const { library } = useWeb3React<Web3Provider>();
  const { account, hasAccount } = useWeb3Activity();
  const [list, setList] = useState<any[]>([]);

  const fetchBlock = useCallback(async () => {
    if (library) {
      const currentBlockNumber = await library.getBlockNumber();
      if (currentBlockNumber !== null) {
        for (let i = 0; i < 5; i++) {
          const numberBlockCurrent = currentBlockNumber - i;
          const block = await library
            ?.getBlock(numberBlockCurrent)
            .then((result) => result);
          for (const txHash of block.transactions) {
            const tx = await library.getTransaction(txHash);
            const isFrom =
              account?.toLocaleLowerCase() === tx.from.toLocaleLowerCase();
            const isTo =
              account?.toLocaleLowerCase() === tx.to?.toLocaleLowerCase();
            console.log("123243435");

            if (isFrom || isTo) {
              const sentBy = isFrom ? "sent" : "receive";
              console.log(
                `Transaction found on block (${sentBy})`,
                numberBlockCurrent
              );
              const data = {
                address: tx.from,
                value: Number(tx.value),
              };

              setList((prev) => [...prev, data]);
              console.log(data, tx);
            }
          }
        }
      }
    }
  }, [account, library]);

  useEffect(() => {
    let process: any;
    if (hasAccount) {
      process = setInterval(() => {
        fetchBlock();
      }, 15 * 1000);
    } else {
      clearInterval(process);
    }
    return () => {
      clearInterval(process);
    };
  }, [fetchBlock, hasAccount]);

  return (
    <>
      <h3>Transaction List</h3>
      <div>
        {list.map((item) => {
          return <p>{item.address}</p>;
        })}
      </div>
    </>
  );
};

export default TransactionList;
