var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var jshint = require('gulp-jshint');

gulp.task('lint', function() {
  return gulp.src('*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});


gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});

gulp.task('style', function () {
  return gulp.src('./stylesheets/style.styl')
    .pipe(stylus())
    .pipe(gulp.dest('./stylesheets/build'));
});
