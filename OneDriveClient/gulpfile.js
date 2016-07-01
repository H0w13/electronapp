var gulp = require('gulp'),
  childProcess = require('child_process'),
  electron = require('electron-prebuilt');
var concat = require('gulp-concat');
var mainBowerFiles = require('main-bower-files');
var filter = require('gulp-filter');
var rename = require("gulp-rename");

gulp.task('bower', function () {
  const f = filter('**/!(jquery*.js)');
  return gulp.src(mainBowerFiles())
    .pipe(f)
    .pipe(gulp.dest(
      './app/scripts/external/'));
});

gulp.task('css', function () {
  return gulp.src("./bower_components/bootstrap/dist/css/*.min.css")
    .pipe(concat('external.css'))
    .pipe(gulp.dest(
      './app/styles/'));
});

gulp.task('jquery', function () {
  const f = filter('**/jquery*.js');
  return gulp.src(mainBowerFiles())
    .pipe(f)
    .pipe(concat('jquery.all.js'))
    .pipe(gulp.dest(
      './app/scripts/external/'));
});
gulp.task('nodemodules', function () {
  return gulp.src("./node_modules/punycode/punycode.js")
    .pipe(gulp.dest(
      './app/scripts/external/'));
});
gulp.task('run', ["bower", "css", "jquery", "nodemodules"], function () {
  childProcess.spawn(electron, ['./app'], { stdio: 'inherit' });
});

gulp.task('default', ["bower", "css", "jquery", "nodemodules"], function () { });
