import * as cheerio from "cheerio";
import { HfInference } from "@huggingface/inference";
import ScrappedData from "../models/scrappedData";
import ScrapperException from "../models/scrapperException";

export default async function (url: string): Promise<ScrappedData> {
  let scrappedHTML: String[] = [];
  let scrappedText: String[] = [];
  try {
    const hf = new HfInference(process.env.SCRAPPER_KEY);
    const response = await fetch(url);
    const $ = cheerio.load(await response.text());
    $("p").each((index, item) => {
      const text = $(item).text().trim();
      const html = $(item).html();
      if (index != 0 && text.length != 0 && html != null) {
        scrappedText.push(text);
        scrappedHTML.push(html!.toString().trim());
      }
    });
    const summaryAPI = await hf.summarization({
      model: "facebook/bart-large-cnn",
      inputs: scrappedText.join("\n"),
      parameters: {
        min_length: 100,
      },
    });
    const summaryText = summaryAPI.summary_text;
    return new ScrappedData(summaryText, scrappedHTML);
  } catch (err) {
    throw new ScrapperException(
      err?.toString() ?? "Something went wrong.",
      "Internal Server Error."
    );
  }
}
