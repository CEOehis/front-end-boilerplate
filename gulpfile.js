var gulp = require('gulp');
var connect = require('gulp-connect');
var babel = require('gulp-babel');
var sass = require('gulp-sass');
var concat = require('gulp-concat');


// server and livereloading
gulp.task('server', function() {
    connect.server({
      root: '.',
      port: 2345,
      livereload: true
    })
});

// hook for live reload
gulp.task('html', function() {
    gulp.src('./index.html')
      .pipe(connect.reload())
});

// sass compilation
gulp.task('sass', function() {
    gulp.src('sass/**/*.scss')
      .pipe(sass()
        .on('error', sass.logError))
      .pipe(gulp.dest('assets/css'));
});


gulp.task('js', function() {
    gulp.src('scripts/*.js')
      .pipe(babel())
      .pipe(concat('script.js'))
      .pipe(gulp.dest('assets/js'));
});


gulp.task('watch', function() {
    gulp.watch(['index.html', 'sass/*.scss', 'scripts/*.js'], ['html', 'sass', 'js']);
});

gulp.task('default',['server', 'watch', 'sass', 'js']);