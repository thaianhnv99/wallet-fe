import { useCallback, useState, useMemo, useEffect } from "react";
import { BigNumber, Signer, ethers } from "ethers";

declare global {
  interface Window {
    ethereum?: any;
  }
}

function App() {
  const [provider, setProvider] = useState<any>(null);
  const [defaultAccount, setDefaultAccount] = useState<string | null>(null);
  const [userBalance, setUserBalance] = useState<string | null>(null);

  useEffect(() => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      setProvider(provider);
      console.log("Installed provider");
    } catch (error) {
      console.log("Install provider");
    }
  }, []);

  const getUserBalanceByAddress = useCallback(
    async (address: string) => {
      const balance = await provider.getBalance(address, "latest");
      console.log(balance);
    },
    [provider]
  );

  const handleChangeAccount = useCallback(
    async (newAccount: Signer) => {
      const address = await newAccount.getAddress();
      setDefaultAccount(address);

      const balance = await newAccount.getBalance();
      setUserBalance(ethers.utils.formatEther(balance));
      await getUserBalanceByAddress(address);
    },
    [getUserBalanceByAddress]
  );

  const handleConnect = useCallback(() => {
    if (window.ethereum) {
      try {
        provider.send("eth_requestAccounts", []).then(async () => {
          await handleChangeAccount(provider.getSigner());
        });
      } catch (error) {
        console.log(error);
      }
    }
  }, [handleChangeAccount, provider]);

  return (
    <div
      className="App"
      style={{
        textAlign: "center",
        margin: "2rem",
      }}
    >
      <h2>Welcome to a decentralized Application</h2>
      <button onClick={handleConnect}>
        {!!defaultAccount ? "Connected" : "Connect Metamark"}
      </button>
      <div
        hidden={!defaultAccount}
        style={{
          border: "1px solid red",
          height: "300px",
          width: "600px",
          margin: "auto",
          marginTop: "5rem",
        }}
      >
        <p>Address: {defaultAccount}</p>
        <p>Balance: {userBalance}</p>
      </div>
    </div>
  );
}

export default App;
