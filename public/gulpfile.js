var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var karma = require('karma').Server; 
var jshint = require('gulp-jshint');

gulp.task('test', function(done){   
	new karma({     configFile: __dirname + '/karma.conf.js'   
	}, done).start(); 
});

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


gulp.task('one', function () {
  return gulp.src('./css/one.styl')
    .pipe(stylus())
    .pipe(gulp.dest('./css/build'));
});
