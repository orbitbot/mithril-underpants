var gulp        = require('gulp-help')(require('gulp'), { hideDepsMessage: true });
var $           = require('gulp-load-plugins')();
var KarmaServer = require('karma').Server;
var _           = require('lodash');
var browserSync = require('browser-sync').create();
var at          = require('gulp-asset-transform');


var paths = {
  app         : 'src/app/app.js',
  less        : ['src/assets/less/*.less', 'src/app/**/*.less'],
  images      : 'src/assets/images/**',
  index       : 'src/index.html',
  js          : 'src/app/**/*.js',
};

var config = {
  eslint : 'config/eslint.conf',
  karma  : require('./config/karma.conf'),
};


// Helpers

function dest(suffix) {
  return gulp.dest(release ? 'dist/' + suffix : 'build/' + suffix);
}

var release;
gulp.task('setRelease', false, function(done) { release = true; done(); });


// Copy and transform when building sources

gulp.task('copy-images', false, function() {
  return gulp.src(paths.images)
    .pipe($.plumber())
    .pipe($.size({ title: 'images', showFiles: true }))
    .pipe(dest('images'));
});

// other static assets ...

gulp.task('assets', false, ['copy-images']);

gulp.task('at-build', false, function() {
  return gulp.src(paths.index)
    .pipe($.plumber())
    .pipe(at({
      less: {
        stream: function(filestream, outputfilename) {
          return filestream
            .pipe($.less())
            .pipe($.concat(outputfilename))
            .pipe($.if(release, $.minifyCss()))
            .pipe($.size({ title: 'less', showFiles: true }));
        }
      },
      css: {
        stream: function(filestream, outputfilename) {
          return filestream
            .pipe($.concat(outputfilename))
            .pipe($.if(release, $.minifyCss()))
            .pipe($.size({ title: 'css', showFiles: true }));
          }
      },
      js: {
        stream: function(filestream, outputfilename) {
          return filestream
            .pipe($.concat(outputfilename))
            .pipe($.msx({ harmony: true }))
            .pipe($.if(release, $.uglify({ mangle: false })))
            .pipe($.size({ title: 'js', showFiles: true }));
        }
      }
    }))
    .pipe(dest(''))
    .pipe(browserSync.reload({ stream: true }));
});


// Linters

gulp.task('eslint', 'Run eslint on javascript files', function() {
  gulp.src(paths.js)
    .pipe($.eslint(config.eslint))
    .pipe($.eslint.format());
});

gulp.task('less-lint', 'Run lint checks on LESS files', function() {
  gulp.src(paths.less)
    .pipe($.plumber())
    .pipe($.recess())
    .pipe($.recess.reporter());
});


// Tests

gulp.task('karma', 'Run unit tests', function() {
  new KarmaServer(_.assign({}, config.karma, { singleRun: true })).start();
});

gulp.task('karma-ci', false, function() {
  new KarmaServer(_.assign({}, config.karma, { singleRun : false, autoWatch : true })).start();
});


// Automatic reload

gulp.task('watch', false, function() {
  gulp.watch([paths.index, paths.less, paths.js], ['build']);
  gulp.watch([paths.images], ['assets']);
  gulp.watch([paths.js], ['eslint']);
});

gulp.task('startServer', false, function(done) {
  browserSync.init({
    server: {
      baseDir : release ? 'dist/' : 'build/'
    },
    logConnections: true,
    open: false
  }, done);
});


gulp.task('serve',     'Serve build/ folder with Browser-sync', ['startServer', 'watch']);
gulp.task('serveDist', 'Serve dist/ folder with Browser-sync',  ['setRelease', 'serve']);

gulp.task('build',     'Compile the current sources into the build/ folder', ['at-build']);
gulp.task('release',   'Compile a new release from current sources',         ['setRelease', 'build']);

gulp.task('develop',   'Build and serve build/ folder, running tests and updating whenever a file is changed', ['build', 'startServer', 'watch', 'karma-ci']);