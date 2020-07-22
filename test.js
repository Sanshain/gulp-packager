var imports = require('./pack')
const path = require('path');

/*
let path = file.path.substr(0, file.path.lastIndexOf('\\'))

console.log(__dirname)
path = path.substr(__dirname.length + 1);//*/

imports.integrate("samples/prime.ts")

console.log('test success')