import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { Web3ReactProvider } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import Wallet from "./components/Wallet";
import Web3ReactManager from "./components/common/Web3ReactManager";

function getLibrary(provider: any): Web3Provider {
  const web3Provider = new Web3Provider(provider);
  web3Provider.pollingInterval = 12_000;
  return web3Provider;
}

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Web3ReactProvider getLibrary={getLibrary}>
      <Web3ReactManager>
        {/* <App /> */}
        <Wallet />
      </Web3ReactManager>
    </Web3ReactProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
