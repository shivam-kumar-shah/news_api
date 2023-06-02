"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BingParamaters = /** @class */ (function () {
    function BingParamaters(category, count, offset) {
        this.category = category;
        this.count = count !== null && count !== void 0 ? count : 10;
        this.offset = offset !== null && offset !== void 0 ? offset : 0;
    }
    return BingParamaters;
}());
exports.default = BingParamaters;
