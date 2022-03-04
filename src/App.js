import {Tooltip,OverlayTrigger,Form,ButtonGroup,ButtonToolbar,CardColumns,CardGroup,Card,Button,Container,Nav,Navbar,NavDropdown,Carousel,Row,Col,Modal,Spinner } from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup'

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import MyNav from './MyNav';

import React, { Component, useState, useEffect } from 'react'

import getWeb3 from "./getWeb3";

// 
import SingleNFT from './SingleNFT';


// import { NftProvider, useNft } from "use-nft"

import Connection from "./Connection";

import { useWallet, UseWalletProvider } from 'use-wallet'

import img1 from './components/Structure/images/PowerPose.gif';
import img2 from "./components/Structure/images/NFT_LOOTBOX_HEADER.png"


import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";


import { Helmet } from 'react-helmet';

import axios from "axios";

import ABI from './erc1155.json'

import { HashLink as LinkHeader } from 'react-router-hash-link';


function useWindowSize() {
  // Initialize state with undefined width/height so server and client renders match
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

  // Set Web 3
  const [web3,setWeb3] = useState(null)
  const [balance,setBalance] = useState(null)

  // Account info
  const [accounts,setAccounts] = useState(null)

  // Contracts
  const [erc1155_contract,setErc1155_contract] = useState(null)
  const [erc1155_contract_address,setErc1155_contract_address] = useState(null)

  // wallet info
  const [wallet_for_google, setWallet_for_google_treasurebloxNative_] = useState('Unknown');
  const [ip, setIP_treasurebloxNative_] = useState('');

  // network type
  const [is_meter,setIs_Meter] = useState(false);

    // Loading state
  const [isLoading, setIsLoading] = useState(true);

  // Json
  var [data,setData]=useState([]);
  var tempArray = []

  // Modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  // Componant
  const [index, setIndex] = useState(0);
  const [nft_balanceOf, setnft_balanceOf] = useState(13);
  const [loader, setLoader] = useState(true);


  // Google Analytics
  const learn_more = (event) => {
    window.dataLayer.push({
      event: "wallet_information",
      wallet: props.wallet_for_google,
      wallet_ip: props.ip,
      url: window.location.pathname,
      buttonClicked:"learn_more_clicked"
    });
  }

  let myArray = []

  useEffect(() => {

    // Wait for 3 seconds

    setTimeout(() => {

      setIsLoading(false);
    }, 4000);
  }, []);

  var my_index = 0

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

    // SET ACCOUNTS
    const accounts = await web3.eth.getAccounts();

    setAccounts(accounts)
    setWeb3(web3)

    const ERC1155_CONTRACT = new web3.eth.Contract(ABI,"https://rpc.meter.io/" && "0x4FBd2Db19de40e0fD36e91d7a848F84515a54242");
    const ERC1155_CONTRACT_ADDRESS = "0x4FBd2Db19de40e0fD36e91d7a848F84515a54242"
    
    setErc1155_contract(ERC1155_CONTRACT)
    setErc1155_contract_address(ERC1155_CONTRACT_ADDRESS)

    

    const timer = window.setInterval( async() => {

      myArray = []

      // balances = []


      // var nft_metadata = await ERC1155_CONTRACT.methods.uri(0).call();
      // console.log(nft_metadata)

      for (let i = 0; i < 49; i++) {
        console.log(i)
        setIndex(i)
        my_index = i;

        console.log(my_index)
       
        var nft_metadata = await ERC1155_CONTRACT.methods.uri(i).call();


        // balances.push(quick_bal)
        console.log(nft_metadata)
        nft_metadata = nft_metadata.split("https://api.treasureblox.finance/");
        console.log(nft_metadata[1])
          fetch(nft_metadata[1]
            ,{
              headers : { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
              }
            }
            ).then(function(response){
                // console.log(response)
                return response.json();
              }).then(function(myJson) {
                // console.log(myJson,"this is the log");
                var json = myJson;
                
                myArray.push(json);
                // console.log(myArray)
                // setData([json])
              });
        

      }
      // console.log(myArray)
      setData(myArray)
      setLoader(false)
      console.log(index,"index")
      console.log(data,"data")
      console.log(myArray,"myarray")

    }, 3000);
    

} // End of network if statement METER


  }
  init()

  },[is_meter,web3,accounts,wallet_for_google,ip,balance,isLoading,nft_balanceOf,data,index])

  
  return (

    <div className="background customFont" >

    <Helmet>
    <Modal.Title>TreasureBlox Lootbox NFT's</Modal.Title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>

    </Helmet>

    <Router>

        <Switch>

              <Route path="">

              <MyNav {...props} accounts={accounts} is_meter={is_meter} onClick={() => Connection()}/>

                <Container className='mt-5' fluid="md">

                <div id="top" className="spaceTopHome">




                </div>
                <br/> 

                <div style={{ color: 'white' }}>

                <Modal show={show} onHide={handleClose} 
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered >
                <Modal.Header closeButton>
                  <Modal.Title>TreasureBlox Lootbox NFT's</Modal.Title>
                </Modal.Header>
                <Modal.Body>Cost for 3 random NFT's - 2 MTRG</Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                  <Button variant="primary" onClick={handleClose}>
                    Mint
                  </Button>
                </Modal.Footer>
                </Modal>


                <Card.Img variant="top" src={img2} alt="Logo" className='customRounded'/>
                <center>
                  <h3 >NFT Lootbox - Collect and trade elements to build your own charicter NFT's, gain in game abilities to complete our treasurehunts & more!</h3>
                  <p>
                    Click generate to mint 3 random nft's - cost 2 MTRG!
                  </p>
                  <LinkHeader to="/home#yourAnchorTag">
                  <Button  className="customButton" onClick={handleShow} id="header_play_to_earn" to="/home#yourAnchorTag" style={{margin:'10px'}}>Start</Button>
                </LinkHeader>

                </center>

                <br/>
                <div className="hr">
                </div>
                <br/>

                <center>
                  <h3 sm={12} lg={4} className="d-none d-lg-block">YOUR COLLECTION</h3>

                  {(loader) && <Spinner animation="border" role="status"/> }
                    
                </center>

                <div className="collection-background">

                <div class="container">
                  <div class="row">

                  <div class="col-sm">


                  {data.map((items,i) => {

                    return <div>
                      
                    {(i % 4 == 0) &&  <SingleNFT id={0} item={items} nft_balanceOf={nft_balanceOf} key={i} index={my_index} ERC1155_CONTRACT={props.ERC1155_CONTRACT}/>}

                    </div>
                    
                    }
                  )}

                  </div>

                  <div class="col-sm">


                  {data.map((items,i) => {

                    return <div>
                      
                    {(i % 4 == 1) &&  <SingleNFT id={0} item={items} nft_balanceOf={nft_balanceOf} key={i} index={my_index} ERC1155_CONTRACT={props.ERC1155_CONTRACT}/>}

                    </div>
                    
                    }
                  )}

                  </div>

                  <div class="col-sm">


                  {data.map((items,i) => {

                    return <div>
                      
                    {(i % 4 == 2) &&  <SingleNFT id={0} item={items} nft_balanceOf={nft_balanceOf} key={i} index={my_index} ERC1155_CONTRACT={props.ERC1155_CONTRACT}/>}

                    </div>
                    
                    }
                  )}

                  </div>

                  <div class="col-sm">


                  {data.map((items,i) => {

                    return <div>
                      
                    {(i % 4 == 3) &&  <SingleNFT id={0} item={items} nft_balanceOf={nft_balanceOf} key={i} index={my_index} ERC1155_CONTRACT={props.ERC1155_CONTRACT}/>}

                    </div>
                    
                    }
                  )}

                  </div>



                   
                    {/* <div class="col-sm">


                      {data.map((items,i) => {

                        return <div>
                          
                        {(i == 0) &&  <SingleNFT id={0} item={items} nft_balanceOf={nft_balanceOf} key={i} index={my_index} ERC1155_CONTRACT={props.ERC1155_CONTRACT}/>}
                        {(i == 5) &&  <SingleNFT id={5} item={items} nft_balanceOf={nft_balanceOf} key={i} index={my_index} ERC1155_CONTRACT={props.ERC1155_CONTRACT}/>}
                        {(i == 9) &&  <SingleNFT id={9} item={items} nft_balanceOf={nft_balanceOf} key={i} index={my_index} ERC1155_CONTRACT={props.ERC1155_CONTRACT}/>}
                        {(i == 13) &&  <SingleNFT id={13} item={items} nft_balanceOf={nft_balanceOf} key={i} index={my_index} ERC1155_CONTRACT={props.ERC1155_CONTRACT}/>}
                        {(i == 17) &&  <SingleNFT id={17} item={items} nft_balanceOf={nft_balanceOf} key={i} index={my_index} ERC1155_CONTRACT={props.ERC1155_CONTRACT}/>}
                        {(i == 21) &&  <SingleNFT id={21} item={items} nft_balanceOf={nft_balanceOf} key={i} index={my_index} ERC1155_CONTRACT={props.ERC1155_CONTRACT}/>}
                        {(i == 25) &&  <SingleNFT id={25} item={items} nft_balanceOf={nft_balanceOf} key={i} index={my_index} ERC1155_CONTRACT={props.ERC1155_CONTRACT}/>}
                        {(i == 29) &&  <SingleNFT id={29} item={items} nft_balanceOf={nft_balanceOf} key={i} index={my_index} ERC1155_CONTRACT={props.ERC1155_CONTRACT}/>}
                        {(i == 33) &&  <SingleNFT id={33} item={items} nft_balanceOf={nft_balanceOf} key={i} index={my_index} ERC1155_CONTRACT={props.ERC1155_CONTRACT}/>}
                        {(i == 37) &&  <SingleNFT id={37} item={items} nft_balanceOf={nft_balanceOf} key={i} index={my_index} ERC1155_CONTRACT={props.ERC1155_CONTRACT}/>}
                        {(i == 41) &&  <SingleNFT id={41} item={items} nft_balanceOf={nft_balanceOf} key={i} index={my_index} ERC1155_CONTRACT={props.ERC1155_CONTRACT}/>}
                        {(i == 45) &&  <SingleNFT id={45} item={items} nft_balanceOf={nft_balanceOf} key={i} index={my_index} ERC1155_CONTRACT={props.ERC1155_CONTRACT}/>}

                        </div>
                        
                        }
                      )}

                    </div>



                    <div class="col-sm">

                      {data.map((items,i) => {

                        return <div>
                          
                        {(i == 1) &&  <SingleNFT id={1} item={items} nft_balanceOf={nft_balanceOf} key={i} index={my_index} ERC1155_CONTRACT={props.ERC1155_CONTRACT}/>}
                        {(i == 6) &&  <SingleNFT id={6} item={items} nft_balanceOf={nft_balanceOf} key={i} index={my_index} ERC1155_CONTRACT={props.ERC1155_CONTRACT}/>}
                        {(i == 10) &&  <SingleNFT id={10} item={items} nft_balanceOf={nft_balanceOf} key={i} index={my_index} ERC1155_CONTRACT={props.ERC1155_CONTRACT}/>}
                        {(i == 14) &&  <SingleNFT id={14} item={items} nft_balanceOf={nft_balanceOf} key={i} index={my_index} ERC1155_CONTRACT={props.ERC1155_CONTRACT}/>}
                        {(i == 18) &&  <SingleNFT id={18} item={items} nft_balanceOf={nft_balanceOf} key={i} index={my_index} ERC1155_CONTRACT={props.ERC1155_CONTRACT}/>}
                        {(i == 22) &&  <SingleNFT id={22} item={items} nft_balanceOf={nft_balanceOf} key={i} index={my_index} ERC1155_CONTRACT={props.ERC1155_CONTRACT}/>}
                        {(i == 26) &&  <SingleNFT id={26} item={items} nft_balanceOf={nft_balanceOf} key={i} index={my_index} ERC1155_CONTRACT={props.ERC1155_CONTRACT}/>}
                        {(i == 30) &&  <SingleNFT id={30} item={items} nft_balanceOf={nft_balanceOf} key={i} index={my_index} ERC1155_CONTRACT={props.ERC1155_CONTRACT}/>}
                        {(i == 34) &&  <SingleNFT id={34} item={items} nft_balanceOf={nft_balanceOf} key={i} index={my_index} ERC1155_CONTRACT={props.ERC1155_CONTRACT}/>}
                        {(i == 38) &&  <SingleNFT id={38} item={items} nft_balanceOf={nft_balanceOf} key={i} index={my_index} ERC1155_CONTRACT={props.ERC1155_CONTRACT}/>}
                        {(i == 42) &&  <SingleNFT id={42} item={items} nft_balanceOf={nft_balanceOf} key={i} index={my_index} ERC1155_CONTRACT={props.ERC1155_CONTRACT}/>}
                        {(i == 46) &&  <SingleNFT id={46} item={items} nft_balanceOf={nft_balanceOf} key={i} index={my_index} ERC1155_CONTRACT={props.ERC1155_CONTRACT}/>}

                        </div>
                        
                          
                        }
                      )}

                    </div>


                    <div class="col-sm">

                      {data.map((items,i) => {

                        return <div>
                          
                        {(i == 2) &&  <SingleNFT id={2} item={items} nft_balanceOf={nft_balanceOf} key={i} index={my_index} ERC1155_CONTRACT={props.ERC1155_CONTRACT}/>}
                        {(i == 7) &&  <SingleNFT id={7} item={items} nft_balanceOf={nft_balanceOf} key={i} index={my_index} ERC1155_CONTRACT={props.ERC1155_CONTRACT}/>}
                        {(i == 11) &&  <SingleNFT id={11} item={items} nft_balanceOf={nft_balanceOf} key={i} index={my_index} ERC1155_CONTRACT={props.ERC1155_CONTRACT}/>}
                        {(i == 15) &&  <SingleNFT id={15} item={items} nft_balanceOf={nft_balanceOf} key={i} index={my_index} ERC1155_CONTRACT={props.ERC1155_CONTRACT}/>}
                        {(i == 19) &&  <SingleNFT id={19} item={items} nft_balanceOf={nft_balanceOf} key={i} index={my_index} ERC1155_CONTRACT={props.ERC1155_CONTRACT}/>}
                        {(i == 23) &&  <SingleNFT id={23} item={items} nft_balanceOf={nft_balanceOf} key={i} index={my_index} ERC1155_CONTRACT={props.ERC1155_CONTRACT}/>}
                        {(i == 27) &&  <SingleNFT id={27} item={items} nft_balanceOf={nft_balanceOf} key={i} index={my_index} ERC1155_CONTRACT={props.ERC1155_CONTRACT}/>}
                        {(i == 31) &&  <SingleNFT id={31} item={items} nft_balanceOf={nft_balanceOf} key={i} index={my_index} ERC1155_CONTRACT={props.ERC1155_CONTRACT}/>}
                        {(i == 35) &&  <SingleNFT id={35} item={items} nft_balanceOf={nft_balanceOf} key={i} index={my_index} ERC1155_CONTRACT={props.ERC1155_CONTRACT}/>}
                        {(i == 39) &&  <SingleNFT id={39} item={items} nft_balanceOf={nft_balanceOf} key={i} index={my_index} ERC1155_CONTRACT={props.ERC1155_CONTRACT}/>}
                        {(i == 43) &&  <SingleNFT id={43} item={items} nft_balanceOf={nft_balanceOf} key={i} index={my_index} ERC1155_CONTRACT={props.ERC1155_CONTRACT}/>}
                       
                        </div>
                        
                          
                        }
                      )}

                    </div>


                    <div class="col-sm">

                      {data.map((items,i) => {

                        return <div>
                          
                        {(i == 3) &&  <SingleNFT id={3} item={items} nft_balanceOf={nft_balanceOf} key={i} index={my_index} ERC1155_CONTRACT={props.ERC1155_CONTRACT}/>}
                        {(i == 8) &&  <SingleNFT id={8} item={items} nft_balanceOf={nft_balanceOf} key={i} index={my_index} ERC1155_CONTRACT={props.ERC1155_CONTRACT}/>}
                        {(i == 12) &&  <SingleNFT id={12} item={items} nft_balanceOf={nft_balanceOf} key={i} index={my_index} ERC1155_CONTRACT={props.ERC1155_CONTRACT}/>}
                        {(i == 16) &&  <SingleNFT id={16} item={items} nft_balanceOf={nft_balanceOf} key={i} index={my_index} ERC1155_CONTRACT={props.ERC1155_CONTRACT}/>}
                        {(i == 20) &&  <SingleNFT id={20} item={items} nft_balanceOf={nft_balanceOf} key={i} index={my_index} ERC1155_CONTRACT={props.ERC1155_CONTRACT}/>}
                        {(i == 24) &&  <SingleNFT id={24} item={items} nft_balanceOf={nft_balanceOf} key={i} index={my_index} ERC1155_CONTRACT={props.ERC1155_CONTRACT}/>}
                        {(i == 28) &&  <SingleNFT id={28} item={items} nft_balanceOf={nft_balanceOf} key={i} index={my_index} ERC1155_CONTRACT={props.ERC1155_CONTRACT}/>}
                        {(i == 32) &&  <SingleNFT id={32} item={items} nft_balanceOf={nft_balanceOf} key={i} index={my_index} ERC1155_CONTRACT={props.ERC1155_CONTRACT}/>}
                        {(i == 36) &&  <SingleNFT id={36} item={items} nft_balanceOf={nft_balanceOf} key={i} index={my_index} ERC1155_CONTRACT={props.ERC1155_CONTRACT}/>}
                        {(i == 40) &&  <SingleNFT id={40} item={items} nft_balanceOf={nft_balanceOf} key={i} index={my_index} ERC1155_CONTRACT={props.ERC1155_CONTRACT}/>}
                        {(i == 44) &&  <SingleNFT id={44} item={items} nft_balanceOf={nft_balanceOf} key={i} index={my_index} ERC1155_CONTRACT={props.ERC1155_CONTRACT}/>}
                        
                        </div>
                        
                          
                        }
                      )}

                    </div> */}

                    
                    
                    
                    
                 
                   
                  </div>
                </div>


                

                </div>
                 
                
                

                <br/>
                <br/>


{/* 

                NFT BAL: {nft_balanceOf}
 */}


                {/* <br/>
                {props.data.image}
                <br/> 

                {props.data.name}
                <br/> 

                {props.data.attributes[0].trait_type}
                <br/> 

                {props.data.attributes[0].value} */}










                </div>




                </Container>

          

              </Route>

        </Switch>
        <div>

        </div>


    </Router>

    




    </div>


  );

}
  
  



export default App;

