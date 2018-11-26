import React from 'react';
import './ListItem.css';

// Format Currency 
const moneyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
});

// Get the props, format some and print them
const listItem = (props) => (
    <div className="ListItem">
        <span className="Tiny">{props.rank}</span>
        <span className="Medium">{props.name}</span>
        <span className="Small">{moneyFormatter.format(props.price)}</span>
        <span className="Medium">{props.priceChange}%</span>
        <span className="Medium">{moneyFormatter.format(props.market_cap)}</span>
        <span className="Medium">{moneyFormatter.format(props.volume_24h)}</span>
    </div>
);

export default listItem;