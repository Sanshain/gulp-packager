
const gulp = require('gulp');
const ts = require('gulp-typescript');

var cache = require('gulp-cached');

let packager = require('./index')

// const changed = require('gulp-changed');
var rename = require("gulp-rename");

gulp.task('build', function() {
    
    // .pipe(rename((path) => path.extname = '.js')) 
    // .pipe(changed('samples'))  

    let src = './samples/**/init.ts';
    
    return gulp.src(src)                       
        .pipe(cache('samples/**/init.ts'))
        .pipe(rename((path) => path.extname = '.js'))                              
        .pipe(packager({ release : true }))   
        // .pipe(ts())    
        .pipe(gulp.dest('./samples'))
});


gulp.task('watch', () => gulp.watch('samples/**/*.ts', gulp.series('build')))

gulp.task('default', gulp.series('build', 'watch'));
