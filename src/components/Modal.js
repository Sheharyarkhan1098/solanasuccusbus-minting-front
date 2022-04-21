import React,{useState, useEffect} from 'react'
import {
	Col,
    Image,
	Modal,
    Button,
	Form,
	Card,
	Spinner
} from "react-bootstrap";

function Modal1(props) {
	console.log(props,"props");
	
  return (
    <>
   

    <Modal
      show={props.show}
        onHide={ ()=>{props.handleClose()}}
      dialogClassName="modal-90w "
      aria-labelledby="example-custom-modal-styling-title"
	  centered
    >
      
      <Modal.Body style={{backgroundColor:"black", display: "flex"}} >

	  <div
                style={{
                  alignItems: "center",
                  display: "flex",
                  justifyContent: "left",
                  // alignContent: "center",
                }}
              >
                <Spinner animation="border" variant="light" />
				<span className="text-light">Proccessing Transaction...</span>
              </div>


      </Modal.Body>
	  {/* <Modal.Footer  style={{backgroundColor:"black"}}>
        <Button onClick={ ()=>{props.handleClose()}}>Close</Button>
      </Modal.Footer> */}
    </Modal>
  </>
  )
}

export default Modal1;