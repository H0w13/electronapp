var gulp = require('gulp');
var concat = require('gulp-concat');
var mainBowerFiles = require('main-bower-files');

gulp.task('bower', function() {
  return gulp.src(mainBowerFiles()).pipe(gulp.dest(
    './app/scripts/external/'));
});

gulp.task('css', function() {
  return gulp.src("./bower_components/bootstrap/dist/css/*.min.css")
    .pipe(concat('external.css'))
    .pipe(gulp.dest(
      './app/styles/'));
});

gulp.task('default', ["bower", "css"], function() {});
