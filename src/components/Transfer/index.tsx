import { ADDRESS_SC_TOKEN } from "../../constants/address";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Contract } from "ethers";
import abi from "../../config/abi/TtnTokenABI.json";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { formatEther, parseEther } from "@ethersproject/units";
import { isAddress } from "@ethersproject/address";
import { useAppWallet } from "../../state/info/hooks";
import { useWeb3Activity } from "../../hooks/useWeb3Activity";

const Transfer = () => {
  const { library } = useWeb3React<Web3Provider>();
  const {
    state: { chainIdApp },
  } = useAppWallet();
  const { hasAccount, account } = useWeb3Activity();
  const scAddress = ADDRESS_SC_TOKEN[chainIdApp];

  const sc = useMemo(() => {
    if (scAddress && library && hasAccount) {
      return new Contract(scAddress, abi, library);
    }
    return null;
  }, [hasAccount, library, scAddress]);

  const [isLoading, setLoading] = useState<boolean>(false);
  const [address, setAddress] = useState<string | null>();
  const [balanceByAddress, setBalanceByAddress] = useState<string | null>(null);
  const [recipientAddress, setrecipientAddress] = useState<string | null>();
  const [balanceOfRecipient, setBalanceOfRecipient] = useState<string | null>(
    null
  );
  const [amountTransfer, setAmountTransfer] = useState<number | null>();
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
    async (address: string, setBalanceOf: (value: string) => void) => {
      try {
        await sc?.balanceOf(address).then((result: any) => {
          setBalanceOf(formatEther(result));
        });
      } catch (error) {
        console.log(error);
      }
    },
    [sc]
  );

  const handleTransferTo = useCallback(async () => {
    if (!recipientAddress || !amountTransfer) return;

    setLoading(true);
    const scWithSign = new Contract(scAddress, abi, library?.getSigner());
    try {
      const amountWei = parseEther(amountTransfer.toString());
      const tx = await scWithSign?.transfer(recipientAddress, amountWei);
      await tx.wait();

      console.log("success");
      fetchBalanceOfAddress(account || "", setBalanceByAddress);
      fetchBalanceOfAddress(recipientAddress, setBalanceOfRecipient);
      setAmountTransfer(null);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }, [
    account,
    amountTransfer,
    fetchBalanceOfAddress,
    library,
    recipientAddress,
    scAddress,
  ]);

  useEffect(() => {
    fetchTokenInfo();
  }, [fetchTokenInfo]);

  useEffect(() => {
    if (account && hasAccount) {
      setAddress(account);
      fetchBalanceOfAddress(account, setBalanceByAddress);
    }
  }, [account, hasAccount, fetchBalanceOfAddress]);

  useEffect(() => {
    if (recipientAddress && isAddress(recipientAddress)) {
      fetchBalanceOfAddress(recipientAddress, setBalanceOfRecipient);
    }
  }, [fetchBalanceOfAddress, recipientAddress]);
  return (
    <div hidden={!hasAccount}>
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
          <button
            onClick={() =>
              fetchBalanceOfAddress(address || "", setBalanceByAddress)
            }
          >
            Get
          </button>
        </div>
        <p>
          Balance: {balanceByAddress} ({tokenInfo?.symbol})
        </p>
      </div>
      <hr />
      <div>
        <h4>*Transfer to::</h4>
        <div>
          <span>
            Receiving address{" "}
            {balanceOfRecipient
              ? `(${balanceOfRecipient} ${tokenInfo?.symbol})`
              : ""}
          </span>
          <input
            value={recipientAddress || ""}
            onChange={(e) => setrecipientAddress(e.target.value)}
            style={{
              width: "100%",
            }}
          />
        </div>
        <div
          style={{
            marginTop: "1rem",
          }}
        >
          <span>Amount ({tokenInfo?.symbol})</span>
          <input
            value={amountTransfer || ""}
            onChange={(e) => {
              const amount = Number(e.target.value);
              if (!isNaN(amount)) {
                setAmountTransfer(amount);
              }
            }}
            style={{
              width: "100%",
            }}
          />
        </div>
        <button
          style={{
            marginTop: "1rem",
          }}
          disabled={isLoading}
          onClick={handleTransferTo}
        >
          {isLoading ? "Loading..." : "Submit"}
        </button>
      </div>
    </div>
  );
};

export default Transfer;
