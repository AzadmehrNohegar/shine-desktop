"use strict";

// src/preload/index.ts
var import_electron = require("electron");
import_electron.contextBridge.exposeInMainWorld("electron", {
  onRequest: (endpoint, body, params, id) => import_electron.ipcRenderer.invoke(endpoint, {
    body,
    params,
    id
  }),
  onResponse: (cb) => import_electron.ipcRenderer.on("reply-msg", (e, msg) => {
    cb(msg);
  })
});
