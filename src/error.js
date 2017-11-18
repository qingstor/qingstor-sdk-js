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

class ParameterRequiredError extends Error {
  constructor(parameter_name, parent_name) {
    let msg = `${parameter_name} is required in ${parent_name}.`;
    super(msg);
  }
}

class ParameterValueNotAllowedError extends Error {
  constructor(parameter_name, parameter_value, allowed_values) {
    let msg = `${parameter_name} value ${parameter_value} is not allowed, should be one of ${allowed_values.join(', ')}`;
    super(msg);
  }
}

export default {
  ParameterRequired: ParameterRequiredError,
  ParameterValueNotAllowed: ParameterValueNotAllowedError
}
