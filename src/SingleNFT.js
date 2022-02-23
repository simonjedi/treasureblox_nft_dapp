import React from 'react';

import {Tooltip,OverlayTrigger,Form,ButtonGroup,ButtonToolbar,CardColumns,CardGroup,Card,Button,Container,Nav,Navbar,NavDropdown } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import './SingleNFT.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


const SingleNFT = (props) => {

  return(

    <div>
       
        <Card.Img variant="top" height="100" src="https://api.treasureblox.finance/v1/LootBox/CARBON/HIPPY.png" alt="Logo" className='customRounded'/>
        <br/>
        <br/>
        <Card.Title className="nftTitle">{props.item.name}</Card.Title>
        <Card.Text className="homeSubTitle">{props.item.attributes[0].trait_type}</Card.Text>
        <Card.Text className="homeSubTitle">{props.item.attributes[0].value}</Card.Text>
        

    </div>





  );


};

export default SingleNFT;
