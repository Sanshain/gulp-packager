var gulp = require('gulp');
var integrate = require('./pack')
var ts = require('gulp-typescript');
var pack = require('./index')

gulp.task('default', function() {
    
    return gulp.src('./samples/prime.ts') 
        .pipe(pack())
        .pipe(ts())
        .pipe(gulp.dest('./samples'))    
});