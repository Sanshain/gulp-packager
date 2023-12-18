// var imports = require('./pack')
// var build = require('gulp-packager/pack').integrate
var build = require('./pack').integrate
const path = require('path');

/*
let path = file.path.substr(0, file.path.lastIndexOf('\\'))

console.log(__dirname)
path = path.substr(__dirname.length + 1);//*/

// imports.integrate("samples/prime.ts")
// const r = imports.integrate("samples/init.ts")
const r = build("samples/init.ts")
console.log(r);

console.log('test success')