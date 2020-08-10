const { app, BrowserWindow } = require('electron');
const express = require('express');

const expressApp = express();

const port = process.env.PORT || 3000;

expressApp.use('/js', express.static(__dirname + '/../node_modules/jquery/dist'));
expressApp.use('/js', express.static(__dirname + '/../node_modules/socket.io-client/dist'));
expressApp.use('/js', express.static(__dirname + '/../node_modules/bootstrap/dist/js'));
expressApp.use('/css', express.static(__dirname + '/../node_modules/bootstrap/dist/css'));
expressApp.use('/', express.static(__dirname + '/views'));

/* Initialize Electron App */
const createWindow = () => {
    const win = new BrowserWindow({
        width: 1280,
        height: 500,
        x: 100,
        y: 10,
        webPreferences: {
            nodeIntegration: true,
        }
    });

    win.loadURL('http://localhost:3000').catch(e => {
        console.log(e);
    }).then(() => {
        win.webContents.openDevTools();
    });

    // 테스트용
    const win2 = new BrowserWindow({
        width: 1280,
        height: 500,
        x: 100,
        y: 550,
        webPreferences: {
            nodeIntegration: true,
        }
    });

    win2.loadURL('http://localhost:3000').catch(e => {
        console.log(e);
    }).then(() => {
        win2.webContents.openDevTools();
    });
};

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

process.on('uncaughtException', (err) => {
    console.log(err);
    // relaunch the app (if you want) app.relaunch({args: []}); app.exit(0);
});

const http = require('http').createServer(expressApp);
http.listen(port, () => {
    console.log(`Http server has listening on port ${port}!`);
});

const socket = require('./middlewares/socket');
socket();