/** @format */

import React, { useState,useEffect } from "react";
import {
	Container,
	ProgressBar,
	Button,
	Row,
	Col,
	Modal,
	Spinner
} from "react-bootstrap";
import Image from "react-bootstrap/Image";
import background1 from "./background1.png";
import "./RobotClub.css";
import axios from "axios";

// const baseURL = "https://api.richmonkey-island.com";
// const baseURL = "http://localhost:3000";
const baseURL = "http://68.183.6.66:3000";

function RobotClub() {

// 	const [stakedMonkey,setStakedMonkey]=useState();
// 	useEffect(() => {
	
// 		getAllStakeData();

		
// 	}, []);

// 	const getAllStakeData = async () => {
// 		axios
// 			.get(`${baseURL}/getAll`, {
// 				headers: {
// 					"Content-Type": "application/json",
// 					"Access-Control-Allow-Origin": "*",
// 					"Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
// 				},
// 			})
// 			.then((response) => {
// 				setStakedMonkey(response.data);
// 				console.log(" getAllStakeData Response: ", response.data);
// 			})
// 			.catch((err) => {
// 				console.log("Error:", err);
// 			});
// 	};
// 	console.log(stakedMonkey,"stakedMonkey");

// let totalSupply=2525;
// let percentage=stakedMonkey/totalSupply *100;

const[count, setCount]=useState();
const[count1, setCount1]=useState(0);

const getCountApi = async () => {
	axios
		.get(`${baseURL}/getcount`, {
			headers: {
				"Content-Type": "application/json",
				"Access-Control-Allow-Origin": "*",
				"Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
			},
		})
		.then((response) => {
			//console.log("Count: ", response.data);
			setCount1(response.data);
			let percentage = (response.data / 3000) * 100;
			console.log("Percentage: ", parseFloat(percentage.toFixed(0)));
			setCount(parseFloat(percentage.toFixed(0)));
		})
		.catch((error) => {
			console.log("Count Error: ", error);
		});
};
useEffect(() => {
	getCountApi();
	// setPkey(publicKey?.toString());
	// if (publicKey) {
	//     console.log("Check");
	//     // getNFT();
	// }
}, []);



	return (
		<>
			<Container
				className="mt-5"
				style={{ textAlign: "center", marginTop: "40px" }}>
				{/* <Image className="robot-image" src={background1} /> */}
				{/* <h2
					className="first-heading mt-5"
					style={{ color: "white", fontSize: "40px" }}>
					Welcome to the Rich Monkey Staking club!
				</h2> */}
				{/* <p className="container-text">
					Once you begin to stake, your mafioso get puts to work. A working
					mafioso is out doing various activities such as extorting,
					blackmailing and robbing. For these deeds, the mafioso is rewarded in
					local currency:$ROBO. Before you can begin earning $ROBO you have to
					complete the initiation process. The initiation process is a 9-day
					period where you prove your loyalty to the circle. if unstacked, you
					would have to redo the initiation process. The $ROBO the mafioso, can
					buy the necessary items to mutate. The mutation requires an infected
					elixir + hiring a mad scientist. Once you have obtained these the
					mutation period can begin. Once the mutation is completed, a new
					strange creature will rise....
				</p> */}
				<p className="stacked">Thumb Wars Staked: {count1}/3000 {" "}(
				{count ? (
                   count
                ) : (
                    <>
                        <Spinner animation="border" variant="light" />
                    </>
                )}
                %){" "}
				{/* ({count}%) */}
				</p>
				<div className="mt-5">
					<ProgressBar variant="danger" now={count} style={{ height: "15px" }} />

					{/* <div id="myProgress">
  <div id="myBar"></div> 
</div>
*/}
					<br />
					{/* <button onClick={()=>move()}>Click Me</button>  */}
				</div>
				{/*<div className='mt-5'>
 <Button variant="danger">
      connect
      </Button>

    

</div> */}
			</Container>
			{/* <Container className="mt-5">
<Row>
    <Col sm={12} md={6} lg={6}>
    <h4 style={{color:"white"}}>Robot in the Dojo</h4>
    <h4 style={{color:"white",marginTop:"60px"}}>Robot in the Walllet</h4>
    </Col>
</Row>
     </Container> */}
			{/* <Container  className="mt-5">
        <Row>
            <Col>
            <Image style={{height:"auto",width:"200px"}}
        src=
"https://yt3.ggpht.com/RCd3d05un9f5HL-XGMfxCwLsyTVmOAlZzE-TacEVcz6xfmxgefufyXN2KS1gRCEUOZAhInppDw=s88-c-k-c0x00ffffff-no-rj"
    
      />
      <p className="mt-3" style={{color:"white"}}>Kastu Hisashi #559</p>
      <Button variant="danger" style={{width:"200px",borderRadius:"5px"}}>Stake Robot</Button>
            </Col>
        </Row>
    </Container> */}
			<br></br>
		</>
	);
}

export default RobotClub;
