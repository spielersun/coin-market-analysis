import React, { Component } from 'react';
import {Bubble} from 'react-chartjs-2';
import axios from 'axios';
import './Chart.css';


class Chart extends Component {
  state = {
    marketValues: [],
    linesLimit: 100,
    error: false,
    bubbleList: []
  }

  componentDidMount(){
    this.getMarketValuesHandler(this.state.linesLimit);
  };

  componentDidUpdate(){
    this.changeLimitState(this.props.limit);
  };

  getMarketValuesHandler = (newLimit) => {
    axios.get('http://api.coinmarketcap.com/v2/ticker/?sort=rank&limit=' + newLimit)
        .then(response => {
            const rowList = response.data.data;
            const rows = Object.keys(rowList).map((k) => rowList[k]);
            this.setState({marketValues: rows});

            const dimensionalList = this.state.marketValues.map(row => {
              return ({
                x: row.quotes["USD"]["market_cap"], 
                y: row.quotes["USD"]["volume_24h"], 
                r: Math.abs(row.quotes["USD"]["percent_change_24h"])
              });
            });

            this.setState({bubbleList: dimensionalList});
        })
        .catch(error => {
            this.setState({error: true});
        });
  };

  changeLimitState = (newLimit) => {
    const oldLimit = this.state.linesLimit;

    if (oldLimit !== newLimit){
      this.getMarketValuesHandler(newLimit);
      this.setState({linesLimit: newLimit});
    };
  };

  render() {
    const data = {
      labels: ['Recent'],
      datasets: [
        {
          label: 'Coin Market Cap',
          fill: false,
          lineTension: 0.1,
          backgroundColor: 'rgba(42,157,249,0.5)',
          borderColor: 'rgba(75,192,192,1)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(75,192,192,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(75,192,192,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: this.state.bubbleList
        }
      ]
    };

    let content = <p style={{textAlign:'center'}}>Something went wrong...</p>;
    

    if (!this.state.error){
      content = <Bubble data={data}/>;
    };

    return (
      <div className="Chart">
        {content}
      </div>
    );
  }
}

export default Chart;