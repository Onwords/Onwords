var gulp = require('gulp');
var browserify = require('browserify');
var reactify = require('reactify');
var source = require('vinyl-source-stream');

gulp.task('browserify', function() {
  browserify('./src/js/main.js')
    .transform('reactify')
    .bundle()
    .pipe(source('main.js'))
    .pipe(gulp.dest('./extension/dist/js'));
});

gulp.task('render', function() {
  browserify('src/js/test.js')
    .bundle()
    .pipe(source('test.js'))
    .pipe(gulp.dest('./extension/dist/js'));
})

gulp.task('copy', function() {
  gulp.src('src/index.html')
    .pipe(gulp.dest('dist'));
  gulp.src('src/assets/**/*.*')
    .pipe(gulp.dest('dist/assets'));
});

gulp.task('default',['browserify', 'render', 'copy'], function() {
  return gulp.watch('src/**/*.*', ['browserify', 'render', 'copy'])
});