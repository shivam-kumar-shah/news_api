"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
var cheerio = __importStar(require("cheerio"));
var inference_1 = require("@huggingface/inference");
var scrappedData_1 = __importDefault(require("../models/scrappedData"));
var scrapperException_1 = __importDefault(require("../models/scrapperException"));
function default_1(url) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var scrappedHTML, scrappedText, hf, response, $_1, _b, _c, summaryAPI, summaryText, err_1;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    scrappedHTML = [];
                    scrappedText = [];
                    _d.label = 1;
                case 1:
                    _d.trys.push([1, 5, , 6]);
                    hf = new inference_1.HfInference(process.env.SCRAPPER_KEY);
                    return [4 /*yield*/, fetch(url)];
                case 2:
                    response = _d.sent();
                    _c = (_b = cheerio).load;
                    return [4 /*yield*/, response.text()];
                case 3:
                    $_1 = _c.apply(_b, [_d.sent()]);
                    $_1("p").each(function (index, item) {
                        var text = $_1(item).text().trim();
                        var html = $_1(item).html();
                        if (index != 0 && text.length != 0 && html != null) {
                            scrappedText.push(text);
                            scrappedHTML.push(html.toString().trim());
                        }
                    });
                    return [4 /*yield*/, hf.summarization({
                            model: "facebook/bart-large-cnn",
                            inputs: scrappedText.join("\n"),
                            parameters: {
                                min_length: 100,
                            },
                        })];
                case 4:
                    summaryAPI = _d.sent();
                    summaryText = summaryAPI.summary_text;
                    return [2 /*return*/, new scrappedData_1.default(summaryText, scrappedHTML)];
                case 5:
                    err_1 = _d.sent();
                    throw new scrapperException_1.default((_a = err_1 === null || err_1 === void 0 ? void 0 : err_1.toString()) !== null && _a !== void 0 ? _a : "Something went wrong.", "Internal Server Error.");
                case 6: return [2 /*return*/];
            }
        });
    });
}
exports.default = default_1;
