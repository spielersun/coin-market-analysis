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

    // Did Mount Hook
    // Run the query directly
    componentDidMount(){
        this.getMarketValuesHandler(this.state.linesLimit);
    };

    // Did Update Hook
    // Run the query if limit changed
    componentDidUpdate(){
        this.checkLimitState(this.props.limit);
    };

    // Get data from the API with limit or new limit
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
    
    // Check the state
    // If the limit changed, run a new query
    checkLimitState = (newLimit) => {
        const oldLimit = this.state.linesLimit;

        // If it's the old one don't do anything
        // This is not an elegant move, 
        // But in a project this simlicity, does not matter much
        if (oldLimit !== newLimit){
            this.getMarketValuesHandler(newLimit);
            this.setState({linesLimit: newLimit});
        };
    };

    // Send props one by one and print the row
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

        // Print table header then, content
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