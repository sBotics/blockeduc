const events = 4;
let eventsSuccess = 0;

export class LoadCheck {
    constructor(base = true) {
        if(base){
            this.state = "processing";
            document.getElementById('__LOAD_MOSS_InternetConnection').style.backgroundColor = this.colors();
            document.getElementById('__LOAD_MOSS_ServerConnection').style.backgroundColor = this.colors();
            document.getElementById('__LOAD_MOSS_UserLoad').style.backgroundColor = this.colors();
            document.getElementById('__LOAD_MOSS_SearchAndLoadProgram').style.backgroundColor = this.colors();
        }
    }
    events(objectID, state) {
        this.state = state;
        document.getElementById(objectID).style.backgroundColor = this.colors();
    }
    isComplete(){
        return eventsSuccess >= events;
    }
    colors() {
        return this.state === "processing" ? '#0021a7' : this.state ? '#00a70c' : '#a70000';
    }
}