import {CheckInternetConnection} from "../class/check-internet-connection.js";
import {LoadCheck} from "../class/load-check.js";
import {FileUser} from "../class/file-user.js";
import {ConnectionManager} from "../class/connection-manager.js";
import {openFileSbotics} from "../utils/open-file-sbotics.js";
import {ApplicationManager} from "../class/application-manager.js";

const checkInternetConnection = new CheckInternetConnection();
const loadCheck = new LoadCheck();
const connectionManager = new ConnectionManager();

checkInternetConnection.isOnline().then(r => {
    loadCheck.events('__LOAD_MOSS_InternetConnection', r);

    const user = new FileUser().open()
    let accessToken = undefined;
    if (user) {
        loadCheck.events('__LOAD_MOSS_UserLoad', true);
        accessToken = user['accessToken'];
    }

    connectionManager.getUser({accessToken}).then(r => {
        loadCheck.events('__LOAD_MOSS_ServerConnection', r);

        const dataSbotics = openFileSbotics()
        if(dataSbotics){
            let programID = dataSbotics['code']['id'];
            let programName = dataSbotics['code']['name'];
            let programLanguage = dataSbotics['code']['language'];

            connectionManager.getPrograming({
                accessToken: accessToken,
                programId: programID
            }).then(r => {
                let blockEducCode = r['blockly_code'];

                localStorage.setItem('programID', programID);
                localStorage.setItem('programName', programName);
                localStorage.setItem('programLanguage', programLanguage);
                localStorage.setItem('blockEducCode', blockEducCode);

                loadCheck.events('__LOAD_MOSS_SearchAndLoadProgram', r);

                if (loadCheck.isComplete()) {
                    console.log("Pronto para TROCAR A VIEW")
                    new ApplicationManager().setLoad(false);
                }

            }).catch(() => {
                loadCheck.events('__LOAD_MOSS_SearchAndLoadProgram', false);
            })

        } else {
            loadCheck.events('__LOAD_MOSS_SearchAndLoadProgram', false);
        }

    }).catch(() => {
        loadCheck.events('__LOAD_MOSS_ServerConnection', false);
        loadCheck.events('__LOAD_MOSS_SearchAndLoadProgram', false);
    })

}).catch(() => {
    loadCheck.events('__LOAD_MOSS_InternetConnection', false);
    loadCheck.events('__LOAD_MOSS_UserLoad', false);
    loadCheck.events('__LOAD_MOSS_ServerConnection', false);
    loadCheck.events('__LOAD_MOSS_SearchAndLoadProgram', false);
})