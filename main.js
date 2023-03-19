const { app, powerSaveBlocker, BrowserWindow, Menu } = require('electron');
const path = require('path');

const signdURL = "https://signd.mawersoft.co.uk/";
let powerSaveBlockerId;

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    kiosk: true,
    frame: false,
    webPreferences: {
        devTools: true,
        preload: path.join(__dirname, 'preload.js'),
    },
  });

  win.loadURL(signdURL);
  //TODO: show offline page if offline, redirect to online page when system goes online
}

app.whenReady().then(() => {
    Menu.setApplicationMenu(null);
    powerSaveBlockerId = powerSaveBlocker.start('prevent-display-sleep');
    createWindow();
});

app.on('window-all-closed', () => {
    app.quit();
});