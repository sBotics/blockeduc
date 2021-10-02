import {UrlDictionary} from "./url-dictionary.js";
const axios = require('axios');

const urlDictionary = new UrlDictionary();

export class CheckInternetConnection {
    async isOnline(){
        try {
            return !!(await axios.get(urlDictionary.google()));
        } catch (error) {
            console.error(error);
            return false;
        }
    }
    async isServerOnline(){
        try {
            return !!(await axios.get(urlDictionary.sBoticsServer()));
        } catch (error) {
            console.error(error);
            return false;
        }
    }
}

