import { ipcMain, BrowserWindow, shell } from "electron";

const setTitle = () => {
    ipcMain.handle('on-setTitle-event', (event, title) => {
        const webContents = event.sender;
        const win = BrowserWindow.fromWebContents(webContents);
        win?.setTitle(title);
        return '已收到';
    })
}

/**
 * 屏幕缩小、放大、关闭
 */
const setScreen = () => {
    ipcMain.handle('on-setScreen-event', (event, value) => {
        const webContents = event.sender;
        const win = BrowserWindow.fromWebContents(webContents);
        if (value === 'min') {
            win?.minimize();
        }
        if (value === 'max') {
            if (win?.isMaximized()) {
                win.restore();
            } else {
                win?.maximize();
            }
        }
        if (value === 'close') {
            win?.close();
        }
        return '';
    })
}

export {
    setTitle,
    setScreen
}