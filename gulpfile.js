"use strict";
const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const browserSync = require("browser-sync").create();

// compile SCSS into CSS
function style() {
  // 1. where is my SCSS file
  return (
    // gulp
    //   .src("./#src/scss/**/*.scss")
    //   // 2. pass that file through SASS compiler
    //   .pipe(sass().on('error', sass.logError))
    //   // 3. where do I save compiled CSS
    //   .pipe(gulp.dest("./#src/css"))
    //   // 4. stream changes to all browser
    //   .pipe(browserSync.stream())
    gulp.src("./#src/scss/**/*.scss")
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest("./#src/css"))
        .pipe(browserSync.stream())
  );
}
function watch() {
  browserSync.init({
    server: {
      baseDir: "./#src/",
    },
  });
  gulp.watch("./#src/scss/**/*.scss", style);
  gulp.watch("./#src/*.html").on("change", browserSync.reload);
  gulp.watch("./#src/js/**/*.js").on("change", browserSync.reload);
}

exports.style = style;
exports.watch = watch;
