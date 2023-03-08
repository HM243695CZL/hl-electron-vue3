import os from 'os';
import { contextBridge, ipcRenderer } from 'electron';

const setTitle = async (title: string) => {
  await ipcRenderer.invoke('on-setTitle-event', title);
}

const setScreen = async (value: string) => {
  await ipcRenderer.invoke('on-setScreen-event', value);
}

contextBridge.exposeInMainWorld('electronAPI', {
  platform: os.platform(),
  setTitle,
  setScreen
});
