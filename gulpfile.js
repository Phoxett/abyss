'use strict'

const gulp = require('gulp')
const sass = require('gulp-sass')(require('sass'))
const del = require('del')
const nodemon = require('gulp-nodemon')
const path = require('path')

gulp.task('sass', () =>
{

    gulp.src(path.join(__dirname, '/src/src/sass/*.scss'))
        .pipe(sass()
            .on('error', sass.logError))
        .pipe(gulp.dest('src/src/css'))
})

gulp.task('del-css', () =>
{
    return del([
        'src/src/sass/*.css'
    ])
})

gulp.task('watch', () =>
{
    gulp.watch([
        'src',
        'src/src',
        'src/src/data',
        'src/src/sass',
        'src/src/css',
        'src/src/hbs',
        'src/src/hbs/parts'
    ], gulp.series(['del-css', 'sass']))

})


gulp.task('nodemon', function(done)
{
    nodemon(
        {
            script: 'src/app.js',
            ext: 'js html sass css json',
            env:
            {
                'NODE_ENV': 'development'
            },
            task: ['watch'],
            watch: ['src', 'src/src', 'src/src/sass', 'src/src/css', 'src/src/hbs', 'src/src/hbs/parts', './node_modules/uikit/dist/js', './node_modules/uikit/dist/css'],
            done: done,
            stdout: true
        })
        .on('start', ['watch'])

})

gulp.task('default', gulp.series(['nodemon', 'del-css', 'watch', ]))
