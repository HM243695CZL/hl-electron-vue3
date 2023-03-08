import windowStateKeeper from 'electron-window-state';
import path from 'path';
import { app } from 'electron';

const createMainWindow = (BrowserWindow: any) => {
    const mainWindowState = windowStateKeeper({
        defaultWidth: 1000,
        defaultHeight: 800
    });
    const win = new BrowserWindow({
        x: mainWindowState.x,
        y: mainWindowState.y,
        width: mainWindowState.width,
        height: mainWindowState.height,
        minWidth: 1050,
        minHeight: 600,
        focusable: true,
        show: false,
        frame: false,
        webPreferences: {
            webSecurity: true,
            nodeIntegration: true,
            contextIsolation: true,
            preload: path.join(__dirname, './preload/index.js')
        }
    });
    win.webContents.openDevTools();
    mainWindowState.manage(win);
    if (app.isPackaged) {
        win.loadFile(path.join(__dirname, '../index.html'));
    } else {
        win.loadURL(process.env.VITE_DEV_SERVER_URL as string);
    }
    win.on('ready-to-show', () => {
        win.show();
    });
}

export {
    createMainWindow
}