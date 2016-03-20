var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');


gulp.task('default', function()
{
	return gulp.src('src/cron.js')
		.pipe(uglify())
		.pipe(concat('src/cron.min.js'))
		.pipe(gulp.dest('.'));
});