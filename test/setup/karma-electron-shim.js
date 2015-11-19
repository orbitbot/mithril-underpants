// this shim exposes node globals inside karma runs
window.require = window.top.require;
window.process = window.top.process;
window.__dirname = window.top.__dirname;
require("module").globalPaths.push("./node_modules");