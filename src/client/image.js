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

class Image {
  constructor(object_key, bucket) {
    this.object_key = object_key;
    this.bucket = bucket;
    this.input = null;
  }

  info() {
    let prefix = this.getPrefix();
    this.input = {
      'action': `${prefix}info`
    };
    return this;
  }

  crop(data) {
    const {width=0, height=0, gravity=0} = data
    let prefix = this.getPrefix();
    this.input = {
      'action': `${prefix}crop:w_${width},h_${height},g_${gravity}`
    };
    return this;
  }

  rotate(data) {
    let prefix = this.getPrefix();
    this.input = {
      'action': `${prefix}rotate:a_${data.angle}`
    };
    return this;
  }

  resize(data) {
    const {width=0, height=0, mode=0} = data;
    let prefix = this.getPrefix();
    this.input = {
      'action': `${prefix}resize:w_${width},h_${height},m_${mode}`
    };
    return this;
  }

  waterMark(data) {
    const {dpi=150, opacity=0.25, color=''} = data;
    let prefix = this.getPrefix();
    this.input = {
      'action': `${prefix}watermark:d_${dpi},p_${opacity},t_${data.text},c_${color}`
    };
    return this;
  }

  waterMarkImage(data) {
    const {left=0, top=0, opacity=0.25} = data;
    let prefix = this.getPrefix();
    this.input = {
      'action': `${prefix}watermark_image:l_${left},t_${top},p_${opacity},u_${data.url}`
    };
    return this;
  }

  format(data) {
    let prefix = this.getPrefix();
    this.input = {
      'action': `${prefix}format:t_${data.type}`
    };
    return this;
  }

  getPrefix() {
    if (this.input == null) {
      return ""
    }
    return `${this.input.action}|`
  }

  imageProcess(callback) {
    this.bucket.imageProcess(this.object_key, this.input, callback);
  }
}

export default Image;
