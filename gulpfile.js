const gulp = require("gulp");
const csso = require("gulp-csso");
const sass = require("gulp-sass");
const uglify = require("gulp-uglify");
const autoprefixer = require("gulp-autoprefixer");
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

// Build
function buildHtml() {
	return gulp.src("./**.html").pipe(gulp.dest("dist/"));
}
function buildCss() {
	return gulp
		.src("./css/main.css")
		.pipe(
			autoprefixer({
				overrideBrowserslist: ["defaults"],
			})
		)
		.pipe(csso())
		.pipe(gulp.dest("dist/css"));
}
function buildJs() {
	return gulp.src("./js/**.js").pipe(uglify()).pipe(gulp.dest("dist/js"));
}
function buildAssets() {
	return gulp.src("./assets/**/*").pipe(gulp.dest("dist/assets"));
}

exports.style = style;
exports.watch = watch;
exports.build = gulp.series(buildHtml, buildCss, buildJs, buildAssets);
