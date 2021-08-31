'use strict'

const gulp = require('gulp')
const sass = require('gulp-sass')
const del = require('del')

gulp.task('build-sass', () =>
{
    return gulp.src('src/src/sass/*.scss')
        .pipe(sass()
            .on('error', sass.logError))
        .pipe(gulp.dest('src/src/css/'))
})

gulp.task('del-css', () =>
{
    return del([
        'src/src/sass/*.css'
    ])
})

gulp.task('watch', () =>
{
    gulp.watch('src/src/sass/*.scss', (done) =>
    {
        gulp.series(['del-css', 'build-sass'])(done)
    })
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
        done: done
    })
})

gulp.task('default', gulp.series([ 'del-css', 'watch-sass', 'start']))
