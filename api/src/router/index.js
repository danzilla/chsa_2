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
exports.router = void 0;
var cors = require("cors");
var config_1 = require("../config");
var chsa_1 = require("./routes/chsa");
var ehlo_1 = require("./routes/ehlo");
var corsOptions = {
    origin: config_1["default"].get("environment") === "development" ? "*" : config_1["default"].get("apiUrl"),
    credentials: true,
    optionsSuccessStatus: 200
};
exports.router = function (app) {
    app.use(cors(corsOptions));
    app.use("/api/v1/ehlo", ehlo_1["default"]); // probes
    app.use("/api/v1/chsa", chsa_1["default"]); // chsa resources
};
