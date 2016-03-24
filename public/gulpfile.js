var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var jshint = require('gulp-jshint');
var karma  = require('karma').Server;
var stylus = require('gulp-stylus');
var reload = browserSync.reload;

//Default task
gulp.task('default', ['watch', 'browser-sync']);

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
            baseDir: "./bin/www"
        }
    });
});

//Compile in stylus
gulp.task('style', function () {
  return gulp.src('./stylesheets/style.stylus')
    .pipe(stylus())
    .pipe(gulp.dest('./stylesheets/style.css'));
});

//Watch files for changes
gulp.task('watch', function(){
  gulp.watch('./stylesheets/style.stylus', ['style']);
  gulp.watch('./js/**/*.js', ['jshint', 'build-js']);
  gulp.watch("*.html").on("change", reload);
});
