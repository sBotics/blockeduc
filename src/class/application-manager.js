let tempPath = require("temp-dir");

export class ApplicationManager {
    getFolderTemp() {
        return tempPath
    }
    setLoad(state){
        document.getElementById("__LOAD__").style.display = state ? "block" : "none";
    }
}