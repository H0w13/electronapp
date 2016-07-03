var gulp = require('gulp'),
  childProcess = require('child_process'),
  electron = require('electron-prebuilt');
var concat = require('gulp-concat');
var mainBowerFiles = require('main-bower-files');
var filter = require('gulp-filter');
var rename = require("gulp-rename");

gulp.task('bower', function () {
  const f = filter('**/{angular,d3,require,metro.min}.js');
  return gulp.src(mainBowerFiles())
    .pipe(f)
    .pipe(gulp.dest(
      './app/scripts/external/'));
});

gulp.task('css', function () {
  return gulp.src("./bower_components/metro-dist/css/*.min.css")
    .pipe(concat('metro.css'))
    .pipe(gulp.dest(
      './app/styles/'));
});

gulp.task('fonts', function () {
  return gulp.src("./bower_components/metro-dist/fonts/*")    
    .pipe(gulp.dest(
      './app/fonts/'));
});

gulp.task('jquery', function () {
  return gulp.src('./bower_components/jquery/dist/jquery.min.js')
    .pipe(gulp.dest(
      './app/scripts/external/'));
});
gulp.task('nodemodules', function () {
  return gulp.src("./node_modules/punycode/punycode.js")
    .pipe(gulp.dest(
      './app/scripts/external/'));
});
gulp.task('run', ["bower", "jquery","css", "fonts", "nodemodules"], function () {
  childProcess.spawn(electron, ['./app'], { stdio: 'inherit' });
});

gulp.task('default', ["bower", "jquery","css", "fonts", "nodemodules"], function () { });
