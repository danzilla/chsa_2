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
'use strict';
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
var pg_1 = require("pg");
var config_1 = require("../config");
var geo_api_service_1 = require("./geo-api-service");
var pgPoolKey = Symbol["for"]('chsa.pgpool');
var geoKey = Symbol["for"]('chsa.geo');
var gs = Object.getOwnPropertySymbols(global);
var main = function () { return __awaiter(void 0, void 0, void 0, function () {
    var opts, geo, params;
    return __generator(this, function (_a) {
        if (gs.indexOf(geoKey) <= -1) {
            opts = {
                baseURL: config_1["default"].get('geo:baseURL')
            };
            geo = new geo_api_service_1["default"](opts);
            global[geoKey] = geo;
        }
        if (gs.indexOf(pgPoolKey) <= -1) {
            params = {
                host: config_1["default"].get('db:host'),
                port: config_1["default"].get('db:port'),
                database: config_1["default"].get('db:database'),
                user: config_1["default"].get('db:user'),
                password: config_1["default"].get('db:password'),
                max: config_1["default"].get('db:maxConnections'),
                idleTimeoutMillis: config_1["default"].get('db:idleTimeout'),
                connectionTimeoutMillis: config_1["default"].get('db:connectionTimeout')
            };
            global[pgPoolKey] = new pg_1.Pool(params);
        }
        return [2 /*return*/];
    });
}); };
main();
var shared = {};
Object.defineProperty(shared, 'geo', {
    get: function () { return global[geoKey]; }
});
Object.defineProperty(shared, 'pgPool', {
    get: function () { return global[pgPoolKey]; }
});
Object.freeze(shared);
exports["default"] = shared;