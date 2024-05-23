// main.js

// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain,Notification ,nativeImage  } = require('electron')
const path = require('node:path')
let mainWindow
const createWindow = () => {
  
  // Create the browser window.
   mainWindow = new BrowserWindow({
    frame: false ,
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })
  
  // 加载 index.html
  mainWindow.loadFile('index.html')

  // 打开开发工具
  mainWindow.webContents.openDevTools()
}

function handleActionBar (event, arg) {
  if (arg === 'minimize') {  
    mainWindow.minimize();  
  } else if (arg === 'maximize') {  
    if (mainWindow.isMaximized()) {  
      mainWindow.unmaximize();  
    } else {  
      mainWindow.maximize();  
    }  
  } else if (arg === 'close') {  
    mainWindow.close();  
  }  
}

// 这段程序将会在 Electron 结束初始化
// 和创建浏览器窗口的时候调用
// 部分 API 在 ready 事件触发后才能使用。
app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    // 在 macOS 系统内, 如果没有已开启的应用窗口
    // 点击托盘图标时通常会重新创建一个新窗口
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
}).then(() => {
  ipcMain.on('actionbar-message', handleActionBar)
})

// 除了 macOS 外，当所有窗口都被关闭的时候退出程序。 因此, 通常
// 对应用程序和它们的菜单栏来说应该时刻保持激活状态, 
// 直到用户使用 Cmd + Q 明确退出
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
// before the app is terminated, clear both timers
app.on('before-quit', () => {
})
// 在当前文件中你可以引入所有的主进程代码
// 也可以拆分成几个文件，然后用 require 导入。