'use strict'

const gulp = require('gulp')
const sass = require('gulp-sass')(require('sass'))
const del = require('del')
const nodemon = require('gulp-nodemon')
const livereload = require('gulp-livereload')
const path = require('path')

gulp.task('build-sass', () =>
{
    return gulp.src(path.join(__dirname, '/src/src/sass/*.scss'))
        .pipe(sass()
            .on('error', sass.logError))
        .pipe(gulp.dest('src/src/css'))
        .pipe(livereload())
})

gulp.task('del-css', () =>
{
    return del([
        'src/src/sass/*.css'
    ])
})

gulp.task('watch-sass', () =>
{
    livereload.listen()
    gulp.watch(['src', 'src/src', 'src/src/data', 'src/src/sass', 'src/src/css', 'src/src/hbs', 'src/src/hbs/parts'], gulp.series(['del-css', 'build-sass', 'start']))
})

gulp.task('start', function(done)
{
    nodemon(
    {
        script: 'src/app.js',
        ext: 'js html sass css json',
        env:
        {
            'NODE_ENV': 'development'
        },
        watch: ['src', 'src/src', 'src/src/sass', 'src/src/css', 'src/src/hbs', 'src/src/hbs/parts', './node_modules/uikit/dist/js', './node_modules/uikit/dist/css'],
        done: done,
        stdout: true
    }).on('change', () =>
    {
        del([
            'src/src/sass/*.css'
        ])
        return gulp.src(path.join('/src/src/sass/*.scss'))
        .pipe(sass()
            .on('error', sass.logError))
        .pipe(gulp.dest('src/src/css/'))
        .pipe(livereload())
    })
})

gulp.task('default', gulp.series(['del-css', 'watch-sass', 'start']))
