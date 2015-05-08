## Install

**Install Node modules**

```bash
ExchangeWorld~$ npm install
```

## start

**Start this api**

```bash
ExchangeWorld~$ npm start
> ExchangeWorld@0.1.0 start C:/AppServ/www/ExchangeWorld
> node ./bin/www
```


## See result

**Open your browser and type**

`http://127.0.0.1:3000/`


## Structure

```
	ExchangeWorld/
	|-- node_modules/
	|-- public/                 --- minified and public files
	|	|-- javascripts/
	|	|	|-- controllers/
	|	|	|-- directives/
	|	|	|-- services/
	|	|	|-- filters/
	|	|	|-- vendors/
	|	|	`-- ExwdApp.js
	|	|-- views/
	|	|	|-- seek.html
	|	|	|-- post.html
	|	|	`-- ...
	|	|-- stylesheets/
	|	|-- font/
	|	|-- images/
	|	`-- favicon.ico
	|-- src/                    --- source files (unminified)
	|	|-- (bower)compontents/
	|	|-- ...
	|	|-- views/
	|	|-- sass/
	|	`-- javascripts/
	|-- bin/
	|-- node_modules/
	|-- server/       			--- Nodejs source file
	|	|-- render/
	|	|-- routes/				--- Routes handler
	|	`-- connectDB.js		--- connect to Data Base
	|-- app.js 					--- Main (Starting point)
	|-- .bowerrc
	|-- bower.json
	`--package.json
```
