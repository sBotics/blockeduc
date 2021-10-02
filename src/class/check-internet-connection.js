import {UrlDictionary} from "./url-dictionary.js";

const axios = require('axios');

const urlDictionary = new UrlDictionary();

export class CheckInternetConnection {
    async isOnline() {
        try {
            return !!(await axios.get(urlDictionary.getGoogle()));
        } catch (error) {
            console.error(error);
            return false;
        }
    }
}

