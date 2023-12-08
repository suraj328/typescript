"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = exports.AppEntity = void 0;
// app.ts
const express_1 = __importDefault(require("express"));
const controller_1 = __importDefault(require("./controller/controller"));
const typeorm_1 = require("typeorm");
const People_1 = require("./entity/People");
const app = (0, express_1.default)();
const port = 8000;
app.use(express_1.default.json());
app.use(controller_1.default);
class AppEntity extends typeorm_1.BaseEntity {
}
exports.AppEntity = AppEntity;
exports.AppDataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "society",
    entities: [People_1.People],
    "synchronize": true,
    "logging": true
});
exports.AppDataSource.initialize()
    .then(() => {
    console.log("Data Source has been initialized!");
    app.listen(port, () => {
        console.log(`Server is running at http://localhost:${port}`);
    });
})
    .catch((err) => {
    console.error("Error during Data Source initialization", err);
});
