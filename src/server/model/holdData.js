"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const People_1 = require("../entity/People");
class HoldData {
}
_a = HoldData;
HoldData.personData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield People_1.People.find();
    console.table(data);
    res.json(data);
});
HoldData.insertPerson = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const reqData = req.body;
    const insertPersonData = yield People_1.People.insert({
        name: reqData.name,
        semester: reqData.sem,
        faculty: reqData.faculty
    });
    if (insertPersonData.raw.affectedRows > 0) {
        res.status(200).json({ dataInserted: true }).end();
        return;
    }
    res.status(500).json({ dataInserted: false }).end();
});
HoldData.leftJoinData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
});
exports.default = HoldData;
