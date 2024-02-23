npm init -y
npm i express
npm i --save-dev typescript @types/express @types/node

<!-- in order to use transcipt we need to transfile code to transfile ocee we need configuration file -->

npx tsc --init
uncomment outDir and rootDir by mentioning path

<!-- to build a file run this command -->

npx tsc

<!-- add to script to run-->

"start":"npx tsc && node build/index.js"

<!-- for nodemon -->

npm install --save-dev nodemon @types/nodemon @types/node
npm install --save-dev ts-node

<!-- add this ad nodemon.json -->

{
"watch": [
"src"
],
"ext": ".ts,.js",
"exec": "ts-node ./src/index.ts",
"ignore": [],
"delay": 1000
}

<!-- for building and removing existing-->

npm i --save-dev rimraf

<!-- additional setup script -->

<!-- for squeelize or orm -->

npm install sequelize sequelize-cli pg
npx sequelize-cli init
create .sequelizer with
const { resolve } = require("path");

module.exports = {
config: resolve("src", "config", "database.js"),
"models-path": resolve("src", "models"),
"seeders-path": resolve("src", "seeders"),
"migrations-path": resolve("src", "migrations"),
};
npm install --save-dev typescript @types/node
create database.js with
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
dialect: 'postgres',
database: 'your_database',
username: 'your_username',
password: 'your_password',
host: 'localhost',
port: 5432,
});

export default sequelize;
<!--  -->
npm install --save sequelize pg pg-hstore
npm install --save-dev @types/sequelize @types/pg @types/node
npm install --save dotenv
for migration
sequelize migration:generate --name filename
npm install -g sequelize-cli
npx sequelize db:migrate