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
/*    .pipe(function(){
        fs.writeFile(destFile, templateContent);
    });*/

/* return gulp.src(src)
    .pipe(fs.readFile("path/to/file.something", "utf-8", function(err, _data) {
      //do something with your data
    }))
   .pipe(gulp.dest('destination/path'));
  });
*/

/*  return gulp.src(src)
    .pipe(concat('index.html'))
    .pipe(gulp.dest('./'));*/

gulp.task('default', function() {
    gulp.watch(srcPath, ['write-index']);
});
