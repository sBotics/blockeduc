import { UrlDictionary } from "./url-dictionary.js";

let extend = require("extend-shallow");
let axios = require("axios");

const urlDictionary = new UrlDictionary();

export class ConnectionManager {
  getDictionary() {
    return {
      google: "https://google.com",
      user: `https://auth.sbotics.net/api/user`,
      program: `https://sbotics.net/api/programs`,
    };
  }

  async getUser(options) {
    options = extend(
      {
        accessToken: "",
      },
      options
    );

    const accessToken = options.accessToken;

    if (!accessToken) return false;

    return new Promise((resolve, reject) => {
      axios
        .get(this.getDictionary()['user'], {
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
  async getPrograming(options) {
    options = extend(
      {
        accessToken: "",
        programId: undefined,
      },
      options
    );
    const accessToken = options.accessToken;
    const programId = options.programId;

    if (!accessToken || !programId) return false;

    return new Promise((resolve, reject) => {
      axios
        .get(`${this.getDictionary()['program']}/${programId}`, {
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
