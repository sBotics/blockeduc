let extend = require('extend-shallow');
const Cryptr = require('cryptr');
const cryptr = new Cryptr(process.env.APP_KEY);

export class SecurityManager {
    constructor(options) {
        options = extend(
            {
                data: '',
            },
            options,
        );
        this.data = options.data;
    }

    encrypted() {
        try {
            return this.data ? cryptr.encrypt(this.data) : false;
        } catch (e) {
            return false;
        }
    }

    decrypted() {
        try {
            return this.data ? cryptr.decrypt(this.data) : false;
        } catch (e) {
            return false;
        }
    }
}