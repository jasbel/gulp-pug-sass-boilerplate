const { src, dest, watch, series } = require('gulp')

const pug = require('gulp-pug')
const sass = require('gulp-sass')

const browserSync = require('browser-sync').create()


// Compile pug files into HTML
function html() {
  // return src('src/pug/*.pug')
  //   .pipe(pug())
  //   .pipe(dest('dist'))
  return src('src/html/**/*.html')
    .pipe(dest('dist'))
}

// Compile scss files into CSS
function styles() {
  return src('src/scss/styles.scss')
    .pipe(sass({
      includePaths: ['src/scss'],
      errLogToConsole: true,
      // outputStyle: 'compressed',
      onError: browserSync.notify
    }))
    .pipe(dest('dist/css'))
    .pipe(browserSync.stream())
}

// Copy assets
function assets() {
  return src('src/assets/**/*')
    .pipe(dest('dist/'))
}

// Serve and watch scss/pug files for changes
function watchAndServe() {
  browserSync.init({
    server: 'dist',
  })

  watch('src/scss/**/*.scss', styles)
  // watch('src/pug/*.pug', html)
  watch('src/html/**/*.html', html)
  watch('src/assets/**/*', assets)
  watch('dist/*.html').on('change', browserSync.reload)
}


exports.html = html
exports.styles = styles
exports.watch = watchAndServe
exports.default = series(html, styles, assets, watchAndServe)
