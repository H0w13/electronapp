//'use strict';

const electron = require('electron')
// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow

const electronOauth2 = require('./scripts/lib/oauth.js');

var config = {
  clientId: '59914024-adca-4947-99f0-7f39ea725a4e',
  authorizationUrl: 'https://login.live.com/oauth20_authorize.srf',
  tokenUrl: 'https://login.live.com/oauth20_token.srf',
  redirect_uri: 'https://login.live.com/oauth20_desktop.srf',
  useBasicAuthorizationHeader: false,
  scope: 'onedrive.readwrite'
};


// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow(windowParams) {
  // Create the browser window.
  mainWindow = new BrowserWindow(windowParams)

  //mainWindow.webContents.openDevTools();

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

  const options = {
    scope: 'onedrive.readwrite'
  };

  createWindow(windowParams);
  const myApiOauth = electronOauth2(config, windowParams, mainWindow);

  myApiOauth.getAccessToken(options)
    .then(token => {
      // use your token.access_token 
      global.config = {
        access_token : token.access_token,
        user_id : token.user_id
      };
      mainWindow.loadURL('file://' + __dirname + '/index.html');
      //   myApiOauth.refreshToken(token.refresh_token)
      //     .then(newToken => {
      //       //use your new token 
      //       process.stdout.write("newToken="+newToken+"\n");
      //     });
    });
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
