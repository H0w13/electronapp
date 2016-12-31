//'use strict';

const electron = require('electron')
// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow(windowParams) {
  // Create the browser window.
  mainWindow = new BrowserWindow(windowParams)

  //mainWindow.webContents.openDevTools();
  mainWindow.loadURL('file://' + __dirname + '/index.html');
  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    mainWindow = null
  })
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
//app.on('ready', createWindow);
app.on('ready', () => {
  const windowParams = {
    width: 1200,
    height: 800,
    frame: true,
    alwaysOnTop: true,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: true
    }
  }

  createWindow(windowParams);
});

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
});

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
    mainWindow.loadURL('file://' + __dirname + '/index.html');
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
