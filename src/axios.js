import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://api.coinmarketcap.com/v2/ticker/'
});

export default instance;