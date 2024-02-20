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

