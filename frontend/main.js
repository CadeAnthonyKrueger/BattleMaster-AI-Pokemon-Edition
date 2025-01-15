const { app, BrowserWindow, screen } = require('electron');
const path = require('path');

let mainWindow;

function createWindow() {

    const { width, height } = screen.getPrimaryDisplay().workAreaSize;
    const newWidth = width / 1.92;
    const newHeight = height / 1.36;

    // Create the browser window.
    mainWindow = new BrowserWindow({
        width: newWidth,
        height: newHeight,
        title: "Pokemon AI Showdown",
        icon: path.join(__dirname, 'public', 'assets', 'pokeball_icon.png'),
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),  // Add preload script if you need it
            nodeIntegration: true  // Allows use of Node.js features in the renderer process
        }
    });

    // Load the index.html (or the React app if running in development mode)
    mainWindow.loadURL('http://localhost:3000');  // Adjust URL if using production build

    // Open DevTools for debugging (only in development)
    if (process.env.NODE_ENV === 'development') {
        mainWindow.webContents.openDevTools();
    }

    // When the window is closed, quit the app
    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

// Called when Electron has finished initializing
app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        // On macOS, recreate a window when clicking the app icon
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

// Quit the app when all windows are closed (except on macOS)
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
