import React, {Component} from 'react';
import Web3 from 'web3';
import './App.css';

class App extends Component {

    componentWillMount() {
        this.loadBlockchainData()
    }

    async loadBlockchainData() {
        const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
        const network = await web3.eth.net.getNetworkType();
        console.log("network:", network)
    }

    render() {
        return (
            <div className="container">
                <h1>Hello, world</h1>
            </div>
        );
    }
}

export default App;
