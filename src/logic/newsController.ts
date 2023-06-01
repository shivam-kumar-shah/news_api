import { RequestHandler } from "express";

import { CategoryEnum } from "../models/enums";
import scrapper from "../logic/msnScrapper";

export const topStoriesController: RequestHandler = async (req, res, next) => {
  try {
    const category: string =
      req.query.category?.toString() ?? CategoryEnum.world.toString();
    const params = new URLSearchParams();
    params.append("mkt", "en-US");
    params.append("category", category);
    const queryString = "?" + params.toString();

    const response = await fetch(process.env.API_URL + queryString, {
      headers: {
        "Ocp-Apim-Subscription-Key": process.env.API_KEY!,
      },
    });
    const data: any[] = (await response.json()).value;
    res.status(200).send(data ?? []);
  } catch (err) {
    console.log(err);
    res.status(503).send({
      message: "Something went wrong.",
    });
  }
};

export const summaryController: RequestHandler = async (req, res, next) => {
  try {
    const url = req.body.msn;
    const uri = new URL(url);
    if (!uri.hostname.includes("www.msn.")) {
      res.status(422).json({
        message: "Only msn links are currently summarizable.",
      });
      return;
    }
    const data = await scrapper(url);
    res.status(200).send(JSON.parse(data.toString()));
  } catch (err) {
    console.log(err);
    res.status(503).send({
      message: "Something went wrong.",
    });
  }
};

export const searchController: RequestHandler = async (req, res, next) => {
  try {
    const query: string = req.query.s?.toString() ?? "";
    const count: number = +(req.query.count ?? 20);
    const page: number = +(req.query.page ?? 1);
    const offset = page > 0 ? count * (page - 1) : 0;

    const params = new URLSearchParams();
    params.append("count", count.toString());
    params.append("offset", offset.toString());
    params.append("q", query);

    const response = await fetch(
      process.env.API_URL + `/search?${params.toString()}`,
      {
        headers: {
          "Ocp-Apim-Subscription-Key": process.env.API_KEY!,
        },
      }
    );
    const data: any[] = (await response.json()).value;
    res.status(200).send(data ?? []);
  } catch (err) {
    res.status(503).send({
      message: "Something went wrong.",
    });
  }
};
