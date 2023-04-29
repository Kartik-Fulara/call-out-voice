import { app, ipcMain, shell } from "electron";
import serve from "electron-serve";
import { createWindow } from "./helpers";
import { execFile, spawn, spawnSync } from "child_process";

const isProd: boolean = process.env.NODE_ENV === "production";

if (isProd) {
  serve({ directory: "app" });
} else {
  app.setPath("userData", `${app.getPath("userData")} (development)`);
}

let mainWindow: Electron.BrowserWindow | null = null;

async function createMainWindow() {
  mainWindow = createWindow("main", {
    width: 1000,
    height: 750,
    webPreferences: {
      nodeIntegration: true,
      devTools: true,
    },
    resizable: false,
    autoHideMenuBar: true,
  });

  if (isProd) {
    await mainWindow.loadURL("app://./home.html");
  } else {
    const port = process.argv[2];
    await mainWindow.loadURL(`http://localhost:${port}/home`);
    // mainWindow.webContents.openDevTools();
  }

  ipcMain.on("run-python-script", (event, args) => {
    console.log(args);
    const pythonProcess = execFile("python/detection.exe", [...args]);

    pythonProcess.stdout.on("data", (data) => {
      mainWindow?.webContents.send("python-script-response", data.toString());
    });

    pythonProcess.stderr.on("data", (data) => {
      if (data.toString().includes("Traceback")) {
        mainWindow?.webContents.send("python-script-response", data.toString());
      }
    });

    pythonProcess.on("close", (code) => {
      console.log(`child process exited with code ${code}`);
    });
  });

  ipcMain.on("start-process-audioinputs", (event, args) => {
    const pythonProcess = execFile("python/testing-ss.exe");

    pythonProcess.stdout.on("data", (data) => {
      mainWindow?.webContents.send(
        "response-process-audioinputs",
        JSON.parse(data.toString())
      );
    });

    pythonProcess.stderr.on("data", (data) => {
      console.error(`stderr: ${data}`);
      if (data.toString().includes("Traceback")) {
        mainWindow?.webContents.send(
          "response-process-audioinputs",
          data.toString()
        );
      }
    });

    pythonProcess.on("close", (code) => {
      console.log(`child process exited with code ${code}`);
    });
  });
}

app.whenReady().then(() => {
  createMainWindow();
});

app.on("ready", () => {
  // Disable the DevTools extension
  // const { session } = require("electron");
  // session.defaultSession.webRequest.onBeforeRequest((details, callback) => {
  //   if (details.url.startsWith("devtools://")) {
  //     callback({ cancel: true });
  //   } else {
  //     callback({ cancel: false });
  //   }
  // });
});

app.on("activate", () => {
  if (mainWindow === null) {
    createMainWindow();
  }
  // close the previous window
  if (mainWindow !== null) {
    mainWindow.close();
  }
});

app.on("window-all-closed", () => {
  app.quit();
});
