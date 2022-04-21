/** @format */

import React, { FC, useMemo } from "react";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  getLedgerWallet,
  getPhantomWallet,
  getSlopeWallet,
  getSolflareWallet,
  getSolletExtensionWallet,
  getSolletWallet,
  getTorusWallet,
} from "@solana/wallet-adapter-wallets";
import {
  WalletModalProvider,
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl } from "@solana/web3.js";
import { GetNft } from "./GetNft";
import { Card } from "react-bootstrap";
import { toast } from "react-toastify";
import RobotClub from "../src/components/RobotClub";
// Default styles that can be overridden by your app
require("@solana/wallet-adapter-react-ui/styles.css");

export const PhantomWallet = () => {
  // Can be set to 'devnet', 'testnet', or 'mainnet-beta'
  const network = WalletAdapterNetwork.Devnet;

  const handleClick = () => {
    toast.warning("Disconnected", {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    // window.location.reload(false);
  };
  // You can also provide a custom RPC endpoint
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  // @solana/wallet-adapter-wallets includes all the adapters but supports tree shaking --
  // Only the wallets you configure here will be compiled into your application
  const wallets = useMemo(
    () => [
      getPhantomWallet(),
      getSlopeWallet(),
      getSolflareWallet(),
      getTorusWallet({
        options: { clientId: "Get a client ID @ https://developer.tor.us" },
      }),
      getLedgerWallet(),
      getSolletWallet({ network }),
      getSolletExtensionWallet({ network }),
    ],
    [network]
  );

  console.log(wallets, "wallets");

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <div
            style={{
              width: "50%",
              display: "flex",
              margin: "auto",
              justifyContent: "center",
              marginBottom: "20px",
            }}
          >
            <WalletMultiButton
              style={{
                fontSize: 15,
                lineHeight: "15px",
                backgroundColor: "red",
              }}
            />
            <WalletDisconnectButton
              onClick={handleClick}
              style={{
                fontSize: 15,
                lineHeight: "15px",
                backgroundColor: "red",
                marginLeft: "5px",
              }}
            />
          </div>
          <div style={{ width: "50%", margin: "auto" }}>
            <p
              style={{
                textAlign: "left",
                marginTop: "10px",
                color: "white",
                fontSize: "18px",
              }}
            >
             OUR STORY

            </p>
            <p
              style={{
                textAlign: "left",
                marginTop: "5px",
                color: "white",
                fontSize: "18px",
              }}
            >
              We are SolanaSuccubus, we are striving to create a community worth being a part of. Our story started with the sketch to the left. We set out to design a collection of 888 seductive succubus's that would eventually be set free from the darks of the hidden blockchain. In our mission to find new owners for these luxury beings the Incubus soared into sight disrupting the plains. As these two set out on their path to freedom, new life was formed with satisfying rewards for all who hold
            </p>
            <ul style={{ textAlign: "left", marginTop: "10px" }}>
              {/* <li style={{ color: "white", fontSize: "18px" }}>
                Thumb Warrior’s earn 5 $THUMB per day
              </li>
              <li style={{ color: "white", fontSize: "18px" }}>
                Minimum Staking Period is 7 days before you can claim $THUMB
              </li>
              <li style={{ color: "white", fontSize: "18px" }}>
                $THUMB token can only be claimed after unstaking your Thumb
                Warrior
              </li>
              <li style={{ color: "white", fontSize: "18px" }}>
                Total supply of 10,000,000 $THUMB
              </li> */}

              {/* <li	style={{ color: "white", fontSize: "18px" }}>
	  10 $RMI per monkey daily (harvested after 7 days of staking)
      </li> */}
            </ul>
            <p
              style={{
                textAlign: "left",
                marginTop: "10px",
                color: "white",
                fontSize: "18px",
              }}
            >
              Holding a Succubus gives you a sense of common identity and access to a greater pool of like-minded individuals. Being part of Solana Succubus comes with a lot of perks, most notably the bounty program is sure to set fire to the upcoming mint phase designed to instantly reward holders of hidden traits with bounties tied to them.
            </p>
          </div>
          {/* <RobotClub /> */}
          <GetNft />
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};
