const gulp = require('gulp');
const uglify = require('gulp-uglify-es').default;
const less = require('gulp-less-sourcemap');
const plumber = require('gulp-plumber');
const browserSync = require('browser-sync');
const reload = browserSync.reload;
const path = require('path');
const ejs = require("gulp-ejs");

gulp.task('scripts', function(){
    gulp.src('js/*.js')
        .pipe(plumber())
        .pipe(uglify())
        .pipe(gulp.dest("dist/js"));
});

gulp.task('less', function () {
    gulp.src('less/**/*.less')
        .pipe(plumber())
        .pipe(less({
            paths: [ path.join('node_modules'), path.join('node_modules/patternfly/node_modules') ],
            sourceMap: {
                //sourceMapRootpath: '../less' // This one for KIE files (Optional absolute or relative path to your LESS files)
                sourceMapRootpath: '/' // This one for PF files (Optional absolute or relative path to your LESS files)
            }

        }))
        .pipe(gulp.dest('dist/css'))
        .pipe(reload({stream:true}));
});

gulp.task('ejs', function(){
    gulp.src('views/**/*.ejs')
        .pipe(plumber())
        .pipe(ejs({ msg: 'Hello Gulp!'}, {}, { ext: '.html' }))
        .pipe(gulp.dest('dist/views/'));
});

gulp.task('modules', function() {
    let sources = [
        './node_modules/patternfly/dist/css/patternfly.min.css'
    ];
    gulp.src( sources ).pipe(gulp.dest('./dist/modules/'));
});

gulp.task('copy-modules', ['modules']);

// reload server
gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: "./dist/views/pages"
        }
    });
});

// Reload all Browsers
gulp.task('bs-reload', function () {
    browserSync.reload();
});

// watch for changes on files
gulp.task('watch', function(){
    gulp.watch('views/**/*.ejs', ['ejs']);
    gulp.watch('js/*.js', ['scripts']);
    gulp.watch('less/*.less', ['less']);
    gulp.watch("dist/views/**/*.html", ['bs-reload']);
});

// deploys
gulp.task('default',  ['scripts', 'less', 'ejs', 'modules', 'browser-sync','watch']);
gulp.task('build',  ['scripts', 'less']);
