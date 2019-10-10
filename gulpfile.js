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
require('./src/version');

const gulp = require('gulp');
const webpack = require('webpack');
const webpack_stream = require('webpack-stream');
const merge = require('merge-stream');
const buffer = require('vinyl-buffer');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
const tar = require('gulp-tar');
const gzip = require('gulp-gzip');
const uglifyes = require('uglify-es');
const composer = require('gulp-uglify/composer');
const minify = composer(uglifyes, console);
const zip = require('gulp-zip');
const pump = require('pump');
const del = require('del');

const targets = ['node', 'browser'];
const target_name = {
  'node': 'nodejs',
  'browser': 'javascript',
};

gulp.task('clean', function() {
  del(['dist/*']);
});

gulp.task('bundle', ['clean'], function() {
  return pump([
    webpack_stream({
      config: require('./webpack.config.js')
    }, webpack),
    gulp.dest('./dist')
  ]);
});

const _min = (d) => {
  return pump([
    gulp.src(`dist/${d}/qingstor-sdk.js`),
    buffer(),
    minify({
      ecma: 6,
    }),
    rename({
      extname: '.min.js'
    }),
    gulp.dest(`dist/${d}`)
  ]);
};

gulp.task('bundle-min', ['bundle'], function() {
  return merge(targets.map(_min));
});

const _map = (d) => {
  return pump([
    gulp.src(`dist/${d}/qingstor-sdk.js`),
    buffer(),
    sourcemaps.init({
      loadMaps: true
    }),
    sourcemaps.write('./'),
    gulp.dest(`dist/${d}`)
  ]);
};

gulp.task('bundle-map', ['bundle'], function() {
  return merge(targets.map(_map));
});

const _zip = (d) => {
  return pump([
    gulp.src([`dist/${d}/*.js`, `dist/${d}/*.map`]),
    zip(`qingstor-sdk-${target_name[d]}-${global.version}.zip`),
    gulp.dest(`dist/${d}`)
  ]);
};

gulp.task('zip', ['bundle-min', 'bundle-map'], () => {
  return merge(targets.map(_zip));
});

const _tar = (d) => {
  return pump([
    gulp.src([`dist/${d}/*.js`, `dist/${d}/*.map`]),
    tar(`qingstor-sdk-${target_name[d]}-${global.version}.tar`),
    gzip(),
    gulp.dest(`dist/${d}`)
  ]);
};

gulp.task('tar', ['bundle-min', 'bundle-map'], () => {
  return merge(targets.map(_tar));
});
