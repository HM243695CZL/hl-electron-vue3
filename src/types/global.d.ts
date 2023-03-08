export interface IElectronAPI {
  setTitle: Function;
  platform: string;
  setScreen: Function;
}

declare global {
  interface Window {
    electronAPI: IElectronAPI;
  }
}
