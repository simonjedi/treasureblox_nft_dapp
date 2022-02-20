import { Button,Container,Nav,Navbar,NavDropdown,Carousel,Card } from 'react-bootstrap';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import MyNav from './MyNav';

import React, { Component, useState, useEffect } from 'react'
import getWeb3 from "./getWeb3";

import Connection from "./Connection";
import { useWallet, UseWalletProvider } from 'use-wallet'
import img1 from './components/Structure/images/PowerPose.gif';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";

import Home from "./Home";

import { Helmet } from 'react-helmet';

import axios from 'axios';


  function useWindowSize() {
    // Initialize state with undefined width/height so server and client renders match
    // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
    const [windowSize, setWindowSize] = useState({
      width: undefined,
      height: undefined,
    });

    useEffect(() => {



      // Handler to call on window resize
      function handleResize() {
        // Set window width/height to state
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }
      // Add event listener
      window.addEventListener("resize", handleResize);
      // Call handler right away so state gets updated with initial window size
      handleResize();
      // Remove event listener on cleanup
      return () => window.removeEventListener("resize", handleResize);

      window.scrollTo(0, 0);


    }, []); // Empty array ensures that effect is only run on mount


    return windowSize;
  }

const App = (props) => {

  const { width, height } = useWindowSize();
// Set Blox Contracts Starts

  const [web3,setWeb3] = useState(null)
  // const [accounts,setAccounts] = useState(null)
  const [balance,setBalance] = useState(null)

  // account info
  const [accounts,setAccounts] = useState(null)

  // wallet info
  const [wallet_for_google, setWallet_for_google_treasurebloxNative_] = useState('Unknown');
  const [ip, setIP_treasurebloxNative_] = useState('');

  // network type
  const [is_meter,setIs_Meter] = useState(false);

    // Loading state
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {

    // Wait for 3 seconds

    setTimeout(() => {

      setIsLoading(false);
    }, 4000);
  }, []);

  useEffect(() => {


      const init = async() => {

        if (isLoading){
          window.scrollTo({top: 0})
        }

        const web3 = await getWeb3();
        const accounts = await web3.eth.getAccounts();
        setAccounts(accounts[0])

        const Moralis = require('moralis');

        // Loading state




        const isWeb3Active = Moralis.ensureWeb3IsInstalled()

        if (isWeb3Active) {
        } else {
          await Moralis.enableWeb3();
        }

        const currentChainId = await Moralis.getChainId();


        // START NETWORK IF BSC
        if (currentChainId === 56) {

        setIs_Meter(false)

        setWallet_for_google_treasurebloxNative_("w="+accounts.toString())

        // End of Game timer code

      }// End of network if statement BSC

      // STARTING METER HERE
      // Meter Testnet
      // if (currentChainId === 83) {
      // https://rpctest.meter.io/


      if (currentChainId === 82) {


        setIs_Meter(true)

    } // End of network if statement METER


      }
      init()


    },[

    is_meter,web3,accounts,wallet_for_google,ip,balance,isLoading
    ])


    return (

        <div className="customFont">

{isLoading?(


  <div style={{height: height*5}} className="background">

<div className="loading">
<img
  alt="treasureblox_logo"
  src={img1}
  width="500"
  className="d-inline-block align-middle"
/>


</div>
<div className="siteTitle caption blink_me">Loading The Metaverse!</div>


</div>

):(<div>


        <Helmet>
          <title>TreasureBlox | The Worlds First Metaverse TreasureHunt Adventure</title>
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>

        </Helmet>

        <Router>


        <Switch>


              <Route path="/home">
              <MyNav accounts={accounts} is_meter={is_meter} onClick={() => Connection()}/>

                <Home
                is_meter={is_meter}
                web3={web3}
                wallet_for_google={wallet_for_google}
                ip={ip}
                />


              </Route>

              <Route path="">
              <MyNav {...props} accounts={accounts} is_meter={is_meter} onClick={() => Connection()}/>

                <Home

                is_meter={is_meter}
                web3={web3}
                wallet_for_google={wallet_for_google}
                ip={ip}
                />


              </Route>

        </Switch>
        <div>

        <Redirect component={Home} />
        </div>


</Router>







</div>)}



      </div>


    );

}

export default App;
