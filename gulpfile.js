// Load plugins
var gulp = require('gulp'),
    plugins = require('gulp-load-plugins')({ camelize: true }),
    lr = require('gulp-livereload'),
    plumber = require('gulp-plumber');

// Styles
gulp.task('styles', function() {
    return gulp.src('assets/styles/source/*.scss')
        .pipe(plumber())
        .pipe(plugins.sass({ outputStyle: 'expanded' }))
        .pipe(plugins.autoprefixer('last 2 versions', 'ie 9', 'ios 6', 'android 4'))
        .pipe(gulp.dest('assets/styles/build'))
        .pipe(plugins.cleanCss({ keepSpecialComments: 1 }))
        .pipe(lr())
        .pipe(gulp.dest('./'))
        .pipe(plugins.notify({ message: 'Styles task complete' }));
});

// Vendor Plugin Scripts
gulp.task('plugins', function() {
    return gulp.src(['assets/js/source/plugins.js', 'assets/js/vendor/*.js'])
        .pipe(plumber())
        .pipe(plugins.concat('plugins.js'))
        .pipe(gulp.dest('assets/js/build'))
        .pipe(plugins.rename({ suffix: '.min' }))
        .pipe(plugins.uglify())
        .pipe(lr())
        .pipe(gulp.dest('assets/js'))
        .pipe(plugins.notify({ message: 'Vendor Scripts task complete' }));
});

// Site Scripts
gulp.task('scripts', function() {
    return gulp.src(['assets/js/source/*.js', '!assets/js/source/plugins.js'])
        .pipe(plumber())
        .pipe(plugins.jshint('.jshintrc'))
        .pipe(plugins.jshint.reporter('default'))
        .pipe(plugins.concat('main.js'))
        .pipe(gulp.dest('assets/js/build'))
        .pipe(plugins.rename({ suffix: '.min' }))
        .pipe(plugins.uglify())
        .pipe(lr())
        .pipe(gulp.dest('assets/js'))
        .pipe(plugins.notify({ message: 'Site Scripts task complete' }));
});

// Images
gulp.task('images', function() {
    return gulp.src('assets/images/**/*')
        .pipe(plugins.cache(plugins.imagemin({ optimizationLevel: 7, progressive: true, interlaced: true })))
        .pipe(lr())
        .pipe(gulp.dest('assets/images'))
        .pipe(plugins.notify({ message: 'Images task complete' }));
});

// Watch
gulp.task('watch', function() {

    // Listen on port 35729
    lr.listen(35729, function (err) {
        if (err) {
            return console.log(err)
        };

        // Watch .scss files
        gulp.watch('assets/styles/source/**/*.scss', ['styles']);

        // Watch .js files
        gulp.watch('assets/js/**/*.js', ['plugins', 'scripts']);

        // Watch image files
        gulp.watch('assets/images/**/*', ['images']);

    });

});

// Default task
gulp.task('default', ['styles', 'plugins', 'scripts', 'images', 'watch']);
