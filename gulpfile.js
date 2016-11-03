var gulp = require('gulp'),
    fs = require("fs"),
    path = require("path"),
    tap = require('gulp-tap');

var srcPath = 'src/*.html', templateFile = 'template.html', destFile = 'index.html';
var sources = {};


gulp.task('load-sources', function() {
    return gulp.src(srcPath)
    .pipe(tap(function(file, t) {
        sources[path.basename(file.path)] = file.contents.toString();
    }));
});

gulp.task('write-index', ['load-sources'], function() {
    var content = fs.readFileSync(templateFile, "utf8");

    Object.keys(sources).forEach(function(filename){
        content = content.replace(filename, sources[filename]);
    });

    fs.writeFile(destFile, content);
});

gulp.task('default', function() {
    gulp.watch([templateFile, srcPath], ['write-index']);
});
