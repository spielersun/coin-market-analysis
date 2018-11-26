import React, { Component } from 'react';
import List from './components/List/List';
import Chart from './components/Chart/Chart';
import {Route, Switch, NavLink} from 'react-router-dom'; 
import './App.css';

class App extends Component {
  state = {
    posts: [],
    linesLimit: 100,
    error: false
  }

  // Change the content limit via state
  // Tickers max limit is 100
  limitHandler = (event) => {
    this.setState({linesLimit: event.target.value})
  }

  render() {
    return (
      <div className="App">
        <header>
          <h1>Coin Market Analysis</h1>
          <ul className="Nav">
            <li><NavLink to="/" activeClassName="active" exact>Market</NavLink></li>
            <li><NavLink to="/liquidity" activeClassName="active" exact>Liquidity</NavLink></li>
            <li>
              <select onChange={this.limitHandler} defaultValue="100">
                <option>3</option>
                <option>5</option>
                <option>10</option>
                <option>50</option>
                <option>100</option>
              </select>
            </li>
          </ul>
        </header>
        <Switch>
          <Route path="/liquidity" exact render={(props) => <Chart {...props} limit={this.state.linesLimit} />} />
          <Route path="/" exact render={(props) => <List {...props} limit={this.state.linesLimit} />} />
        </Switch>
      </div>
    );
  }
}

export default App;
