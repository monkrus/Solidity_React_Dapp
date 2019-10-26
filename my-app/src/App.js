import React, { Component } from 'react'
import Web3 from 'web3'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {TODO_LIST_ABI, TODO_LIST_ADDRESS} from './config'
import TodoList from './TodoList'


// allows to run our async function within the component part of React
class App extends Component {
UNSAFE_componentWillMount() {
this.loadBlockchainData()
}

//connect our app with blockchain
async loadBlockchainData() {

const web3 = new Web3(Web3.givenProvider || "http://localhost:8545")
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

constructor(props) {
    super(props)
    this.state = {
      account: '',
      taskCount: 0,
      tasks: [],
      loading: true
      }


 this.createTask = this.createTask.bind(this)
    this.toggleCompleted = this.toggleCompleted.bind(this)
  }

  createTask(content) {
    this.setState({ loading: true })
    this.state.todoList.methods.createTask(content).send({ from: this.state.account })
    .once('receipt', (receipt) => {
      this.setState({ loading: false })
    })
  }

  toggleCompleted(taskId) {
    this.setState({ loading: true })
    this.state.todoList.methods.toggleCompleted(taskId).send({ from: this.state.account })
    .once('receipt', (receipt) => {
      this.setState({ loading: false })
    })
  }
    

// curly braces tell React we are going to execute JS
 render() {
    return (
      <div>
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
          <a className="navbar-brand col-sm-3 col-md-2 mr-0" href="https://stackoverflow.com/users/7298873/monkrus?tab=profile" target="_blank">Great Solidity Developers | In progress....</a>
          <ul className="navbar-nav px-3">
            <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
              <small><a className="nav-link" href="#"><span id="account"></span></a></small>
            </li>
          </ul>
        </nav>
        <div className="container-fluid">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex justify-content-center">
              { this.state.loading
                ? <div id="loader" className="text-center"><p className="text-center">Loading...</p></div>
                : <TodoList
                  tasks={this.state.tasks}
                  createTask={this.createTask}
                  toggleCompleted={this.toggleCompleted} />
              }
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;