var gulp = require('gulp'),
  childProcess = require('child_process'),
  electron = require('electron-prebuilt');
var concat = require('gulp-concat');
var mainBowerFiles = require('main-bower-files');
var filter = require('gulp-filter');
var rename = require("gulp-rename");
var es = require('event-stream');

gulp.task('framework', function () {
  const f = filter('**/{jquery,angular,metro.min}.js');
  return gulp.src(mainBowerFiles())
    .pipe(f)
    .pipe(gulp.dest(
      './build/scripts/lib/'));
});
gulp.task('css', function () {
  return es.concat(
    gulp.src("./bower_components/metro-dist/css/*.min.css")
      .pipe(concat('metro.css'))
      .pipe(gulp.dest(
        './build/styles/')),
    gulp.src('./app/styles/**/*')
      .pipe(gulp.dest('./build/styles/'))
  );
});
gulp.task('fonts', function () {
  return gulp.src("./bower_components/metro-dist/fonts/*")
    .pipe(gulp.dest(
      './build/fonts/'));
});

gulp.task('scripts', function () {
  return es.concat(
    gulp.src("./app/scripts/controllers/*.js")
      .pipe(concat("controllers.js"))
      .pipe(gulp.dest(
        './build/scripts/')),
    gulp.src("./app/scripts/services/*.js")
      .pipe(concat("services.js"))
      .pipe(gulp.dest(
        './build/scripts/')),
    gulp.src("./app/scripts/lib/*.js")
      .pipe(gulp.dest(
        './build/scripts/lib/')),
    gulp.src("./app/scripts/models/*.js")
      .pipe(gulp.dest(
        './build/scripts/models/')),
    gulp.src("./app/scripts/*.js")
      .pipe(gulp.dest(
        './build/scripts/'))
  );
});

gulp.task('app', function () {
  return es.concat(
    gulp.src("./app/*")
      .pipe(gulp.dest(
        './build/')),
    gulp.src("./app/templates/*")
      .pipe(gulp.dest(
        './build/templates/'))
  );
});

gulp.task('run', ["framework", "css", "fonts", "scripts", "app"], function () {
  childProcess.spawn(electron, ['./build'], { stdio: 'inherit' });
});

gulp.task('default', ["framework", "css", "fonts", "scripts", "app"], function () { });
