var gulp = require('gulp');
var integrate = require('./pack')
var ts = require('gulp-typescript');
var pack = require('./index')

var rename = require("gulp-rename");

gulp.task('build', function() {
    
    // .pipe(rename((path) => path.extname = '.js')) 

    return gulp.src('./samples/**/init.ts') 
        .pipe(pack({ release : true }))        
        .pipe(ts())                                             
        .pipe(gulp.dest('./samples'))
});


gulp.task('watch', () => gulp.watch('samples/**/*.ts', gulp.series('build'))); 

gulp.task('default', gulp.series('build', 'watch'));