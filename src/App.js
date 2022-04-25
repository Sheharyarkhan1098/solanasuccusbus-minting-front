/** @format */

import logo from "./logo.svg";
import "./App.css";
import { PhantomWallet } from "./PhantomWallet";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import toknomics from "./images/thumbwars.jpeg";
// import toknomics from "./images/toknomics.jpeg";
// import toknomics from "./images/toknomics.png";
import RobotClub from "./components/RobotClub";

function App() {
	return (
		<div className="mb-5">
			<ToastContainer
				position="bottom-left"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				theme={"dark"}
				pauseOnHover
			/>
			{/* <RobotClub /> */}
			{/* <div style={{marginLeft:"20px", width:"50px"}} >
		 <a  href="https://www.richmonkey-island.com" className="link-dark">
<div   className="btn-success btn-circle btn-lg">
		 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-return-left" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M14.5 1.5a.5.5 0 0 1 .5.5v4.8a2.5 2.5 0 0 1-2.5 2.5H2.707l3.347 3.346a.5.5 0 0 1-.708.708l-4.2-4.2a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 8.3H12.5A1.5 1.5 0 0 0 14 6.8V2a.5.5 0 0 1 .5-.5z"/>
</svg>
</div>
</a>
		</div> */}
					<div style={{backdropFilter:"blur(15px)", background: "rgba(0,0,0,0.4)", position: "fixed", width: "100%", display: "flex", justifyContent: "space-between",alignItems: "center", padding: "10px 50px"}}>
						<a href="http://solanasuccubus.io/" >
							 <img src="/logo.png" width="100px" />
						</a>
					<div>
					<h1
					className="first-heading"
					style={{ color: "white"}}>
					{/* Welcome to the Thumb Wars Staking! */}
					Solana Succubus Official Staking
					
				</h1>
				{/* <h4
					className="first-heading mt-3"
					style={{ color: "white", fontSize: "30px" }}>
					
					
				</h4> */}
				</div>
				<a href="https://discord.gg/35WUZgCaXM" target="_blank">
						<img src="/discord_logo.png" width="100px" />
					</a>
				</div>
			<div className=""
				style={{ textAlign: "center" }}>

				{/* <p
					className="container-text p-5"
					// style={{ color: "white", fontSize: "24px" }}
					>
					
					Thumb Warriors can earn $THUMB by enrolling for Battle Training Camp aka. the ‘Stake Out’.
				</p> */}
				

				<img style={{height:"auto",width:"100%", marginBottom:"10px"}} src={"/banner.png"} />
				</div>
			<PhantomWallet />
		
		</div>
	);
}

export default App;
