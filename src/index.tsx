import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { Web3ReactProvider } from "@web3-react/core";
import { PersistGate } from "redux-persist/integration/react";
import { Web3Provider } from "@ethersproject/providers";
import Web3ReactManager from "./components/common/Web3ReactManager";
import Main from "./components/views/main";
import Layout from "./components/views/layout";
import { Provider } from "react-redux";
import { persistor, store } from "./state/store";

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
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Web3ReactProvider getLibrary={getLibrary}>
          <Web3ReactManager>
            {/* <App /> */}
            <Layout>
              <Main />
            </Layout>
          </Web3ReactManager>
        </Web3ReactProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
