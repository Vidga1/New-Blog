const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create();

// Пути к файлам
const paths = {
  html: {
    src: 'src/html/*.html',
    dest: 'dist/'
  },
  styles: {
    src: 'src/sass/*.scss',
    dest: 'dist/css'
  }
};

// Компиляция SASS в CSS
function styles() {
  return gulp.src(paths.styles.src)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(browserSync.stream());
}

// Копирование HTML файлов в dist
function html() {
  return gulp.src(paths.html.src)
    .pipe(gulp.dest(paths.html.dest))
    .pipe(browserSync.stream());
}

// Следим за файлами и обновляем браузер
function watch() {
  browserSync.init({
    server: {
       baseDir: './dist'
    }
  });
  gulp.watch(paths.styles.src, styles);
  gulp.watch(paths.html.src, html);
  gulp.watch(paths.html.dest + '*.html').on('change', browserSync.reload);
}

// Задачи по умолчанию
gulp.task('default', gulp.parallel(styles, html, watch));
gulp.task('build', gulp.parallel(styles, html));
