import React, {Component} from 'react';
import Web3 from 'web3'
import './App.css';

// allows to run our async function within the component part of React
class App extends Component {
componentWillMount() {
  this.loadBlockchainData()
}


//connect our app with blockchain
async loadBlockchainData()
{
const web3 = new Web3(Web3.givenprovider || "http://localhost: 8546")
const network = await web3.eth.net.getNetworkType()
console.log("network:", network)
}


render() {
return (
    <div className="container">
      <h1> Great Solidity Developers </h1>
    </div>
  );
}
}
export default App;
