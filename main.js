const {app, screen, dialog, BrowserWindow} = require('electron')
const path = require('path')

/* Error Disabled */
dialog.showErrorBox = function(title, content) {
    console.log(`Erro: ${title}\n${content}`);
};

function createWindow() {
    let ScreenSize = screen.getPrimaryDisplay().bounds;
    const height = Math.round(ScreenSize.height * 0.8);
    const width = Math.round((16 * height) / 9);
    const mainWindow = new BrowserWindow({
        width: width,
        height: height,
        menu: null,
        webPreferences: {
            preload: `${__dirname}/preload.js`,
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,
        }
    })
    mainWindow.loadFile(`${__dirname}/routes/index.html`)
    mainWindow.webContents.openDevTools()
}

app.whenReady().then(() => {
    createWindow()
    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
});

