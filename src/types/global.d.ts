export interface IElectronAPI {
  setTitle: Function;
  platform: string;
}

declare global {
  interface Window {
    electronAPI: IElectronAPI;
  }
}
