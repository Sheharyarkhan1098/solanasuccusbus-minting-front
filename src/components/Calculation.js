import React,{useState} from 'react'
import moment from "moment";

function Calculation(props) {

    const [prize,setPrize]=useState();



	let	createdAt_sec=moment(props.createdAt.toString()).unix();
	let timeInSec=moment(new Date().toISOString()).unix();
	var stack_sec=timeInSec-createdAt_sec;
	setInterval(()=>{

		 stack_sec=stack_sec+1;
		setPrize(stack_sec*0.000115741);
		},1000)



  return (
    <div className="text-white">Reward:{prize && prize.toFixed(4)}{" "}$THUMB</div>
  )
}

export default Calculation;