const { app, BrowserWindow } = require('electron');

let mainWindow;

function createMainWindow() {
  // Create a new browser window
  mainWindow = new BrowserWindow({
    width: 800, // Adjust the width as needed
    height: 600, // Adjust the height as needed
    webPreferences: {
      nodeIntegration: true // Enable Node.js integration in your renderer process
    }
  });

  // Load your HTML file into the main window
  mainWindow.loadFile('index.html');

  // Close the window when the app is closed
  mainWindow.on('closed', function () {
    mainWindow = null;
  });
}
app.on('ready', createMainWindow);

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
app.whenReady().then(createMainWindow);
