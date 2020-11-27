// requires
var gulp        = require('gulp');
var browserSync = require('browser-sync').create();

var styles = require('./gulp/tasks/styles.js');
module.exports.styles = gulp.series(styles)

var pug2html = require('./gulp/tasks/pug2html.js');
module.exports.pug = gulp.series(pug2html)


var scripts = require('./gulp/tasks/scripts.js');
module.exports.scripts = gulp.series(scripts)








// Static server
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "build/"
        }
    });
});





// exports.default = sass;
// exports.default = series(sass, browserSync);