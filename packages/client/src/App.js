import { ethers } from "ethers";
import React, { useEffect, useState } from "react";

import "./App.css";

import abi from './utils/WavePortal.json';

export default function App() {
  const contractAddress = "0x6d829160212c00a52c630d8272bab4b0b90b9c50";
  const contractABI = abi.abi;

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

  const wave = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const wavePortalContract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );
      const count = await wavePortalContract.getTotalWaves();
      console.log("Retrieved total wave count...", count.toNumber());
      const waveTxn = await wavePortalContract.wave();
      console.log("Mining...", waveTxn.hash);
      await waveTxn.wait();
      console.log("Mined -- ", waveTxn.hash);
      const newCount = await wavePortalContract.getTotalWaves();
      console.log("Retrieved total wave count...", newCount.toNumber());
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

        <button
          className="waveButton"
          onClick={wave}
          disabled={!currentAccount}
        >
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
