import { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { Contract } from "@ethersproject/contracts";
import { formatEther } from "@ethersproject/units";
import useSWR from "swr";
import { ERC20ABI as abi } from "../config/abi/ERC20ABI";

interface Props {
  addressContract: string;
}

const fetcher =
  (library: Web3Provider | undefined, abi: any) =>
  (...args: any) => {
    if (!library) return;

   
    
    const [arg1, arg2, params] = args;
    console.log('222222222222', arg2, args);
    const address = arg1;
    const method = arg2;
    const contract = new Contract(address, abi, library);
    console.log('111111111111', method, contract);
    
    return contract[method](...params);
  };

export default function ReadERC20(props: Props) {
  const addressContract = props.addressContract;
  const [symbol, setSymbol] = useState<string>("");
  const [totalSupply, setTotalSupply] = useState<string>();

  const { account, active, library } = useWeb3React<Web3Provider>();

  const { data: balance, mutate } = useSWR(
    [addressContract, "balanceOf", account],
    {
      fetcher: fetcher(library, abi),
    }
  );

  useEffect(() => {
    if (!(active && account && library)) return;

    const erc20: Contract = new Contract(addressContract, abi, library);
    library.getCode(addressContract).then((result: string) => {
      //check whether it is a contract
      if (result === "0x") return;

      erc20
        .symbol()
        .then((result: string) => {
          setSymbol(result);
        })
        .catch("error", console.error);

      erc20
        .totalSupply()
        .then((result: string) => {
          setTotalSupply(formatEther(result));
        })
        .catch("error", console.error);
    });
    //called only when changed to active
  }, [account, active, addressContract, library]);

  useEffect(() => {
    if (!(active && account && library)) return;

    const erc20: Contract = new Contract(addressContract, abi, library);

    // listen for changes on an Ethereum address
    console.log(`listening for Transfer...`);

    const fromMe = erc20.filters.Transfer(account, null);
    erc20.on(fromMe, (from, to, amount, event) => {
      console.log("Transfer|sent", { from, to, amount, event });
      mutate(undefined, true);
    });

    const toMe = erc20.filters.Transfer(null, account);
    erc20.on(toMe, (from, to, amount, event) => {
      console.log("Transfer|received", { from, to, amount, event });
      mutate(undefined, true);
    });

    // remove listener when the component is unmounted
    return () => {
      erc20.removeAllListeners(toMe);
      erc20.removeAllListeners(fromMe);
    };

    // trigger the effect only on component mount
  }, [active, account, library, addressContract, mutate]);

  return (
    <div>
      <p>ERC20 Contract: {addressContract}</p>
      <p>
        token totalSupply:{totalSupply} {symbol}
      </p>
      <p>
        ClassToken in current account:
        {balance ? parseFloat(formatEther(balance)).toFixed(1) : " "} {symbol}
      </p>
    </div>
  );
}
