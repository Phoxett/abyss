
const gulp = require('gulp')
const nodemon = require('gulp-nodemon')

gulp.task('start', function (done) {
    nodemon({
      script: 'src/app.js'
    , ext: 'js html'
    , env: { 'NODE_ENV': 'development' }
    , done: done,
    watch: [
        'src', 'src/src',
        'src/src/hbs', 'src/src/hbs/parts'
    ]
    })
  })


gulp.task('default', gulp.series['start'])