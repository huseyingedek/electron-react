const { contextBridge, ipcRenderer } = require('electron');

// Electron'un API'sini renderer tarafına güvenli bir şekilde expose etme
contextBridge.exposeInMainWorld('electron', {
  goBack: () => ipcRenderer.invoke('go-back'), // 'go-back' mesajını ana işleme gönder
});
