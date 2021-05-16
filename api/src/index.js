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
var bodyParser = require("body-parser");
var flash = require("connect-flash");
var cookieParser = require("cookie-parser");
var express = require("express");
var fs = require("fs");
var path = require("path");
var router_1 = require("./router");
var app = express();
var options = {
    inflate: true,
    limit: "204800kb",
    type: "image/*"
};
var docpath = path.join(__dirname, "../", "public/doc/api");
var pubpath = path.join(__dirname, "../", "public");
fs.access(docpath, fs.constants.R_OK, function (err) {
    if (err) {
        common_nodejs_utils_1.logger.warn("API documentation does not exist");
        return;
    }
    app.use("/doc", express.static(docpath));
});
fs.access(pubpath, fs.constants.R_OK, function (err) {
    if (err) {
        common_nodejs_utils_1.logger.warn("static assets location does not exist");
        return;
    }
    app.use("/", express.static(pubpath));
});
app.use(cookieParser());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(bodyParser.raw(options));
app.use(flash());
// server api routes
router_1.router(app);
// last rescue for error handling
// this needs to be last in or it will not get called
// eslint-disable-next-line no-unused-vars
app.use(function (err, req, res, next) {
    common_nodejs_utils_1.logger.error(err.message);
    var code = err.code ? err.code : 500;
    var message = err.message ? err.message : "internal server error";
    res.status(code).json({ error: message, success: false });
});
exports["default"] = app;
