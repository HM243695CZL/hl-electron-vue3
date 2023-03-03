import os from 'os';
import { contextBridge, ipcRenderer } from 'electron';

const setTitle = async (title: string) => {
  await ipcRenderer.invoke('on-setTitle-event', title);
}

contextBridge.exposeInMainWorld('electronAPI', {
  platform: os.platform(),
  setTitle
});
