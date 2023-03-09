import './App.css'

import React, {Component} from 'react'

class App extends Component {
  render() {
    return <div className="App">
      <div className="App-heading App-flex">
        <h2>Welcome to <span className="App-react">React</span></h2>
      </div>
      <div className="App-instructions App-flex">
        <p>Chat App created using nwb for the first time</p>
      </div>
    </div>
  }
}

export default App
