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

import _version from './src/version';
import _QingStor from './src/qingstor/qingstor';
import _Config from './src/config';
import _Request from './src/request';
import _Signer from './src/sign';
import _Client from './src/client/all';

export const version = _version;
export const QingStor = _QingStor;
export const Config = _Config;
export const Request = _Request;
export const Signer = _Signer;
export const Client = _Client;

export default {
  version: _version,
  QingStor: _QingStor,
  Config: _Config,
  Request: _Request,
  Signer: _Signer,
  Client: _Client,
};
