let eventsSuccess = 0;

const events = 4;
const fullProgressBar = 100;

export class LoadCheck {
    constructor(base = true) {
        if (base) {
            this.state = "processing";
            this.changeColorLoading('__LOAD_MOSS_InternetConnection');
            this.changeColorLoading('__LOAD_MOSS_ServerConnection');
            this.changeColorLoading('__LOAD_MOSS_UserLoad');
            this.changeColorLoading('__LOAD_MOSS_SearchAndLoadProgram');
        }
    }

    events(objectID, state) {
        this.state = state;
        eventsSuccess++;
        this.disabledColorLoading(objectID);
        this.progressBar();
        document.getElementById(objectID).style.backgroundColor = this.colors();
    }

    changeColorLoading(objectID) {
        document.getElementById(objectID).getElementsByClassName('double-bounce1')[0].style.backgroundColor = this.colors()
        document.getElementById(objectID).getElementsByClassName('double-bounce2')[0].style.backgroundColor = this.colors()
    }

    disabledColorLoading(objectID) {
        document.getElementById(objectID).getElementsByClassName('double-bounce1')[0].style.display = 'none'
        document.getElementById(objectID).getElementsByClassName('double-bounce2')[0].style.display = 'none'
    }

    colors() {
        return this.state === "processing" ? '#0021a7' : this.state ? '#2CD25E' : '#a70000';
    }

    isComplete() {
        return eventsSuccess >= events;
    }

    progressBar(){
        let percentage = fullProgressBar / events;
        let bar = document.getElementById('__PROGRESSBAR_progress');
        bar.style.width = `${percentage * eventsSuccess}%`;
        bar.style.backgroundColor = this.colors()
    }
}