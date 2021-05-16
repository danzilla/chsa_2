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
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var common_nodejs_utils_1 = require("@bcgov/common-nodejs-utils");
var model_1 = require("./model");
var GeoApiUsageLogModel = /** @class */ (function (_super) {
    __extends(GeoApiUsageLogModel, _super);
    function GeoApiUsageLogModel(pool) {
        var _this = _super.call(this) || this;
        _this.table = "geo_api_usage_log";
        _this.requiredFields = ["queriedLongitude", "queriedLatitude"];
        _this.pool = pool;
        return _this;
    }
    GeoApiUsageLogModel.prototype.create = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var query, results, err_1, message;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = {
                            text: "\n        INSERT INTO " + this.table + "\n          (queried_longitude, queried_latitude, result_chsa_code, result_chsa_name)\n          VALUES ($1, $2, $3, $4) RETURNING *;",
                            values: [
                                data.queriedLongitude,
                                data.queriedLatitude,
                                data.resultChsaCode,
                                data.resultChsaName,
                            ]
                        };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.runQuery(query)];
                    case 2:
                        results = _a.sent();
                        return [2 /*return*/, results.pop()];
                    case 3:
                        err_1 = _a.sent();
                        message = "Unable to create GeoApiUsageLog";
                        common_nodejs_utils_1.logger.error(message + ", err = " + err_1.message);
                        throw err_1;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    GeoApiUsageLogModel.prototype["delete"] = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var query, results, err_2, message;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = {
                            text: "\n            UPDATE " + this.table + "\n              SET\n                archived = true\n              WHERE id = " + id + "\n              RETURNING *;\n          "
                        };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.runQuery(query)];
                    case 2:
                        results = _a.sent();
                        return [2 /*return*/, results.pop()];
                    case 3:
                        err_2 = _a.sent();
                        message = "Unable to archive GeoApiUsageLog";
                        common_nodejs_utils_1.logger.error(message + ", err = " + err_2.message);
                        throw err_2;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return GeoApiUsageLogModel;
}(model_1.Model));
exports["default"] = GeoApiUsageLogModel;
