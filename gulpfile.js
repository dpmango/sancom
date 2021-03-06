// DECLARE VARIABLES
var gulp          = require('gulp');
var async         = require('async');
var rename        = require('gulp-rename');
var sourcemaps    = require('gulp-sourcemaps');
var pug           = require('gulp-pug');
var postcss       = require('gulp-postcss');
var babel         = require('gulp-babel');
var autoprefixer  = require('autoprefixer');
var sugarss       = require('sugarss');
var precss        = require('precss');
var sorting       = require('postcss-sorting');
var cssnext       = require('postcss-cssnext');
var short         = require('postcss-short');
var svginline     = require('postcss-inline-svg');
var colorFunction = require("postcss-color-function");
var mqpacker      = require('css-mqpacker');
var pixrem        = require('pixrem');
var rgba_fallback = require('postcss-color-rgba-fallback');
var magicAnimations = require('postcss-animations');
var opacity       = require('postcss-opacity');
var pseudoel      = require('postcss-pseudoelements');
var vmin          = require('postcss-vmin');
var will_change   = require('postcss-will-change');
var flexbugs      = require('postcss-flexbugs-fixes');
var cssnano       = require('cssnano');
var useref        = require('gulp-useref');
var uglify        = require('gulp-uglify');
var gulpIf        = require('gulp-if');
var imagemin      = require('gulp-imagemin');
var cache         = require('gulp-cache');
var del           = require('del');
var runSequence   = require('run-sequence');
var browserSync   = require('browser-sync').create();
var notify        = require('gulp-notify');
var plumber       = require('gulp-plumber');

// Default task
gulp.task('default', function (callback) {
  runSequence(['postcss', 'pug', 'babel', 'browserSync'], 'watch',
    callback
  )
})

// Watch
gulp.task('watch', function(){
  gulp.watch('./src/pcss/**/*.+(sss|css)', ['postcss']);
  gulp.watch('./src/views/**/*.pug', ['pug-watch']);
  gulp.watch('./src/js/es2015/*.js', ['babel']);
  gulp.watch('./src/js/**/*.js', browserSync.reload);
})

// Build
gulp.task('build', function (callback) {
  runSequence(
    'clean:dist',
    'pug',
    'postcss',
    'babel',
    ['useref', 'images', 'fonts', 'favicon'],
    'cssnano',
    callback
  )
})

/////
// DEVELOPMENT TASKS
/////

var processors = [
    precss(),
    short(),
    colorFunction(),
    svginline(),
    magicAnimations(),
    autoprefixer({browsers: ['last 5 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4']}),
    sorting(),
    will_change(),
    pseudoel(),
    vmin(),
    flexbugs()
];

gulp.task('postcss', function() {
  return gulp.src('./src/pcss/*.sss')
      .pipe(plumber({
        errorHandler: errorHandler
      }))
      .pipe( sourcemaps.init() )
      .pipe( postcss(processors, { parser: sugarss }) )
      .pipe(rename({ extname: '.css' }))
      .pipe( sourcemaps.write('.') )
      .pipe( gulp.dest('./src/css') )
      .pipe(browserSync.reload({
        stream: true
      }));
});

gulp.task('pug', function buildHTML() {
  return gulp.src('./src/views/*.pug')
      .pipe(plumber({
        errorHandler: errorHandler
      }))
      .pipe(pug({
        pretty: true
      }))
      .pipe( gulp.dest('./src/') );
});

gulp.task('pug-watch', ['pug'], function (done) {
  browserSync.reload();
  done();
});

gulp.task('babel', function() {
  return gulp.src('./src/js/es2015/*.js')
      .pipe(babel({
          presets: ['es2015']
      }))
      .pipe(gulp.dest('./src/js'))
      .pipe(browserSync.reload({
        stream: true
      }));
});


/////
// OPTIMIZATION TASKS
/////

gulp.task('useref', function(){
  return gulp.src('./src/*.html')
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulp.dest('dist'));
});

gulp.task('cssnano', function () {
  return gulp.src('./dist/css/*.css')
    .pipe( postcss([cssnano({
      autoprefixer: false,
      reduceIdents: {
        keyframes: false
      },
      discardUnused: {
        keyframes: false
      }
    })]) )
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('dist/css'));;
});

gulp.task('images', function(){
  return gulp.src('./src/images/**/*.+(png|jpg|gif|svg)')
  .pipe(cache(imagemin({
      interlaced: true
    })))
  .pipe(gulp.dest('dist/images'))
});

gulp.task('fonts', function() {
  return gulp.src('./src/fonts/**/*')
  .pipe(gulp.dest('dist/fonts'))
})

gulp.task('favicon', function() {
  return gulp.src('./src/favicon/**/*')
  .pipe(gulp.dest('dist/favicon'))
})



gulp.task('clean:dist', function() {
  return del.sync(['dist/**/*', '!dist/images', '!dist/images/**/*']);
})

gulp.task('cache:clear', function (callback) {
  return cache.clearAll(callback)
})

// hot reload
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'src'
    },
  })
})



var errorHandler = function() {
  var args = Array.prototype.slice.call(arguments);
  notify.onError({
      title: 'Compile Error',
      message: '<%= error.message %>',
      sound: 'Submarine'
  }).apply(this, args);
  this.emit('end');
};
