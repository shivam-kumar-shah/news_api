"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var newsController_1 = require("../logic/newsController");
var router = (0, express_1.Router)();
// TODO: Add input validation
router.get("/top-stories", newsController_1.topStoriesController);
router.get("/summary", newsController_1.summaryController);
router.get("/search", newsController_1.searchController);
exports.default = router;
