import { InjectedConnector } from "@web3-react/injected-connector";

const STATE_CONNECT_KEY = "STATE_CONNECT";
const localStorage = typeof window !== "undefined" ? window.localStorage : null;

export const injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 10, 42, 97, 31337, 42161, 80001],
});

export const getStateConnect = () => {
  const data = localStorage?.getItem(STATE_CONNECT_KEY);
  return data ? JSON.parse(data) : null;
};

export const setStateConnect = (state: boolean) => {
  localStorage?.setItem(STATE_CONNECT_KEY, JSON.stringify(state));
};
