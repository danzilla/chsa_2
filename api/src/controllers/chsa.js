//
// Licensed under the Apache License, Version 2.0 (the 'License');
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an 'AS IS' BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.queryChsaResponseSet = void 0;
var common_nodejs_utils_1 = require("@bcgov/common-nodejs-utils");
var geo_api_usage_log_1 = require("../libs/geo-api-usage-log");
var shared_1 = require("../libs/shared");
var utils_1 = require("../libs/utils");
exports.queryChsaResponseSet = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, longitude, latitude, body, rv, queriedPoint, rv1, err_1, message;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, longitude = _a.longitude, latitude = _a.latitude, body = req.body;
                rv = validate(body);
                if (rv) {
                    throw rv;
                }
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                queriedPoint = { longitude: longitude, latitude: latitude };
                return [4 /*yield*/, shared_1["default"].geo.fetchChsaResponseSet(queriedPoint)];
            case 2:
                rv1 = _b.sent();
                if (rv1 instanceof Error) {
                    geo_api_usage_log_1.writeGeoApiUsageLog(queriedPoint, {}).then(utils_1.writeToDbSuccessCallback);
                    throw rv1;
                }
                else {
                    geo_api_usage_log_1.writeGeoApiUsageLog(queriedPoint, rv1).then(utils_1.writeToDbSuccessCallback);
                    res.status(200).json(rv1);
                }
                return [3 /*break*/, 4];
            case 3:
                err_1 = _b.sent();
                message = "unable to query chsa response set";
                common_nodejs_utils_1.logger.error(message + ", err = " + err_1.message);
                res.status(err_1.code).json(err_1.message);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
var validate = function (body) {
    var longitude = body.longitude, latitude = body.latitude;
    if (utils_1.isEmptyValue(longitude) || utils_1.isEmptyValue(latitude)) {
        var message = "missing required fields in body, longitude / latitude input";
        return common_nodejs_utils_1.errorWithCode(message, 400);
    }
    if (!(typeof longitude === "number" && typeof latitude === "number")) {
        var message = "invalid longitude / latitude input, make sure they are (signed) numeric value";
        return common_nodejs_utils_1.errorWithCode(message, 400);
    }
    if (!(utils_1.isValidLongitude(longitude) && utils_1.isValidLatitude(latitude))) {
        var message = "invalid longitude / latitude input,    make sure the absolute value of longitude is no bigger than 180,    and the absolute value of latitude is no bigger than 90";
        return common_nodejs_utils_1.errorWithCode(message, 400);
    }
    return;
};
