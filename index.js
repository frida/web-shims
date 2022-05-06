const { URL } = require('url');
const pkg = require('./package.json');

const prefix = '@frida/';
const shims = Object.entries(pkg.dependencies)
  .filter(([name, _]) => name.startsWith(prefix))
  .map(([name, _]) => name.substr(prefix.length));

module.exports = function all(rootUrl) {
  const offset = (process.platform === 'win32') ? 1 : 0;
  return Object.fromEntries(shims.map(name => [name, new URL(`./node_modules/@frida/${name}`, rootUrl).pathname.substring(offset)]));
};
