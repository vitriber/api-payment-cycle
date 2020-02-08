const gulp = require('gulp')
const util = require('gulp-util')
const sequence = require('run-sequence')

require('./gulpTaks/app')
require('./gulpTaks/deps')
require('./gulpTaks/server')

gulp.task('default', () => {
    if(util.env.production){
        sequence('deps', 'app')
    }else{
        sequence('deps', 'app', 'server')
    }
})