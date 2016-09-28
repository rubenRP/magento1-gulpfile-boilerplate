'use strict';

var gulp         = require('gulp');

// Gulp Plugins
var sass         = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var browserSync  = require('browser-sync');
var notify       = require('gulp-notify');
var cleanCSS = require('gulp-clean-css');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
var shell = require('gulp-shell');
var bless = require('gulp-bless');

// Magento Settings
var magento = {};

magento.name = 'project-name'; // Define the project name
magento.pkg = 'package'; // Define your package
magento.theme = 'theme'; // Define your theme
magento.domain = 'local.domain.com'; // Define your domain

//If you set the gulpfile in Magento root
//magento.skin = './skin/frontend/';
//magento.src = magento.skin + magento.pkg + '/' + magento.theme + '/scss/**/*.scss';
//magento.dest = magento.skin + magento.pkg + '/' + magento.theme + '/css/';

//If you set the gulpfile in skin template folder
magento.skin = './' + magento.name;
magento.src = 'scss/**/*.scss';
magento.dest = 'css/';
magento.js ='js/';

//Sync with browsersync
gulp.task('sync', function() {
    browserSync.init([
        magento.dest + '*.css'
    ], {
        host: magento.domain,
        proxy: magento.domain,
        ui: false,
        open: false
    });
});

//Compile SASS
gulp.task('sass', function() {
    return gulp.src(magento.src)
        .pipe(sass({includePaths: 'bower_components/compass-mixins/lib',
            outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(autoprefixer({ browsers: ['last 2 version', 'safari 5', 'ie >= 9'] }))
        .pipe(gulp.dest(magento.dest))
        .pipe(browserSync.reload({stream: true}))
        .pipe(notify({message: magento.name + ' compiled successfully', onLast: true}));
});

//Minify SASS
gulp.task('minify', function () {
    gulp.src(magento.dest + '*.css')
        .pipe(sourcemaps.init())
        .pipe(cleanCSS(
            {
                recursivelyOptimizeProperties: true
            }
        ))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(magento.dest))
        .pipe(notify({message: magento.name + ' minified successfully', onLast: true}));
    ;
});

//Bless the CSS files for browser lt IE10
gulp.task('bless', function() {
    gulp.src(magento.dest + 'styles.css')
        .pipe(bless())
        .pipe(gulp.dest(magento.dest + 'splitCSS'));
});

//Compile and sync with browserSync
gulp.task('watch', ['sync'], function() {
    gulp.watch(magento.src, ['sass']);
});

//Minify all the js
gulp.task('scripts', shell.task([
    // This is the command
    'r.js -o ' + magento.js + 'build.js'
]));

//Default task: Only compile and minify CSS
gulp.task('default', ['sass', 'minify']);

//Build task for production mode: Compile, minify and generate CSS and JS
gulp.task('build', [
    'sass',
    'bless'
    'minify',
    'scripts',
]);
