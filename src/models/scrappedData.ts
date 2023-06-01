export default class ScrappedData {
  summaryText: String;
  rawHtmlList: String[];

  constructor(summaryText: String, rawHtmlList: String[]) {
    this.rawHtmlList = rawHtmlList;
    this.summaryText = summaryText;
  }

  toString(): string {
    return JSON.stringify({
      summary_text: this.summaryText,
      raw_html: this.rawHtmlList,
    });
  }
}
