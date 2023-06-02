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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchController = exports.summaryController = exports.topStoriesController = void 0;
var enums_1 = require("../models/enums");
var msnScrapper_1 = __importDefault(require("../logic/msnScrapper"));
var topStoriesController = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var category, params, queryString, response, data, err_1;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 3, , 4]);
                category = (_b = (_a = req.query.category) === null || _a === void 0 ? void 0 : _a.toString()) !== null && _b !== void 0 ? _b : enums_1.CategoryEnum.world.toString();
                params = new URLSearchParams();
                params.append("mkt", "en-US");
                params.append("category", category);
                queryString = "?" + params.toString();
                return [4 /*yield*/, fetch(process.env.API_URL + queryString, {
                        headers: {
                            "Ocp-Apim-Subscription-Key": process.env.API_KEY,
                        },
                    })];
            case 1:
                response = _c.sent();
                return [4 /*yield*/, response.json()];
            case 2:
                data = (_c.sent()).value;
                res.status(200).json(data !== null && data !== void 0 ? data : []);
                return [3 /*break*/, 4];
            case 3:
                err_1 = _c.sent();
                console.log(err_1);
                res.status(503).json({
                    message: "Something went wrong.",
                });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.topStoriesController = topStoriesController;
var summaryController = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var url, uri, data, err_2;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                url = (_a = req.body.msn) !== null && _a !== void 0 ? _a : "";
                if (url.trim().length == 0) {
                    res.status(422).json({
                        message: "msn body parameter is required. Please refer to / for more details.",
                    });
                    return [2 /*return*/];
                }
                uri = new URL(url);
                if (!uri.hostname.includes("www.msn.")) {
                    res.status(422).json({
                        message: "Only msn links are currently summarizable.",
                    });
                    return [2 /*return*/];
                }
                return [4 /*yield*/, (0, msnScrapper_1.default)(url)];
            case 1:
                data = _b.sent();
                res.status(200).send(JSON.parse(data.toString()));
                return [3 /*break*/, 3];
            case 2:
                err_2 = _b.sent();
                console.log(err_2);
                res.status(503).json({
                    message: "Something went wrong.",
                });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.summaryController = summaryController;
var searchController = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var query, count, page, offset, params, response, data, err_3;
    var _a, _b, _c, _d;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                _e.trys.push([0, 3, , 4]);
                query = (_b = (_a = req.query.s) === null || _a === void 0 ? void 0 : _a.toString()) !== null && _b !== void 0 ? _b : "";
                count = +((_c = req.query.count) !== null && _c !== void 0 ? _c : 20);
                page = +((_d = req.query.page) !== null && _d !== void 0 ? _d : 1);
                offset = page > 0 ? count * (page - 1) : 0;
                if (query.trim().length == 0) {
                    res.status(422).json({
                        message: "query paramter is required. Please refer to / for more details.",
                    });
                    return [2 /*return*/];
                }
                params = new URLSearchParams();
                params.append("count", count.toString());
                params.append("offset", offset.toString());
                params.append("q", query);
                return [4 /*yield*/, fetch(process.env.API_URL + "/search?".concat(params.toString()), {
                        headers: {
                            "Ocp-Apim-Subscription-Key": process.env.API_KEY,
                        },
                    })];
            case 1:
                response = _e.sent();
                return [4 /*yield*/, response.json()];
            case 2:
                data = (_e.sent()).value;
                res.status(200).json(data !== null && data !== void 0 ? data : []);
                return [3 /*break*/, 4];
            case 3:
                err_3 = _e.sent();
                res.status(503).json({
                    message: "Something went wrong.",
                });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.searchController = searchController;
