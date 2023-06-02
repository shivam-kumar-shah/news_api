"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ScrappedData = /** @class */ (function () {
    function ScrappedData(summaryText, rawHtmlList) {
        this.rawHtmlList = rawHtmlList;
        this.summaryText = summaryText;
    }
    ScrappedData.prototype.toString = function () {
        return JSON.stringify({
            summary_text: this.summaryText,
            raw_html: this.rawHtmlList,
        });
    };
    return ScrappedData;
}());
exports.default = ScrappedData;
