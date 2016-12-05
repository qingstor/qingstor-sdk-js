// +-------------------------------------------------------------------------
// | Copyright (C) 2016 Yunify, Inc.
// +-------------------------------------------------------------------------
// | Licensed under the Apache License, Version 2.0 (the "License");
// | you may not use this work except in compliance with the License.
// | You may obtain a copy of the License in the LICENSE file, or at:
// |
// | http://www.apache.org/licenses/LICENSE-2.0
// |
// | Unless required by applicable law or agreed to in writing, software
// | distributed under the License is distributed on an "AS IS" BASIS,
// | WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// | See the License for the specific language governing permissions and
// | limitations under the License.
// +-------------------------------------------------------------------------

"use strict";

var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var gutil = require('gulp-util');

gulp.task('default', function () {
    console.log('test');
});

gulp.task('bundle', function () {
    var b = browserify();
    var options = {
        preserveComments: 'license'
    };
    b.require('./index.js', {expose: 'qingstor-sdk'});
    return b.bundle()
        .pipe(source('qingstor-sdk.js'))
        .pipe(buffer())
        .pipe(gulp.dest('./dist'))
        .pipe(uglify())
        .on('error', gutil.log)
        .pipe(rename({extname: '.min.js'}))
        .pipe(gulp.dest('./dist'));
});

gulp.task('bundle-map', function () {
    var b = browserify();
    b.require('./index.js', {expose: 'qingstor-sdk'});
    return b.bundle()
        .pipe(source('qingstor-sdk.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./dist'));
});
