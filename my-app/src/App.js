import React, { Component } from 'react'
import Web3 from 'web3'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {TODO_LIST_ABI, TODO_LIST_ADDRESS} from './config'



// allows to run our async function within the component part of React
class App extends Component {
UNSAFE_componentWillMount() {
this.loadBlockchainData()
}

//connect our app with blockchain
async loadBlockchainData() {

const web3 = new Web3(Web3.givenProvider || "http://localhost:8545")
const network = await web3.eth.net.getNetworkType()
const accounts = await web3.eth.getAccounts()
//store to state
this.setState({account: accounts[0] })
const todoList = new web3.eth.Contract(TODO_LIST_ABI, TODO_LIST_ADDRESS)
this.setState ({todoList})
//async call
const taskCount = await todoList.methods.taskCount().call()
this.setState ({taskCount})

for (var i = 1; i <= taskCount; i++) {
      const task = await todoList.methods.tasks(i).call()
      this.setState({
        tasks: [...this.state.tasks, task]
      })
    }



 

}
// curly braces tell React we are going to execute JS
render() {
return (
<div>
  <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
    <a className="navbar-brand col-sm-3 col-md-2 mr-0" href="http://www.dappuniversity.com/free-download" target="_blank"> Great Solidity Developers | In progress...</a>
    <ul className="navbar-nav px-3">
      <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
        <small><a className="nav-link" href="#"><span id="account"></span></a></small>
      </li>
    </ul>
  </nav>

</div>
);
}
}
export default App;