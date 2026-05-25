"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const http_1 = require("http");
const app_1 = __importDefault(require("./app"));
const mongoose_1 = __importDefault(require("mongoose"));
mongoose_1.default.set('debug', true);
mongoose_1.default.connect('mongodb://localhost:27017/its-simulazione-esame')
    .then(_ => {
    (0, http_1.createServer)(app_1.default).listen(3000, () => {
        console.log('Server listening on port 3000');
    });
})
    .catch(err => {
    console.error(err);
});
