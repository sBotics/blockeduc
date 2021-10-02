const fs = require('fs')
import {ApplicationManager} from "../class/application-manager.js";

export const openFileSbotics = () => {
    try {
        return JSON.parse(fs.readFileSync(new ApplicationManager().getFolderTemp() + "/blockdata.sBotics", {encoding: 'utf8'}));
    } catch {
        return false;
    }
}