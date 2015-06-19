var gulp = require('gulp'),
  zip = require('gulp-zip'),
  clean = require('gulp-clean'),
  runSequence = require('run-sequence');

gulp.task('predeploy-step1', function () {
  return gulp.src('./example/index.html')
    .pipe(gulp.dest('for_deploy'));
});

gulp.task('predeploy-step2', function () {
  return gulp.src('./dist/bundle.js')
    .pipe(gulp.dest('for_deploy/js'));
});

gulp.task('predeploy-step3', function () {
  return gulp.src('for_deploy/**')
    .pipe(zip('ready.zip'))
    .pipe(gulp.dest('deploy/'));
});

gulp.task('predeploy-step4', function () {
  return gulp.src('./for_deploy', {read: false})
    .pipe(clean());
});

gulp.task('deploy', function () {
  runSequence(
    ['predeploy-step1', 'predeploy-step2'],
    'predeploy-step3',
    'predeploy-step4'
  );
});

gulp.task('xdeploy', function () {
  return gulp.src('./deploy', {read: false})
    .pipe(clean());
});