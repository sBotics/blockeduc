import {FilesManager} from "./files-manager.js";
import {SecurityManager} from "./security-manager.js";

let extend = require('extend-shallow');

const filesManager = new FilesManager();

export class FileUser {
    constructor(options) {
        options = extend(
            {
                defaultPathSave: 'Launcher/data/User.aes',
                decrypted: true,
                JSONParse: true,
                createUserNotFind: false,
            },
            options,
        );

        this.defaultPathSave = options.defaultPathSave;
        this.decrypted = options.decrypted;
        this.JSONParse = options.JSONParse;
        this.createUserNotFind = options.createUserNotFind;
    }

    create() {

    }

    open() {
        if (!this.defaultPathSave) return false;

        const fileFind = !filesManager.FindSync(this.defaultPathSave)
            ? this.createUserNotFind
                ? this.create()
                : false
            : true;

        if (!fileFind) return false;

        const file = filesManager.OpenSync(this.defaultPathSave);

        if (!file) return false;

        const fileDecrypted = new SecurityManager({data: file}).decrypted();

        return JSON.parse(fileDecrypted)
    }
}