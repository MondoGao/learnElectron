import { app, BrowserWindow } from 'electron';
import path from 'path';
import url from 'url';
import installExtension, * as extensions from 'electron-devtools-installer';

function installExtensions() {
  const plugins = [
    extensions.REACT_DEVELOPER_TOOLS,
    extensions.REDUX_DEVTOOLS,
  ];

  return Promise.all(plugins.map(plug => installExtension(plug)));
}

let win;

function createWindow() {
  win = new BrowserWindow({
    width: 500,
    height: 650,
    center: true,
    resizable: false,
    fullscreenable: false,
    frame: false, 
    transparent: true,
    hasShadow: false, 
    show: false,
  });

  win.loadURL(url.format({
    pathname: path.join(__dirname, 'app.html'),
    protocol: 'file:', 
    slashes: true, 
  }));

  win.on('ready-to-show', () => {
    win.show();
  });
  win.on('closed', () => {
    win =  null;
  });
}

app.on('ready', async () => {
  if (process.env.NODE_ENV === 'develop') {
    await installExtensions();
  }

  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
})

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
})
