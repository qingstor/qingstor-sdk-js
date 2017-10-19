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

import Image from '../src/client/image';

let should = require('chai').should();

describe('Image test', function() {
  it('info test', function() {
    let test = new Image();
    test.info();
    test.input.action.should.equal('info');
  });

  it('crop test', function() {
    let test = new Image();
    const data = {
      'width': '0'
    };
    test.crop(data);
    test.input.action.should.equal('crop:w_0,h_0,g_0');
  });

  it('rotate test', function() {
    let test = new Image();
    const data = {
      'angle': 90
    };
    test.rotate(data);
    test.input.action.should.equal('rotate:a_90');
  });

  it('resize test', function() {
    let test = new Image();
    const data = {
      'mode': '1'
    };
    test.resize(data);
    test.input.action.should.equal('resize:w_0,h_0,m_1');
  });

  it('waterMark test', function() {
    let test = new Image();
    const data = {
      'text': '5rC05Y2w5paH5a2X'
    };
    test.waterMark(data);
    test.input.action.should.equal('watermark:d_150,p_0.25,t_5rC05Y2w5paH5a2X,c_');
  });

  it('waterMarkImage test', function() {
    let test = new Image();
    const data = {
      'url': 'aHR0cHM6Ly9wZWszYS5xaW5nc3Rvci5jb20vaW1nLWRvYy1lZy9xaW5jbG91ZC5wbmc'
    };
    test.waterMarkImage(data);
    test.input.action.should.equal('watermark_image:l_0,t_0,p_0.25,u_aHR0cHM6Ly9w'
      + 'ZWszYS5xaW5nc3Rvci5jb20vaW1nLWRvYy1lZy9xaW5jbG91ZC5wbmc');
  });

  it('format test', function() {
    let test = new Image();
    const data = {
      'type': 'png'
    };
    test.format(data);
    test.input.action.should.equal('format:t_png');
  });

  it('pipe test', function() {
    let test = new Image();
    const rotateParam = {
      'angle': '90'
    };
    const cropParam = {
      'width': '300',
      'height': '400',
      'gravity': '0'
    };
    const resizeParam = {
      'width': '500',
      'height': '500',
      'mode': '1'
    };
    const formatParam = {
      'type': 'png'
    };
    const waterMarkParam = {
      'text': '5rC05Y2w5paH5a2X'
    };
    const waterMarkImageParam = {
      'url': 'aHR0cHM6Ly9wZWszYS5xaW5nc3Rvci5jb20vaW1nLWRvYy1lZy9xaW5jbG91ZC5wbmc'
    };
    test.rotate(rotateParam)
      .crop(cropParam)
      .resize(resizeParam)
      .format(formatParam)
      .waterMark(waterMarkParam)
      .waterMarkImage(waterMarkImageParam)
      .info();
    test.input.action.should.equal('rotate:a_90|crop:w_300,h_400,g_0|resize:w_500,h_500,m_1|format:t_png|watermark:d_150,p_0.25,t_5rC05Y2w5paH5a2X,c_|watermark_image:l_0,t_0,p_0.25,u_aHR0cHM6Ly9wZWszYS5xaW5nc3Rvci5jb20vaW1nLWRvYy1lZy9xaW5jbG91ZC5wbmc|info');
  });
});
