const dotenv = require('dotenv');
dotenv.config();

const path = require('path')
const { app, BrowserWindow, ipcMain } = require('electron');

function createWindow() {
    let mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: path.join(__dirname, 'preload.js')
        }
    });

    mainWindow.loadURL('http://localhost:3000/');
    
    mainWindow.on('closed', () => {
        mainWindow = null;
    });

    return mainWindow;
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit()
    }
})

app.on('activate', () => {
    if (mainWindow === null) {
      createWindow()
    }
})

ipcMain.on('get-new-title', (evt, data) => {
    let receiveData = Array.isArray(data) ? data[0] : data;
    evt.sender.send('display-new-title', receiveData === 0 ? 1 : 0);
});