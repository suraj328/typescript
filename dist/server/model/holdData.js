"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HoldData {
}
HoldData.personData = (req, res) => {
    const personDetails = {
        name: "suraj sah",
        faculty: "bca",
        semester: 7,
        program: ["js", "java", "php"]
    };
    res.json(personDetails);
};
exports.default = HoldData;
