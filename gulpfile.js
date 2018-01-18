const gulp = require("gulp");
const pug = require("gulp-pug2");
const gutil = require("gulp-util");
const plumber = require("gulp-plumber");
const notify = require("gulp-notify");
const browserSync = require("browser-sync").create();
var sass = require("gulp-sass");
const autoprefixer = require("gulp-autoprefixer");
const sourcemaps = require("gulp-sourcemaps");

// Gulp Taks -----------------------------------------------------
// Pug Task
gulp.task("pug", () => {
  return gulp
    .src("src/pug/**/*.pug")
    .pipe(plumber({ errorHandler: onError }))
    .on("error", onError)
    .pipe(pug())
    .pipe(gulp.dest("."));
});

// Sass Task: Compile sass files to css and auto-inject into browsers
gulp.task("sass", () => {
  return gulp
    .src("src/sass/*.scss")
    .pipe(sourcemaps.init())
    .pipe(plumber({ errorHandler: onError }))
    .on("error", onError)
    .pipe(
      sass({
        outputStyle: "compressed",
        includePaths: ["node_modules/foundation-sites/scss"],
      }),
    )
    .pipe(autoprefixer())
    .pipe(sourcemaps.write("./sass-maps"))
    .pipe(gulp.dest("assets/css"))
    .pipe(browserSync.stream());
});

// Copy fonts
gulp.task("fonts", () => {
  return gulp.src("src/fonts/**/*.*").pipe(gulp.dest("assets/fonts"));
});

// Copy Images
gulp.task("images", () => {
  return gulp.src("src/img/**/*.*").pipe(gulp.dest("assets/img"));
});

// Copy JS
gulp.task("js", () => {
  return gulp.src("src/js/**/*.*").pipe(gulp.dest("assets/js"));
});

// Default Task
gulp.task("default", ["pug", "sass", "fonts", "images", "js"], function() {
  // Initialize Browsersync
  browserSync.init({
    server: {
      baseDir: "./",
    },
  });
  // Watch pugfile and transpile
  gulp.watch("src/pug/**/*.pug", ["pug"]);

  // Watch sass files
  gulp.watch("src/sass/**/*.scss", ["sass"]);

  // Watch font files
  gulp.watch("src/fonts/*.*", ["fonts"]);

  // Watch image files
  gulp.watch("src/img/*.*", ["images"]);

  // Watch js files
  gulp.watch("src/js/*.js", ["js"]);

  // Watch html files and reload
  gulp.watch("./**/*.html").on("change", browserSync.reload);

  // Watch JS files and reload
  gulp.watch("./assets/js/*.js").on("change", browserSync.reload);
});

// Utility Functions -----------------------------------------------------
// Task error handler
let onError = function(error, message) {
  notify({
    title: "Error in Build",
    message: error.message,
  }).write(error);

  gutil.log(gutil.colors.bgRed(error.message));
  this.emit("end");
};
