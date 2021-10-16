import fs from 'fs';
import { URL } from 'url';

const pkg = JSON.parse(fs.readFileSync(new URL('./package.json', import.meta.url).pathname, 'utf8'));

const prefix = '@frida/';
const shims = Object.entries(pkg.dependencies)
  .filter(([name, _]) => name.startsWith(prefix))
  .map(([name, _]) => name.substr(prefix.length));

export default function all(rootUrl) {
  return Object.fromEntries(shims.map(name => [name, new URL(`./node_modules/@frida/${name}`, rootUrl).pathname]));
};
