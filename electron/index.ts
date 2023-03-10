import { app, BrowserWindow } from 'electron';
import { setTitle } from './controller/main';
import { createMainWindow } from './windows/mainWindows';

app.whenReady().then(() => {
  createMainWindow(BrowserWindow);
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createMainWindow(BrowserWindow);
  });
  // 初始化监听事件
  setTitle();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
