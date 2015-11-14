// this helper exposes require inside mocha tests run with karma
global = window.parent;
process = window.process || window.parent.process;
require = window.require || window.parent.require;

// create shorthand for loading node modules in renderer process
// TODO: this should work by default...
rRequire = require('remote').require;