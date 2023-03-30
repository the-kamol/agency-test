const gulp = require("gulp");
const sass = require("gulp-sass");
const browserSync = require("browser-sync").create();

// compile sass to css

function style() {
	return gulp
		.src("./sass/main.sass")
		.pipe(sass().on("error", sass.logError))
		.pipe(gulp.dest("./css"))
		.pipe(browserSync.stream());
}

function watch() {
	browserSync.init({
		server: {
			baseDir: "./",
		},
	});
	gulp.watch("./sass/**/*.sass", style);
	gulp.watch("./*.html").on("change", browserSync.reload);
	gulp.watch("./js/**/*.js").on("change", browserSync.reload);
}

exports.style = style;
exports.watch = watch;
