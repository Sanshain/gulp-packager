var imports = require('./pack')
const path = require('path');

/*
let path = file.path.substr(0, file.path.lastIndexOf('\\'))

console.log(__dirname)
path = path.substr(__dirname.length + 1);//*/

// imports.integrate("samples/prime.ts")
const r = imports.integrate("samples/init.ts")
console.log(r);

console.log('test success')