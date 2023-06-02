"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var dotenv_1 = require("dotenv");
var news_1 = __importDefault(require("./apis/news"));
var readme_json_1 = __importDefault(require("./readme.json"));
(0, dotenv_1.config)();
var app = (0, express_1.default)();
app.use(express_1.default.json());
app.get("/", function (req, res, next) {
    res.send(readme_json_1.default);
});
app.use("/news", news_1.default);
app.use(function (req, res, next) {
    res.status(404).json({
        message: "Page not found.",
    });
});
app.listen(3000, function () {
    console.log("Server listening on - http://localhost:3000");
});
