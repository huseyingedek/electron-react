const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

let win;

function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false,  // nodeIntegration'ı kapatıyoruz
      contextIsolation: true,  // contextIsolation'ı açıyoruz
      preload: path.join(__dirname, 'preload.js'), // preload dosyasını doğru şekilde tanımlıyoruz
    },
  });

  win.loadURL('http://localhost:3000'); // React uygulamanız burada çalışıyor

  win.on('closed', () => {
    win = null;
  });

  // IPC ile geri tuşu fonksiyonunu dinleme
  ipcMain.handle('go-back', () => {
    if (win.webContents.canGoBack()) {
      win.webContents.goBack(); // Sayfayı geri al
    } else {
      console.log('No history to go back');
    }
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});
