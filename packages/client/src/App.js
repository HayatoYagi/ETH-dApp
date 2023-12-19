import React, { useEffect, useState } from "react";

import "./App.css";

export default function App() {
  const wave = () => {};

  const [currentAccount, setCurrentAccount] = useState("");
  useEffect(() => {
    console.log("currentAccount: ", currentAccount);
  }, [currentAccount]);

  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        console.log("Make sure you have MetaMask!");
        return;
      }
      console.log("We have the ethereum object", ethereum);
      const accounts = await ethereum.request({ method: "eth_accounts" });
      if (accounts.length > 0) {
        console.log("Found an authorized accounts: ", accounts);
        setCurrentAccount(accounts[0]);
      } else {
        console.log("No authorized account found");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const connectWallet = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log("Connected: ", accounts);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  return (
    <div className="mainContainer">
      <div className="dataContainer">
        <div className="header">
          <span role="img" aria-label="hand-wave">
            👋
          </span>{" "}
          WELCOME!
        </div>
        <div className="bio">
          イーサリアムウォレットを接続して、メッセージを作成したら、
          <span role="img" aria-label="hand-wave">
            👋
          </span>
          を送ってください
          <span role="img" aria-label="shine">
            ✨
          </span>
        </div>

        <button className="waveButton" onClick={wave}>
          Wave at Me
        </button>

        <button
          className="waveButton"
          onClick={connectWallet}
          disabled={currentAccount}
        >
          {currentAccount ? "Wallet Connected" : "Connect Wallet"}
        </button>
      </div>
    </div>
  );
}
