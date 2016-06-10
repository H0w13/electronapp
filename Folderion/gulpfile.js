var gulp = require('gulp');
var concat = require('gulp-concat');
var mainBowerFiles = require('main-bower-files');
var filter = require('gulp-filter');

gulp.task('bower', function() {
  const f = filter('**/!(jquery*.js)');
  return gulp.src(mainBowerFiles())
  .pipe(f)
  .pipe(gulp.dest(
    './app/scripts/external/'));
});

gulp.task('css', function() {
  return gulp.src("./bower_components/bootstrap/dist/css/*.min.css")
    .pipe(concat('external.css'))
    .pipe(gulp.dest(
      './app/styles/'));
});

gulp.task('jquery', function() {
  const f = filter('**/jquery*.js');
  return gulp.src(mainBowerFiles())
  .pipe(f)
    .pipe(concat('jquery.all.js'))
    .pipe(gulp.dest(
      './app/scripts/external/'));
});

gulp.task('default', ["bower", "css", "jquery"], function() {});
