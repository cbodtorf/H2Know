const gulp = require('gulp');
const sass = require('gulp-sass');
const babel = require('gulp-babel');
const browserify = require('gulp-browserify');

// Default runner
gulp.task('default', ['html','css','js']);

gulp.task('html', function() {
    gulp.src('./index.html')
    .pipe(gulp.dest('./public'));
});

gulp.task('css', function() {
    gulp.src('./css/styles.scss')
    .pipe(sass())
    .pipe(gulp.dest('./public'));
});

gulp.task('js', function() {
  return gulp.src('./js/app.js')
  .pipe(browserify())
  .pipe(babel({
            presets: ['es2015']
        }))
  .pipe(gulp.dest('./public'));
});

gulp.task('watch', function() {
  gulp.watch('./css/*.scss', ['css']);
  gulp.watch('./index.html', ['html']);
  gulp.watch('./js/*.js', ['js']);
  gulp.watch('./js/*/*.js', ['js']);
});
