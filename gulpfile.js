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

const gulp = require('gulp');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const sourcemaps = require('gulp-sourcemaps');
const gutil = require('gulp-util');
const tar = require('gulp-tar');
const gzip = require('gulp-gzip');
const zip = require('gulp-zip');
require('./lib/version');
const del = require('del');

gulp.task('default', function () {
  console.log('test');
});

gulp.task('clean', function () {
  del(['dist/*']);
});

gulp.task('bundle', ['clean'], function () {
  let b = browserify();
  let options = {
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

gulp.task('bundle-map', ['clean'], function () {
  let b = browserify();
  b.require('./index.js', {expose: 'qingstor-sdk'});
  return b.bundle()
    .pipe(source('qingstor-sdk.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./dist'));
});

gulp.task('zip', ['bundle', 'bundle-map'], () =>
  gulp.src(['dist/*.js', 'dist/*.map'])
    .pipe(zip(`qingstor-sdk-javascript-${global.version}.zip`))
    .pipe(gulp.dest('dist'))
);

gulp.task('tar', ['bundle', 'bundle-map'], () =>
  gulp.src(['dist/*.js', 'dist/*.map'])
    .pipe(tar(`qingstor-sdk-javascript-${global.version}.tar`))
    .pipe(gzip())
    .pipe(gulp.dest('dist'))
);
