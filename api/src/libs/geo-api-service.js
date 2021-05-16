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
var axios_1 = require("axios");
var constants_1 = require("../constants");
var utils_1 = require("./utils");
var GeoApiService = /** @class */ (function () {
    function GeoApiService(options) {
        this.axi = axios_1["default"].create({
            baseURL: options.baseURL
        });
    }
    GeoApiService.prototype.fetchChsaResponseSet = function (queriedPoint) {
        return __awaiter(this, void 0, void 0, function () {
            var longitude, latitude, longStr, latStr, params, response, contentType, payload, features, _a, CMNTY_HLTH_SERV_AREA_CODE, CMNTY_HLTH_SERV_AREA_NAME, err_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        longitude = queriedPoint.longitude, latitude = queriedPoint.latitude;
                        longStr = utils_1.convertNumToStrFormatForGeoApi(longitude);
                        latStr = utils_1.convertNumToStrFormatForGeoApi(latitude);
                        params = {
                            service: constants_1.GEO_API_CALL.SERVICE,
                            version: constants_1.GEO_API_CALL.VERSION,
                            request: constants_1.GEO_API_CALL.REQUEST,
                            typeName: constants_1.GEO_API_CALL.TYPE_NAME,
                            srsname: constants_1.GEO_API_CALL.SRS_NAME,
                            propertyName: constants_1.GEO_API_CALL.PROPERTY_NAME,
                            outputFormat: constants_1.GEO_API_CALL.OUTPUT_FORMAT
                        };
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.axi.get("ows?cql_filter=INTERSECTS(SHAPE,SRID=4326;POINT(" + longStr + latStr + "))", {
                                headers: {
                                    "content-type": "application/json"
                                },
                                params: params
                            })];
                    case 2:
                        response = _b.sent();
                        contentType = response.headers["content-type"];
                        if (!(contentType && contentType.includes("application/json"))) {
                            throw common_nodejs_utils_1.errorWithCode("unable to query chsa response set", 500);
                        }
                        payload = response.data;
                        common_nodejs_utils_1.logger.info("successfully received chsa payload (" + JSON.stringify(payload) + ")");
                        features = payload.features;
                        // when geo api receives syntactically valid point but is outside of BC
                        if (features.length === 0) {
                            throw common_nodejs_utils_1.errorWithCode("invalid longtitude and latitude for a BC location,        you can use google map to search for the correct and try again ", 422);
                        }
                        _a = features[0].properties, CMNTY_HLTH_SERV_AREA_CODE = _a.CMNTY_HLTH_SERV_AREA_CODE, CMNTY_HLTH_SERV_AREA_NAME = _a.CMNTY_HLTH_SERV_AREA_NAME;
                        return [2 /*return*/, { CMNTY_HLTH_SERV_AREA_CODE: CMNTY_HLTH_SERV_AREA_CODE, CMNTY_HLTH_SERV_AREA_NAME: CMNTY_HLTH_SERV_AREA_NAME }];
                    case 3:
                        err_1 = _b.sent();
                        return [2 /*return*/, common_nodejs_utils_1.errorWithCode(err_1.message, err_1.code)];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return GeoApiService;
}());
exports["default"] = GeoApiService;
