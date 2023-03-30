import { ADDRESS_SC_TOKEN } from "../../constants/address";
import { getStateConnect } from "../../utils/connecttors";
import { CHAINS_ID } from "../../constants/chains";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Contract } from "ethers";
import abi from "../../config/abi/TtnTokenABI.json";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { formatEther } from "@ethersproject/units";

const Transfer = () => {
  const { library, account, active } = useWeb3React<Web3Provider>();
  const chainIdApp = getStateConnect();
  const scAddress = ADDRESS_SC_TOKEN[chainIdApp as CHAINS_ID];
  const sc = useMemo(() => {
    if (library && active && account) {
      return new Contract(scAddress, abi, library);
    } else {
      return null;
    }
  }, [account, active, library, scAddress]);

  const [address, setAddress] = useState<string | null>();
  const [balanceByAddress, setBalanceByAddress] = useState<string | null>(null);
  const [tokenInfo, setTokenInfo] = useState<{
    name?: string;
    symbol?: string;
    totalSupply?: number;
  } | null>(null);

  const fetchTokenInfo = useCallback(async () => {
    try {
      if (!sc) return;

      const name = await sc?.name().then((value: string) => value);
      const symbol = await sc?.symbol().then((value: string) => value);
      const balance = await sc
        ?.totalSupply()
        .then((value: string) =>
          value ? parseFloat(formatEther(value)).toFixed(3) : 0
        );

      Promise.all([name, symbol, balance]).then((data) => {
        console.log(data);
        const [name, symbol, balance] = data;
        setTokenInfo({ name, symbol, totalSupply: balance });
      });
    } catch (error) {
      console.log(error);
    }
  }, [sc]);

  const fetchBalanceOfAddress = useCallback(
    async (address: string) => {
      try {
        await sc?.balanceOf(address).then((result: any) => {
          setBalanceByAddress(formatEther(result));
        });
      } catch (error) {
        console.log(error);
      }
    },
    [sc]
  );

  useEffect(() => {
    fetchTokenInfo();
  }, [fetchTokenInfo]);

  useEffect(() => {
    if (account && active) {
      setAddress(account);
      fetchBalanceOfAddress(account);
    }
  }, [account, active, fetchBalanceOfAddress]);
  return (
    <div>
      <div>
        <h3>Read from smart contract</h3>
        <input
          value={scAddress}
          disabled
          style={{
            width: "100%",
          }}
        />
      </div>
      <div>
        <h4>*Get TOKEN info::</h4>
        <p>Name: {tokenInfo?.name}</p>
        <p>Symbol: {tokenInfo?.symbol}</p>
        <p>Total supply: {tokenInfo?.totalSupply}</p>
      </div>
      <hr />
      <div>
        <h4>*Get balance::</h4>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "0.5rem",
          }}
        >
          <input
            value={address || ""}
            onChange={(e) => setAddress(e.target.value)}
            style={{
              width: "100%",
            }}
          />
          <button onClick={() => fetchBalanceOfAddress(address || "")}>
            Get
          </button>
        </div>
        <p>Balance: {balanceByAddress}</p>
      </div>
      <hr />
    </div>
  );
};

export default Transfer;
