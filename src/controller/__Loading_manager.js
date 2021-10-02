import {CheckInternetConnection} from "../class/check-internet-connection.js";
import {LoadCheck} from "../class/load-check.js";
import {FileUser} from "../class/file-user.js";
import {ConnectionManager} from "../class/connection-manager.js";

const checkInternetConnection = new CheckInternetConnection();
const loadCheck = new LoadCheck();
const connectionManager = new ConnectionManager();

/* Check Online Connection */
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

        /* Search Programing And Open DataBase */

        if (loadCheck.isComplete()) {
            console.log("Pronto para TROCAR A VIEW")
        }


    }).catch(() => {
        loadCheck.events('__LOAD_MOSS_ServerConnection', false);
        loadCheck.events('__LOAD_MOSS_SearchAndLoadProgram', false);
    })

}).catch(e => {
    console.error(e);
})


/*
* -> Acessar o arquivo de configuração do launcher
* -> Pegar o token do user
* -> Fazer uma request para o wEduc, request user
*    > then('Proceed')
*    > catch('error init')
*
* */


