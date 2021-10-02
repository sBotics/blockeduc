import {CheckInternetConnection} from "../class/check-internet-connection.js";
import {LoadCheck} from "../class/load-check.js";

const checkInternetConnection = new CheckInternetConnection();
const loadCheck = new LoadCheck();

/* Check Online Connection */
checkInternetConnection.isOnline().then(r => {
    loadCheck.events('__LOAD_MOSS_InternetConnection', r);

    /* Check Server Connection */
    checkInternetConnection.isServerOnline().then(r => {
        loadCheck.events('__LOAD_MOSS_ServerConnection', r);

        if(r){
            console.log('Loading User and Program')
        }


    }).catch(e=>{
        console.error(e);
    })

}).catch(e=>{
    console.error(e);
})



