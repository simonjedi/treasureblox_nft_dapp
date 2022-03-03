// Bootstrap
import {Tooltip,OverlayTrigger,Form,ButtonGroup,ButtonToolbar,CardColumns,CardGroup,Card,Button,Container,Nav,Navbar,NavDropdown, Row, Col } from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup';
import 'bootstrap/dist/css/bootstrap.min.css';

// Css
import './SingleNFT.css';

// React
import React, { Component, useState, useEffect } from 'react'

// React Addons
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";



const SingleNFT = async(props) => {

  // Balance of NFTs

  // Transform Json Element
  var trait = props.item.attributes[0].trait_type.split("_")


  // balanceOfresult = nft_balanceOf.substring(0, tokenContract_xyz_.length-18)


  return(
    <div >

    {(props.balanceOf >= 1)?(
      <div>
         <Card className="cardRounded">
            <Row className="cardRounded">
            <Col xs={1} md={4} lg={2} xl={2}>
            <Card.Img variant="top"  src="https://api.treasureblox.finance/v1/LootBox/CARBON/HIPPY.png" alt="Logo" className='customRounded nftImg'/>
            </Col>
            <Col xs={1} md={8} lg={10} xl={10} >
            <Card.Text className="nftTitle">Name: {props.item.name}</Card.Text>

            <Card.Text className="nftSubTitle">TRAIT TYPE: {trait[0].toUpperCase()} {trait[1].toUpperCase()}</Card.Text>
            <Card.Text className="nftSubTitle">ITEM DESCRIPTION: {props.item.attributes[0].value}</Card.Text>
            {/* <Card.Text className="nftSubTitle">YOUR BALANCE:  {props.nft_balanceOf}</Card.Text> */}

            
            </Col>
            </Row>

          </Card>
            <br/>
      </div>
    ):(
      <div>

      </div>
    )}

         




    </div>





  );


};

export default SingleNFT;
