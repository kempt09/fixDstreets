var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var jshint      = require('gulp-jshint');
    karma       = require('karma').Server;
var stylus      = require('gulp-stylus');

//Default task
gulp.task('default', ['watch']);

//test with Karma
gulp.task('test', function(done){
  new karma({
    configFile: __dirname + '/karma.conf.js'
  }, done).start();
});

//jshint
gulp.task('lint', function() {
  return gulp.src('./js/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

//browser-sync
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});

//Compile in stylus
gulp.task('style', function () {
  return gulp.src('./stylesheets/style.stylus')
    .pipe(stylus())
    .pipe(gulp.dest('./stylesheets/build'));
});

//Watch files for changes
gulp.task('watch', function(){
  gulp.watch('./stylesheets/style.stylus', ['stylus']);
  gulp.watch('./js/**/*.js', ['jshint', 'build-js']);
});
