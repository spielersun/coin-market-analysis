import React, { Component } from 'react';
import ListItem from './ListItem/ListItem';
import axios from 'axios';
import './List.css';

class List extends Component {
    state = {
        marketValues: [],
        linesLimit: 100,
        error: false
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
            })
            .catch(error => {
                this.setState({error: true});
            });
    };
    
    changeLimitState(newLimit){
        const oldLimit = this.state.linesLimit;

        if (oldLimit !== newLimit){
            this.getMarketValuesHandler(newLimit);
            this.setState({linesLimit: newLimit});
        };
    };

    render() {
        let content = <p style={{textAlign:'center'}}>Something went wrong.</p>;

        if (!this.state.error){
            content = this.state.marketValues.map(row => {
                return (
                    <ListItem
                        key={row.id}
                        name={row.name} 
                        slug={row.website_slug}
                        rank={row.rank}
                        symbol={row.symbol}
                        price={row.quotes["USD"]["price"]}
                        priceChange={row.quotes["USD"]["percent_change_24h"]}
                        market_cap={row.quotes["USD"]["market_cap"]}
                        volume_24h={row.quotes["USD"]["volume_24h"]}/>
                );
            });
        };

        return (
            <div className="List">
                <div className="ListHead">
                    <span className="Tiny">Rank</span>
                    <span className="Medium">Name</span>
                    <span className="Small">Price</span>
                    <span className="Medium">Price Change (24h)</span>
                    <span className="Medium">Market Cap</span>
                    <span className="Medium">Volume (24h)</span>
                </div>
                {content}
            </div>
        );
    }
}

export default List;