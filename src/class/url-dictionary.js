export class UrlDictionary {
    getGoogle() {
        return "https://google.com"
    }

    getUser(){
        return "https://weduc.natalnet.br/api/user"
    }

    getProgram(programID){
        return `https://weduc.natalnet.br/api/programs/${programID}`
    }

}