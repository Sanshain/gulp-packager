var gulp = require('gulp');
var integrate = require('./pack')
var ts = require('gulp-typescript');
var pack = require('./index')

gulp.task('build', function() {
    
    return gulp.src('./samples/prime.ts') 
        .pipe(pack())
        .pipe(ts())
        .pipe(gulp.dest('./samples'))
});

gulp.task('default', function() {
    gulp.watch('samples/**/init.ts', gulp.series('build')); 
});