import React from 'react';
import './ListItem.css';

const moneyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
});

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