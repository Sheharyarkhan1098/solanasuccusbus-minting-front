/** @format */

import { WalletNotConnectedError } from "@solana/wallet-adapter-base";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Keypair, SystemProgram, Transaction } from "@solana/web3.js";
import * as web3 from "@solana/web3.js";
import { Token, TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { Metadata } from "@metaplex-foundation/mpl-token-metadata";
import React, { FC, useCallback, useState } from "react";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { useEffect } from "react";
import "./App.css";
import {
	getParsedNftAccountsByOwner,
	isValidSolanaAddress,
	createConnectionConfig,
} from "@nfteyez/sol-rayz";
import {
	Container,
	ProgressBar,
	Row,
	Col,
	Modal,
	Image,
	Spinner,

} from "react-bootstrap";
import axios from "axios";
// import moment from react-moment;
import moment from "moment";
import Calculation from "./components/Calculation";
import Modal1 from "./components/Modal";

const {
	struct,
	u32,
	ns64,
	nu64,
	nu64be,
	u8,
} = require("@solana/buffer-layout");
// const baseURL = "http://localhost:3000";
// const baseURL = "http://64.225.77.239";
const baseURL = "https://stake.solanasuccubus.io";


export const GetNft = () => {
	const { connection } = useConnection();
	const { publicKey, sendTransaction } = useWallet();
	const [tokens, setTokens] = useState(5000);
	const [data, setData] = useState([]);
	const [images, setImages] = useState([]);
	const [showData, setShowData] = useState(false);
	const [message, setMessage] = useState("");
	const [loader, setLoader] = useState(false);
	const [stakedNft, setStakedNft] = useState();
	const [imgLoader, setImageLoader]=useState(false);
	const [imgLoader2, setImageLoader2]=useState(false);

	useEffect(() => {
		if (publicKey) {
			toast.success("Connected", {
				position: "bottom-left",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
			checkNFTs();
			setImageLoader2(true)


		}
	}, [publicKey]);
	console.log(publicKey, "publicKey");

	const checkNFTs = async () => {
		setMessage("Fetching NFTs....");
	
		const connect = createConnectionConfig(web3.clusterApiUrl("mainnet-beta"));
	
		let ownerToken = publicKey;
		
		const result = isValidSolanaAddress(ownerToken);
		console.log("result", result);
		
		const nfts = await Metadata.findDataByOwner(connect, publicKey);
		console.log(nfts, "nfts");
		setData(nfts);
		// get specific CM nft's by just changing cmId
	
		//mainnet cmid start
		let cmId = "7PMQeqNfYTnJmWqRJ65Ex7rtJCExFGy4bdBhcJhg8GBd";

		
		const filtered = [];
        nfts.map((obj) => {
			if (
				obj?.data?.creators?.length > 0 &&
                obj?.data?.creators[0].address === cmId
				
				) {
					filtered.push(obj);
				}
			});
			
			console.log(filtered,"specific CM nft's");
		// let filtered = nfts.filter((obj) => obj.data.creators[0].address === cmId);
		let imageData = [];

		await Promise.all(
			filtered.map(async (obj) => {
				const response = await fetch(obj.data.uri);
				const result = await response.json();
				imageData.push({
					name: obj.data.name,
					mint: obj.mint,
					src: result.image,
				});
			})
		);

		setTimeout(() => {
			console.log(imageData, "imageResult");
			setImages(imageData);
			setShowData(true);
			setMessage("");
		}, 5000);
	};

	

	// var i = 0;
	// const move = () => {
	// 	if (i == 0) {
	// 		i = 1;
	// 		var elem = document.getElementById("myBar");
	// 		var width = 1;
	// 		var id = setInterval(frame, 100);
	// 		function frame() {
	// 			if (width >= 100) {
	// 				clearInterval(id);
	// 				i = 0;
	// 			} else {
	// 				width++;
	// 				elem.style.width = width + "%";
	// 			}
	// 		}
	// 	}
	// };

	const stakeApi = async (walletKey, nftKey, url, name) => {
		axios
			.post(
				`${baseURL}/stake`,
				{ wallet: walletKey, nftAddress: nftKey, url, name },
				{
					headers: {
						"Content-Type": "application/json",
						"Access-Control-Allow-Origin": "*",
						"Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
					},
				}
			)
			.then((response) => {
				console.log("Response: ", response);
				getStakeData(walletKey);
				handleClose();
			})
			.catch((err) => {
				console.log("Error:", err);
				handleClose();
			});
	};

	const stake = async (nft, publicKey, sendTransaction, url, name) => {
		handleShow();
		setLoader(true);
		console.log("Check");
		console.log(nft, "nft");
		console.log(publicKey, "publicKey");
		console.log(sendTransaction, "sendTransaction");

		if (!publicKey) throw new WalletNotConnectedError();

		// let program_id = new web3.PublicKey(
		// 	"ECoegv7FCc7yjCJ131PN3vFUbz1eJ5UdHS3RLNtvL8vz"
		// );

		// let program_id = new web3.PublicKey(
		// 	"E8iVZ3venXrXUqTXQSEwKGbE2hX5tAWBmKDoMKo3Y4i1"
		// );

		// let program_id = new web3.PublicKey(
		// 	"4ayF4YuQMVTCavci2w7ZvK51ZmbVz6vKPWKqJ1DSiQkB"
		// );
		// let program_id = new web3.PublicKey(
		// 	"3wVscJPJ59dbpmCzkvNEXuYc8EX6hXsQXkBeeTk1sebY"
		// );
		// let program_id = new web3.PublicKey(
		// 	"DsxsByt2bmWUdyhJp2hoi6kDzovEoish1FJVX6Lubd96"
		// );
		
		//miannet
		let program_id = new web3.PublicKey(
			"47Mg4TXCA7pm8ggBoFKez6EFh7Dpvi48evDBJh9n4n8S"
		);
		let nftPubkey = new web3.PublicKey(nft);
		// .then((check) => {
		// 	console.log("check:", check);
		// })
		// .catch((error) => {
		// 	console.log("check:", error);
		// });
		// console.log("nftPubkey: ", nftPubkey.isOnCurve());
		// console.log("nftPubkey: ", nftPubkey);

		let rent = new web3.PublicKey(
			"SysvarRent111111111111111111111111111111111"
		);

		let TOKEN_PROGRAM_ID = new web3.PublicKey(
			"TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
		);

		let SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID = new web3.PublicKey(
			"ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
		);

		const TOKEN_METADATA_PROGRAM = new web3.PublicKey(
			"metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s"
		); // Added new
		const CANDY_MACHINE_V2_PROGRAM = new web3.PublicKey(
			"cndy3Z4yapfJBmL3ShUp5exZKqR3z33thTzeNMm2gRZ"
		); //Added new

		// const CANDY_MACHINE_ID = new web3.PublicKey(
		// 	"5dRqRddNxD3tTuuRVVaSWYCErJHSvtZNnm2qtoGxwkYq"
		// );
		// const CANDY_MACHINE_ID = new web3.PublicKey(
		// 	"5k2EPeEp4ZZaRKdW7uDvTxwoRgYkatk15LEhRPYXhaxD"
		// );
		// const CANDY_MACHINE_ID = new web3.PublicKey(
		// 	"3nU7G5LxZ4NdAZvLtLRnNBGVifvGNK5s8UWbtACAgsUT"
		// );
		
		//mainnet
		const CANDY_MACHINE_ID = new web3.PublicKey(
			"7PMQeqNfYTnJmWqRJ65Ex7rtJCExFGy4bdBhcJhg8GBd"
		);
		
		let connection = new web3.Connection(
			// web3.clusterApiUrl("devnet"),
			web3.clusterApiUrl("mainnet-beta"),
			"confirmed"
		);

		// let reward_mint = new web3.PublicKey(
		// 	"D2D6M8p5TGe2PphL7VacmVwbTGNyr22GAZ4qcqTFVn46"
		// );
		// let reward_mint = new web3.PublicKey(
		// 	"9SWHSxRbexQDjNgCgh5GEeyESv2vCAWo2sZf45xHr18h"
		// );
		// let reward_mint = new web3.PublicKey(
		// 	"C44md6V2ixneLTfnZMcNnFrYL3oFhgVhmjTCc1dwyzf7"
		// );
		let reward_mint = new web3.PublicKey(
			"62zwAmRuZxPdpoeyhzi6L4h48axRHscBDEivCjm4ySgq"
		);
		
		//mainnet
		// let reward_mint = new web3.PublicKey(
		// 	"7eDhcd5zo6Dg3LAdezLvGMYE9xHWTzr2ayKzAhQp8DHy"
		// );

		// var metadata_enc = new TextEncoder().encode("metadata"); //Added new
		let metadata = await web3.PublicKey.findProgramAddress(
			[
				Buffer.from("metadata"),
				TOKEN_METADATA_PROGRAM.toBuffer(),
				nftPubkey.toBuffer(),
			],
			TOKEN_METADATA_PROGRAM
		); //Added new
		metadata = metadata[0];
		// let metadata_data = await connection.getAccountInfo(metadata);

		var vault_enc = new TextEncoder().encode("vault");
		let vault_pda = await web3.PublicKey.findProgramAddress(
			[vault_enc],
			program_id
		);
		// console.log("vault_pda: ", vault_pda);
		vault_pda = vault_pda[0]; //IMPORTANT
		let raw_stake_data = await web3.PublicKey.findProgramAddress(
			[nftPubkey.toBuffer()],
			program_id
		);
		// console.log("raw_stake_data: ", raw_stake_data.toString());
		let stake_data = raw_stake_data[0];

		let source = (
			await web3.PublicKey.findProgramAddress(
				[
					publicKey.toBuffer(),
					TOKEN_PROGRAM_ID.toBuffer(),
					nftPubkey.toBuffer(),
				],
				SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID
			)
		)[0]; //Done
		let destanation = (
			await web3.PublicKey.findProgramAddress(
				[
					vault_pda.toBuffer(),
					TOKEN_PROGRAM_ID.toBuffer(),
					nftPubkey.toBuffer(),
				],
				SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID
			)
		)[0]; //Done
		let metadataPDA = await Metadata.getPDA(new web3.PublicKey(nftPubkey));
		let tokenMetadata = await Metadata.load(connection, metadataPDA);
		console.log("tokenMetadata", tokenMetadata);

		let wl_data_address = await web3.PublicKey.findProgramAddress(
			[Buffer.from("whitelist"), CANDY_MACHINE_ID.toBuffer()],
			program_id
		);
		wl_data_address = wl_data_address[0];
		// console.log("Publickey: ", publicKey.toString());
		// console.log("NFTpubkey: ", nftPubkey.toString());
		// console.log("Metadata: ", metadata.toString());
		// console.log("metadata_data: ", metadata_data.toString());
		// console.log("vault_pda: ", vault_pda.toString());
		// console.log("source: ", source.toString());
		// console.log("destanation: ", destanation.toString());
		// console.log("stake_data: ", stake_data.toString());
		// console.log("wl_data_address: ", wl_data_address.toString());

		let keys = [
			{ pubkey: publicKey, isSigner: true, isWritable: true }, //Done
			{ pubkey: nftPubkey, isSigner: false, isWritable: false }, //Done
			{ pubkey: metadata, isSigner: false, isWritable: false }, //Done
			{ pubkey: vault_pda, isSigner: false, isWritable: false }, //Done
			{ pubkey: source, isSigner: false, isWritable: true }, //Done
			{ pubkey: destanation, isSigner: false, isWritable: true }, //Done
			{ pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false }, //Done
			{
				pubkey: web3.SystemProgram.programId,
				isSigner: false,
				isWritable: false,
			}, //Done
			{ pubkey: rent, isSigner: false, isWritable: false }, //Done
			{
				pubkey: SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID,
				isSigner: false,
				isWritable: false,
			},
			{ pubkey: stake_data, isSigner: false, isWritable: true }, //Done
			{ pubkey: wl_data_address, isSigner: false, isWritable: true }, //Done
		];

		let allocateTransaction = new Transaction({
			feePayer: publicKey,
		});

		const commandDataLayout = struct([
			u8("instruction"),
			nu64("nft"),
			// nu64("lock_period"),
		]);

		let data = Buffer.alloc(1024);
		{
			const encodeLength = commandDataLayout.encode(
				{
					instruction: 1,
					nftPubkey,
					// lock_period,
				},
				data
			);
			data = data.slice(0, encodeLength);
		}

		allocateTransaction.add(
			new web3.TransactionInstruction({
				keys,
				programId: program_id,
				data,
			})
		);

		try {
			var signature = await sendTransaction(allocateTransaction, connection);

			const result = await connection.confirmTransaction(
				signature,
				"processed"
			);
			// move();

			if (result.value.err) {
				setLoader(false);

				console.log("STAKING", result.value.err);
				toast.error(`Error! ${result.value.err}`, {
					position: "bottom-left",
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
				}
				);
				handleClose();

			} else {
				// stakeApi(publicKey.toString(), nft, url, name);
				console.log("transaction confirmed STAKING", signature);
				// setLoader(false);
				// checkNFTs();
				// toast.success("Success! Staked Successfully.", {
				// 	position: "bottom-left",
				// 	autoClose: 5000,
				// 	hideProgressBar: false,
				// 	closeOnClick: true,
				// 	pauseOnHover: true,
				// 	draggable: true,
				// 	progress: undefined,
				// });
				// handleClose();
			}
		} catch (e) {
			console.log("error STAKING:", e);
			setLoader(false);
			toast.error(`Error! ${e}`, {
				position: "bottom-left",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
			// alert("Error: ", e);
			handleClose();
		}
//added sir Farhan code start

let flag = false;

        while (!flag) {
            console.log("Check While: ", signature);
            var log;
            await Promise.all(
                setTimeout(async () => {
                    log = await connection.getTransaction(signature);
                    console.log("log: ", await connection.getTransaction(signature));
                    if (log !== null) {
                        // console.log("Break");
                        if (
                            log.meta.postTokenBalances[0].uiTokenAmount.uiAmount <
                            log.meta.preTokenBalances[0].uiTokenAmount.uiAmount
                        ) {
                            console.log("Staked");

                            setTimeout(() => {
								stakeApi(publicKey.toString(), nft, url, name);
								checkNFTs();
                                toast.success("Success! NFT Staked!", {
                                    position: "bottom-left",
                                    autoClose: 5000,
                                    hideProgressBar: false,
                                    closeOnClick: true,
                                    pauseOnHover: true,
                                    draggable: true,
                                    progress: undefined,
                                });
                                setLoader(true);
								handleClose();
                            }, 4000);
                        } else {
                            console.log("Error");
                            setTimeout(() => {
                                toast.error("Error!" , {
                                    position: "bottom-left",
                                    autoClose: 5000,
                                    hideProgressBar: false,
                                    closeOnClick: true,
                                    pauseOnHover: true,
                                    draggable: true,
                                    progress: undefined,
                                });

                            }, 4000);
                        }
                        flag = true;
                        console.log("Break");
                        // break;
                    }
                }, 3000)
            );
        }

		//sir frhan code end

	};

	const unstakeApi = async (walletKey, nftKey) => {
		axios
			.delete(`${baseURL}/unstake/${nftKey}`, {
				headers: {
					"Content-Type": "application/json",
					"Access-Control-Allow-Origin": "*",
					"Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
				},
			})
			.then((response) => {
				console.log("Response: ", response);
				checkNFTs();
				getStakeData(walletKey);
			})
			.catch((err) => {
				console.log("Error:", err);
			});
	};

	const getStakeData = async (walletKey) => {
		axios
			.get(`${baseURL}/stakeData/${walletKey.toString()}`, {
				headers: {
					"Content-Type": "application/json",
					"Access-Control-Allow-Origin": "*",
					"Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
				},
			})
			.then((response) => {
				setStakedNft(response.data);
				console.log(" getStakeData Response: ", response.data);
				setLoader(false);
			})
			.catch((err) => {
				console.log("Error:", err);
			});
	};

	useEffect(() => {
		if (publicKey) {
			console.log("Check");
			getStakeData(publicKey.toString());
			setImageLoader(true);

		}
	}, [publicKey]);

	// useEffect(() => {
	//   if (publicKey) {
	//     console.log("Check");
	//     checkNFTs();
	//     getStakeData(publicKey.toString());
	//   }
	// }, [loader]);

	const unstake = async (nft, publicKey, sendTransaction) => {
		setLoader(true);
		handleShow();
		console.log("Check");
		if (!publicKey) throw new WalletNotConnectedError();

		// let program_id = new web3.PublicKey(
		// 	"ECoegv7FCc7yjCJ131PN3vFUbz1eJ5UdHS3RLNtvL8vz"
		// );

		// let program_id = new web3.PublicKey(
		// 	"E8iVZ3venXrXUqTXQSEwKGbE2hX5tAWBmKDoMKo3Y4i1"
		// );

		// let program_id = new web3.PublicKey(
		// 	"4ayF4YuQMVTCavci2w7ZvK51ZmbVz6vKPWKqJ1DSiQkB"
		// );
		// let program_id = new web3.PublicKey(
		// 	"3wVscJPJ59dbpmCzkvNEXuYc8EX6hXsQXkBeeTk1sebY"
		// );
		// let program_id = new web3.PublicKey(
		// 	"DsxsByt2bmWUdyhJp2hoi6kDzovEoish1FJVX6Lubd96"
		// );
		
		// mainnet
		let program_id = new web3.PublicKey(
			"47Mg4TXCA7pm8ggBoFKez6EFh7Dpvi48evDBJh9n4n8S"
		);
		

		let nftPubkey = new web3.PublicKey(nft);
		// console.log("nftPubkey: ", nftPubkey);

		let rent = new web3.PublicKey(
			"SysvarRent111111111111111111111111111111111"
		);

		let TOKEN_PROGRAM_ID = new web3.PublicKey(
			"TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
		);

		let SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID = new web3.PublicKey(
			"ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
		);

		const TOKEN_METADATA_PROGRAM = new web3.PublicKey(
			"metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s"
		); // Added new
		const CANDY_MACHINE_V2_PROGRAM = new web3.PublicKey(
			"cndy3Z4yapfJBmL3ShUp5exZKqR3z33thTzeNMm2gRZ"
		); //Added new

		// const CANDY_MACHINE_ID = new web3.PublicKey(
		// 	"5dRqRddNxD3tTuuRVVaSWYCErJHSvtZNnm2qtoGxwkYq"
		// );

		// const CANDY_MACHINE_ID = new web3.PublicKey(
		// 	"5k2EPeEp4ZZaRKdW7uDvTxwoRgYkatk15LEhRPYXhaxD"
		// );
		// const CANDY_MACHINE_ID = new web3.PublicKey(
		// 	"3nU7G5LxZ4NdAZvLtLRnNBGVifvGNK5s8UWbtACAgsUT"
		// );
		
		// mainnet
		const CANDY_MACHINE_ID = new web3.PublicKey(
			"7PMQeqNfYTnJmWqRJ65Ex7rtJCExFGy4bdBhcJhg8GBd"
		);
		

		let connection = new web3.Connection(
			// web3.clusterApiUrl("devnet"),
			web3.clusterApiUrl("mainnet-beta"),
			"confirmed"
		);

		// let reward_mint = new web3.PublicKey(
		// 	"D2D6M8p5TGe2PphL7VacmVwbTGNyr22GAZ4qcqTFVn46"
		// );
		// let reward_mint = new web3.PublicKey(
		// 	"9SWHSxRbexQDjNgCgh5GEeyESv2vCAWo2sZf45xHr18h"
		// );
		// let reward_mint = new web3.PublicKey(
		// 	"C44md6V2ixneLTfnZMcNnFrYL3oFhgVhmjTCc1dwyzf7"
		// );
		let reward_mint = new web3.PublicKey(
			"62zwAmRuZxPdpoeyhzi6L4h48axRHscBDEivCjm4ySgq"
		);
		//mainnet
		// let reward_mint = new web3.PublicKey(
		// 	"7eDhcd5zo6Dg3LAdezLvGMYE9xHWTzr2ayKzAhQp8DHy"
		// );
		
		// var metadata_enc = new TextEncoder().encode("metadata"); //Added new
		let metadata = await web3.PublicKey.findProgramAddress(
			[
				Buffer.from("metadata"),
				TOKEN_METADATA_PROGRAM.toBuffer(),
				nftPubkey.toBuffer(),
			],
			TOKEN_METADATA_PROGRAM
		); //Added new
		metadata = metadata[0];
		// let metadata_data = await connection.getAccountInfo(metadata);

		var vault_enc = new TextEncoder().encode("vault");
		let vault_pda = await web3.PublicKey.findProgramAddress(
			[vault_enc],
			program_id
		);
		// console.log("vault_pda: ", vault_pda);
		vault_pda = vault_pda[0]; //IMPORTANT
		let raw_stake_data = await web3.PublicKey.findProgramAddress(
			[nftPubkey.toBuffer()],
			program_id
		);
		// console.log("raw_stake_data: ", raw_stake_data.toString());
		let stake_data = raw_stake_data[0];

		let destanation = (
			await web3.PublicKey.findProgramAddress(
				[
					publicKey.toBuffer(),
					TOKEN_PROGRAM_ID.toBuffer(),
					nftPubkey.toBuffer(),
				],
				SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID
			)
		)[0]; //Done
		let reward_source = (
			await web3.PublicKey.findProgramAddress(
				[
					vault_pda.toBuffer(),
					TOKEN_PROGRAM_ID.toBuffer(),
					reward_mint.toBuffer(),
				],
				SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID
			)
		)[0]; //Done
		let source = (
			await web3.PublicKey.findProgramAddress(
				[
					vault_pda.toBuffer(),
					TOKEN_PROGRAM_ID.toBuffer(),
					nftPubkey.toBuffer(),
				],
				SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID
			)
		)[0]; //Done

		let reward_destanation = (
			await web3.PublicKey.findProgramAddress(
				[
					publicKey.toBuffer(),
					TOKEN_PROGRAM_ID.toBuffer(),
					reward_mint.toBuffer(),
				],
				SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID
			)
		)[0]; //Done
		let metadataPDA = await Metadata.getPDA(new web3.PublicKey(nftPubkey));
		let tokenMetadata = await Metadata.load(connection, metadataPDA);
		// console.log("tokenMetadata", tokenMetadata);

		let wl_data_address = await web3.PublicKey.findProgramAddress(
			[Buffer.from("whitelist"), CANDY_MACHINE_ID.toBuffer()],
			program_id
		);
		wl_data_address = wl_data_address[0];
		// console.log("Publickey: ", publicKey.toString());
		// console.log(
		// 	"web3.SystemProgram.programId: ",
		// 	web3.SystemProgram.programId.toString()
		// );
		// console.log("NFTpubkey: ", nftPubkey.toString());
		// console.log(
		// 	"SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID: ",
		// 	SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID.toString()
		// );
		// console.log("stake_data: ", stake_data.toString());
		// console.log("vault_pda: ", vault_pda.toString());
		// console.log("reward_destanation: ", reward_destanation.toString());
		// console.log("reward_source: ", reward_source.toString());
		// console.log("destanation: ", destanation.toString());
		// console.log("source: ", source.toString());
		// console.log("Metadata: ", metadata.toString());
		// console.log("wl_data_address: ", wl_data_address.toString());
		// console.log("reward_mint: ", reward_mint.toString());

		let keys = [
			{ pubkey: publicKey, isSigner: true, isWritable: true }, //Done
			{
				pubkey: web3.SystemProgram.programId,
				isSigner: false,
				isWritable: false,
			}, //Done
			{ pubkey: nftPubkey, isSigner: false, isWritable: false }, //Done
			{ pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false }, //Done
			{ pubkey: rent, isSigner: false, isWritable: false }, //Done
			{
				pubkey: SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID,
				isSigner: false,
				isWritable: false,
			}, //Done
			{ pubkey: stake_data, isSigner: false, isWritable: true }, //Done
			{ pubkey: vault_pda, isSigner: false, isWritable: true }, //Done
			{ pubkey: reward_destanation, isSigner: false, isWritable: true }, //Done
			{ pubkey: reward_source, isSigner: false, isWritable: true }, //Done
			{ pubkey: destanation, isSigner: false, isWritable: true }, //Done
			{ pubkey: source, isSigner: false, isWritable: true }, //Done
			{ pubkey: metadata, isSigner: false, isWritable: false }, //Done
			{ pubkey: wl_data_address, isSigner: false, isWritable: true }, //Done
			{ pubkey: reward_mint, isSigner: false, isWritable: false }, //Done
		];

		let allocateTransaction = new Transaction({
			feePayer: publicKey,
		});

		const commandDataLayout = struct([
			u8("instruction"),
			nu64("nft"),
			// nu64("lock_period"),
		]);

		let data = Buffer.alloc(1024);
		{
			const encodeLength = commandDataLayout.encode(
				{
					instruction: 2,
					nftPubkey,
					// lock_period,
				},
				data
			);
			data = data.slice(0, encodeLength);
		}

		allocateTransaction.add(
			new web3.TransactionInstruction({
				keys,
				programId: program_id,
				data,
			})
		);

		try {
			var signature = await sendTransaction(allocateTransaction, connection);

			var result = await connection.confirmTransaction(
				signature,
				"processed"
			);
			if (result.value.err) {
				setLoader(false);
				console.log("unSTAKING", result.value.err);
				toast.error(`Error! ${result.value.err}`, {
					position: "bottom-left",
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
				});
				handleClose();

			} else {
				// unstakeApi(publicKey.toString(), nft);
				// setLoader(false);
				// console.log("transaction confirmed STAKING", signature);
				// toast.success("Success! Untaked Successfully.", {
				// 	position: "bottom-left",
				// 	autoClose: 5000,
				// 	hideProgressBar: false,
				// 	closeOnClick: true,
				// 	pauseOnHover: true,
				// 	draggable: true,
				// 	progress: undefined,
				// });
				// handleClose();
			}
		} catch (e) {
			setLoader(false);
			console.log("error unSTAKING:", e);
			toast.error(`Error! ${e}`, {
				position: "bottom-left",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
			// alert("Error: ", e);
			handleClose();
		}

		//added sir Farhan code start

let flag = false;

while (!flag) {
	console.log("Check While: ", signature);
	var log;
	await Promise.all(
		setTimeout(async () => {
			log = await connection.getTransaction(signature);
			console.log("log: ", await connection.getTransaction(signature));
			if (log !== null) {
				// console.log("Break");
				if (
					log.meta.postTokenBalances[0].uiTokenAmount.uiAmount >
					log.meta.preTokenBalances[0].uiTokenAmount.uiAmount
				) {
					console.log("unStaked");

					setTimeout(() => {
						unstakeApi(publicKey.toString(), nft);
						setLoader(false);
						console.log("transaction confirmed unSTAKING", signature);
						toast.success("Success! Untaked Successfully.", {
							position: "bottom-left",
							autoClose: 5000,
							hideProgressBar: false,
							closeOnClick: true,
							pauseOnHover: true,
							draggable: true,
							progress: undefined,
						});
						handleClose();
					}, 4000);
				} else {
					console.log("Error");
					setTimeout(() => {
						toast.error("Error!" , {
							position: "bottom-left",
							autoClose: 5000,
							hideProgressBar: false,
							closeOnClick: true,
							pauseOnHover: true,
							draggable: true,
							progress: undefined,
						});

					}, 4000);
				}
				flag = true;
				console.log("Break");
				// break;
			}
		}, 3000)
	);
}

//sir frhan code end
	};
// const [timer,setTimer]=useState();
// 	setInterval(()=>{
// 		setTimer(moment().format('LTS'));
// 	},5000)

// let time = new Date().toLocaleString();
// const [cTime, setTime] = useState(time);
// useEffect(() => {
//   setInterval(() => {
// 	setTime(time);
//   }, 1000);
// },[time]);

// const [prize,setPrize]=useState();


// const calculate=(createdAt)=>{
// 	console.log("createdAt", createdAt.toString());
// 	let	createdAt_sec=moment(createdAt.toString()).unix();
// 	let timeInSec=moment(new Date().toISOString()).unix();
// 	var stack_sec=timeInSec-createdAt_sec;
// 	setInterval(()=>{

// 		 stack_sec=stack_sec+1;
// 		setPrize(stack_sec*0.0001);
// 		},1000)

// 	console.log(stack_sec,"stack_sec")
	
// 	console.log(createdAt_sec,"createdAt_sec")
// 	console.log(timeInSec,"timeInSec")
// }

const handleLoading=()=>{
	console.log("image is loaded")
	setImageLoader(false);

		// setLoader2(false);

  }
  const handleLoading2=()=>{
	console.log("image is loaded")
	setImageLoader2(false);
	// setLoader2(false);
  
  }

	const [show, setShow] = useState(false);
	const handleClose = () => {
		setShow(false);
	};
	const handleShow = () => {
		console.log("handle show called");
    // setSelectedObj(obj);
		setShow(true);
	};
	return (
		<>
		   <Modal1
									show={show}
									handleClose={handleClose}
									string="from 1"
                //   selectedObj={selectedObj}
								
								/>
			<div style={{ justifyContent: "center", display: "flex" }}>
				{/* <Button onClick={checkNFTs} >
            Get NFTs
        </Button> */}
			</div>

			{/* <Container className="mt-5">
<Row>
  {publicKey ? (
     <Col sm={12} md={6} lg={6}>
     <h4 className='lower-content'>Robot in the Dojo</h4>
     <h4 className='lower-content' style={{color:"white",marginTop:"60px"}}>Robot in the Walllet</h4>
     </Col>
  ):(null)
   
    
}   
</Row>
     </Container> */}
			{/* <div style={{color:"white"}}>
        {images.length > 0 ? images.map((obj, i) => (<div><h3 key={i} >{obj.name}</h3><img src={obj.src} width={100} /></div>)): message}
        </div>  */}
			<Container className="flex-container mt-5 " style={{ display: "flex" }}>
				<Row>
					{publicKey && stakedNft?.length > 0 && (
						<h4 className="lower-content">Succubus's Staked</h4>
					)}
					{publicKey && stakedNft?.length > 0 
						? stakedNft?.map((obj, i) => (
								<Col
									xs={12}
									sm={12}
									md={4}
									lg={4}
									xl={4}
									style={{ paddingRight: "30px", marginBottom:"25px" }}>
										{imgLoader &&
												<div
													style={{
													alignItems: "center",
													display: "flex",
													justifyContent: "left",
													// alignContent: "center",
													}}
												>
													<Spinner animation="border" variant="light" />
												</div>
												}
									<Image
										style={{ height: "auto", width: "200px" }}
										src={obj.url}
										onLoad={()=>handleLoading()}

									/>
									<p
										className="mt-3 lower-content"
										key={i}
										style={{ color: "white" }}>
										{obj.name}
									</p>
									{/* <p
										className="mt-3 lower-content"
										key={i}
										style={{ color: "white" }}> */}
					
									{/* {calculate(obj.createdAt)} */}

									<Calculation createdAt={obj.createdAt}/>	


																	{/* <b>Cumulative:</b>
									
									{prize && prize.toFixed(4)}$ROBO */}
										
									{/* </p> */}
									
									{/* <Button  onClick={async () => {
                                // move();
												await stake(obj.mint, publicKey, sendTransaction, obj.src);
											}}
											disabled={!publicKey || !obj.mint} variant="danger" style={{width:"200px",borderRadius:"5px", marginBottom: "5px"}}>Stake</Button>
                      <br />
                       <Button  variant="danger" style={{width:"200px",borderRadius:"5px", marginBottom: "5px"}}>Stake</Button> */}
									<Button
										onClick={async () => {
											// move();
											await unstake(obj.nftAddress, publicKey, sendTransaction);
										}}
										disabled={!publicKey || !obj.nftAddress}
										variant="danger"
										style={{
											width: "200px",
											borderRadius: "5px",
											marginBottom: "5px",
										}}>
										UNSTAKE
									</Button>
								</Col>
						  ))
						: null}
					{/* {publicKey && images.length > 0 ? (
						<h4
							className="lower-content"
							style={{ color: "white", marginTop: "60px" }}>
							Monkey's in the Wallet
						</h4>
					) : (
						<h4
							className="lower-content"
							style={{ color: "white", marginTop: "60px" }}>
							No Monkey in the Wallet
						</h4>
					)} */}
						{publicKey && images.length > 0 ? (
						<h4
							className="lower-content mb-3"
							style={{ marginTop: "60px" }}>
							Succubus's in Wallet
						</h4>
					) : (
						<>
						{!publicKey ? (<h4
							className="lower-content"
							style={{  marginTop: "60px" }}>
							 Connect Wallet
						</h4>):(
							<>
							{ images.length > 0 ? (
							<h4
							className="lower-content"
							style={{  marginTop: "60px" }}>
							Checking Succubus's in Wallet
						</h4>
						):(
							<h4
							className="lower-content"
							style={{  marginTop: "60px" }}>
							No Succubus's in Wallet
						</h4>
						)}
						</>
						) }
						</>
					)}

					{publicKey && images.length > 0 ? (
						images.map((obj, i) => (
							<Col
								xs={12}
								sm={12}
								md={4}
								lg={4}
								xl={4}
								style={{ paddingRight: "30px", marginBottom:"25px" }}>
								 {imgLoader2 &&
              <div
                style={{
                  alignItems: "center",
                  display: "flex",
                  justifyContent: "left",
                  // alignContent: "center",
                }}
              >
                <Spinner animation="border" variant="light" />
              </div>
              }
								<Image
									style={{ height: "auto", width: "200px" }}
									src={obj.src}
									onLoad={()=>handleLoading2()}

								/>
								<p
									className="mt-3 lower-content"
									key={i}
									style={{ color: "white" }}>
									{obj.name}
								</p>
								<Button
									onClick={async () => {
										// move();
										await stake(
											obj.mint,
											publicKey,
											sendTransaction,
											obj.src,
											obj.name
										);
									}}
									disabled={!publicKey || !obj.mint}
									variant="danger"
									style={{
										width: "200px",
										borderRadius: "5px",
										marginBottom: "5px",
									}}>
									STAKE
								</Button>
								<br />
								{/* <Button  variant="danger" style={{width:"200px",borderRadius:"5px", marginBottom: "5px"}}>Stake</Button> */}
								{/* <Button  onClick={async () => {
                                // move();
												await unstake(obj.mint, publicKey, sendTransaction);
											}}
											disabled={!publicKey || !obj.mint} variant="danger" style={{width:"200px",borderRadius:"5px", marginBottom: "5px"}}>Un_Stake</Button> */}
							</Col>
						))
					) : (
						<p className="mt-3 lower-content" style={{ color: "white" }}>
							{" "}
							{message}
						</p>
					)}
				</Row>
			</Container>
		</>
	);
};
