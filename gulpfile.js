var gulp = require('gulp')
var scss = require('gulp-sass')
var uglify = require('gulp-uglifycss')
var serve = require('gulp-serve')
var rename = require('gulp-rename');
var autoprefix = require('gulp-autoprefixer');

var errCatch = function(err) {
	console.log(err.toString());
	this.emit('end');
}

gulp.task('build', function() {
	return gulp.src('src/main.scss')
		.pipe(scss())
		.on('err', errCatch)
		.pipe(rename('satellite.css'))
		.pipe(gulp.dest('dist/'))
		.pipe(uglify())
		.pipe(autoprefix())
		.pipe(rename('satellite.min.css'))
		.pipe(gulp.dest('dist/'));
})

gulp.task('watch', function() {
	gulp.watch('src/*', ['build']);
})

gulp.task('serve', serve(['.']));

gulp.task('default', ['build', 'watch', 'serve']);
