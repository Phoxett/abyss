const gulp = require('gulp')
const nodemon = require('gulp-nodemon')

gulp.task('start', function(done)
{
    nodemon(
        {
            script: 'src/app.js',
            ext: 'js html',
            env:
            {
                'NODE_ENV': 'development'
            },
            done: done,
            watch: [
                'src', 'src/src',
                'src/src/hbs', 'src/src/hbs/parts'
            ]
        })
        .on('restart', function()
        {
            setTimeout(() =>
            {
                const date = new Date()
                console.log(`restarted   [${date.getHours().toString()}:${date.getMinutes().toString()}:${date.getMilliseconds().toString()}]`)
            }, 1000)
            console.log('restarting')
        })
})

gulp.task('default', gulp.series['start'], () =>
{
    gulp.watch([
        'src', 'src/src',
        'src/src/hbs', 'src/src/hbs/parts'
    ], (event) => nodemon.emit('restart'))
})
