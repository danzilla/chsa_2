//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
"use strict";
exports.__esModule = true;
var common_nodejs_utils_1 = require("@bcgov/common-nodejs-utils");
var config_1 = require("./config");
var index_1 = require("./index");
var env = config_1["default"].get("environment");
var port = config_1["default"].get("port");
index_1["default"]
    .listen(port, "0.0.0.0", function () {
    if (env !== "production") {
        return common_nodejs_utils_1.started(port);
    }
    return common_nodejs_utils_1.logger.info("production server running on port: " + port);
})
    .on("error", function (err) {
    if (err) {
        return common_nodejs_utils_1.logger.error("there was a problem starting the server, " + err.message);
    }
});
module.exports = index_1["default"];
