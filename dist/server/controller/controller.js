"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const holdData_1 = __importDefault(require("../model/holdData"));
const router = express_1.default.Router();
// default gateway
router.get('/', (req, res) => {
    res.send("Server is working");
});
router.get('/person', holdData_1.default.personData);
exports.default = router;
