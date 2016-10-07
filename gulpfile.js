var gulp = require('gulp'),
	sass = require('gulp-sass'),
	uglify = require ('gulp-uglify'),
	concat = require('gulp-concat'),
	watch = require('gulp-watch'),
	del = require('del'),
	imagemin = require('gulp-imagemin'),
	cache = require('gulp-cache'),
	spritesmith = require('gulp.spritesmith'),
	gulpsync = require('gulp-sync')(gulp);

gulp.task('delApp', function () {
	return del('app');
});

gulp.task('sass', function() {
  return gulp.src(['dist/sass/screen.scss', 'dist/sass/ie.scss'])
  .pipe(sass())
  .pipe(gulp.dest('app/css/'));
});

gulp.task('script', function () {
	return gulp.src('dist/js/dist/*.js')
		   .pipe(concat('script.min.js'))
		   .pipe(gulp.dest('dist/js/src'))	
});

gulp.task('libs', function () {
	return gulp.src('dist/js/vendor/*.js')
		   .pipe(concat('libs.js'))
		   .pipe(gulp.dest('app/js/vendor'))	
});

gulp.task('uglify', function () {
	return gulp.src('dist/js/src/*.js')
		   .pipe(uglify())	
		   .pipe(gulp.dest('app/js/src/'));
});

gulp.task('imagemin', function () {
	return gulp.src('dist/img/**/*')
		   .pipe(cache(imagemin({
		   		   	interlaced: true,
		               progressive: true,
		               svgoPlugins: [{removeViewBox: false}]
		   		})))
		   .pipe(gulp.dest('app/img'))
});

gulp.task('sprite', function () {
	var spriteData = gulp.src('dist/img/for-sprite/*.png')
				.pipe(spritesmith({
					imgName: 'sprite.png',
					cssName: '_sprite-file.scss',
					imgPath: '../img/sprite.png',
					algorithm: 'left-right'
				}));
		return spriteData.pipe(gulp.dest('app/img/'));

});

gulp.task('sprite-retina', function () {
	var spriteData = gulp.src('dist/img/for-sprite-retina/*.png')
				.pipe(spritesmith({
					imgName: 'sprite@2x.png',
					cssName: '_sprite-file@2x.scss',
					imgPath: '../img/sprite.png',
					algorithm: 'left-right'
				}));
		return spriteData.pipe(gulp.dest('app/img/'));

});

gulp.task('watch', function () {
	gulp.watch('dist/sass/*.scss', ['sass']);
	gulp.watch('dist/js/dist/all.js', ['uglify']);
});

gulp.task('default', gulpsync.sync([ 'delApp', 'imagemin', 'sprite', 'sprite-retina','uglify', 'script', 'libs', 'sass', 'watch']), 

	function () {
	var fontApp = gulp.src('dist/fonts/**/*')
				.pipe(gulp.dest('app/fonts'));
	var indexApp = gulp.src('dist/*.html')
				.pipe(gulp.dest('app'));
});