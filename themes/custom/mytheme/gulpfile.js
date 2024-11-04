import gulp from 'gulp';
import gulpSass from 'gulp-sass';
import sass from 'sass'; // Import the Sass compiler
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import babel from 'gulp-babel';
import uglify from 'gulp-uglify';
import concat from 'gulp-concat';
import sourcemaps from 'gulp-sourcemaps';

// Configure gulp-sass to use the sass compiler
const sassCompiler = gulpSass(sass);

const paths = {
  styles: {
    src: 'scss/**/*.scss',
    dest: 'dist/css'
  },
  scripts: {
    src: 'js/**/*.js',
    dest: 'dist/js'
  }
};

export function styles() {
  return gulp.src(paths.styles.src, { sourcemaps: true })
    .pipe(sassCompiler().on('error', sassCompiler.logError)) // Use the configured Sass compiler
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(gulp.dest(paths.styles.dest));
}

export function scripts() {
  return gulp.src(paths.scripts.src, { sourcemaps: true })
    .pipe(babel({
      presets: ['@babel/preset-env']
    }))
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(paths.scripts.dest));
}

export function watchFiles() {
  gulp.watch(paths.styles.src, styles);
  gulp.watch(paths.scripts.src, scripts);
}

export default gulp.series(
  gulp.parallel(styles, scripts),
  watchFiles
);
