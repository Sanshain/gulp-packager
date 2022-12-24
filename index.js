'use strict';

const gutil = require('gulp-util');
const through = require('through2');

const compile = require('./pack').combine;
const path = require('path');


module.exports = (options) => {
  // Какие-то действия с опциями. Например, проверка их существования,
  // задание значения по умолчанию и т.д.

  // options = {release : true}

  return through.obj(function(file, enc, cb) {
    // Если файл не существует
    if (file.isNull()) {
      cb(null, file);
      return;
    }
    
    // Если файл представлен потоком
    if (file.isStream()) {
      cb(new gutil.PluginError('gulp-import', 'Streaming not supported'));
      return;
    }

    try {        

      let execpath = path.dirname(file.path)        

      var source = file.contents.toString();
      source = compile(source, execpath, options)

      file.contents = Buffer.from(source);
      this.push(file);

    } catch (err) {
        this.emit('error', new gutil.PluginError('gulp-import', err));
    }

    cb();
  });

};