// this helper exposes require inside mocha tests run with karma
global = window.parent;
process = window.process || window.parent.process;
require = window.require || window.parent.require;