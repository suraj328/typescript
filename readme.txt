//for creating new express project using typescript
step 1: npm init -y
step 2: npm install express typescript ts-node @types/node @types/express
step 3: npx tsc --init
step 4: update below line to tsconfig
	{
  	"compilerOptions": {
    	"target": "es6",
    	"module": "commonjs",
    	"outDir": "./dist",
    	"rootDir": "./src",
    	"strict": true,
    	"esModuleInterop": true
  		}
	}
step 4: config pacakage json file
	{
  	"scripts": {
    	"start": "ts-node src/server.ts",
    	"build": "tsc"
	  }
	}
step 5: optional setup(nodemon)
	a)
	{
  	"scripts": {
   	 "start": "nodemon src/server.ts",
    	"build": "tsc"
  	 }
	}
	b)create nodemon.json
	{
  	"watch": ["src"],
  	"ext": "ts",
  	"exec": "ts-node src/server.ts"
	}
step 5: npm run build
step 6: npm start

//library installation for express type 
npm install express @types/express






