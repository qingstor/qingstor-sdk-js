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

export function unpack(res) {
  // unpack Response Headers
  for (let i in res.headers) {
    if (res.headers.hasOwnProperty(i)) {
      res[i] = res.headers[i];
    }
  }
  // unpack Response Body
  let body = res.body;
  if (res.headers['content-type'] === 'application/json') {
    if (body !== '') {
      let parsed = JSON.parse(body);
      for (let i in parsed) {
        if (parsed.hasOwnProperty(i)) {
          res[i] = parsed[i];
        }
      }
    }
  }
  return res;
}
