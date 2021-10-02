import {UrlDictionary} from "./url-dictionary.js";

let extend = require('extend-shallow');
let axios = require('axios');

const urlDictionary = new UrlDictionary();

export class ConnectionManager {
    async getUser(options) {
        options = extend(
            {
                accessToken: '',
            },
            options,
        );

        const accessToken = options.accessToken;

        if (!accessToken) return false;

        return new Promise((resolve, reject) => {
            axios
                .get(urlDictionary.getUser(), {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                })
                .then((response) => {
                    resolve(response.data);
                })
                .catch(() => {
                    reject(false);
                });
        });
    }
}