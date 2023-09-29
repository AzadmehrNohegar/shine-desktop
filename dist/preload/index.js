"use strict";

// src/preload/index.ts
var import_electron = require("electron");
import_electron.contextBridge.exposeInMainWorld("electron", {
  onRequest: async (endpoint, body, params, id, data) => {
    const response = await import_electron.ipcRenderer.invoke(endpoint, {
      body,
      params,
      id,
      data
    });
    if (response.reason)
      throw response;
    return response;
  },
  onResponse: (cb) => {
    return import_electron.ipcRenderer.on("reply-msg", (e, msg) => {
      cb(msg);
    });
  }
});
