import MyNav from './MyNav';

// import img1 from './Treasure-hunt.jpeg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import React, { Component, useState, useEffect } from 'react'
import Connection from "./Connection";
import { useWallet, UseWalletProvider } from 'use-wallet'

import { Helmet } from 'react-helmet';

import {Tooltip,OverlayTrigger,Form,ButtonGroup,ButtonToolbar,CardColumns,CardGroup,Card,Button,Container,Nav,Navbar,NavDropdown,Carousel } from 'react-bootstrap';


import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import { HashLink as LinkHeader } from 'react-router-hash-link';


import TagManager from 'react-gtm-module'


const Home = (props) => {


  const learn_more = (event) => {
    window.dataLayer.push({
      event: "wallet_information",
      wallet: props.wallet_for_google,
      wallet_ip: props.ip,
      url: window.location.pathname,
      buttonClicked:"learn_more_clicked"
    });
  }

    return (

      <div className="background">
      <Helmet>
        <title>TreasureBlox NFT | Home</title>
      </Helmet>
      <Container className='mt-5' fluid="md">


        <div id="top" className="spaceTopHome">




        </div>




      </Container>


      </div>


    );

}

export default Home;
