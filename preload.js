const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  goBack: () => ipcRenderer.invoke('go-back'),
});
