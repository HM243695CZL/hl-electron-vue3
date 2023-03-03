import { ipcMain, BrowserWindow, shell } from "electron";

const setTitle = () => {
    ipcMain.handle('on-setTitle-event', (event, title) => {
        const webContents = event.sender;
        const win = BrowserWindow.fromWebContents(webContents);
        win?.setTitle(title);
        return '已收到';
    })
}

export {
    setTitle
}