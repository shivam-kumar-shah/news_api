import { Router } from "express";

import {
  searchController,
  summaryController,
  topStoriesController,
} from "../logic/newsController";

const router = Router();

// TODO: Add input validation

router.get("/top-stories", topStoriesController);

router.get("/summary", summaryController);

router.get("/search", searchController);

export default router;
