## Install

**Install Node modules (Or if there are some dependencies issues, run this too)**

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
	|       |-- ormModel/                           --- The models of ORM definition are here
	|	`-- connectDB.js		--- connect to Database (Deprecated)
	|       `-- connectDBPool.js            --- connect to Datebase in pool connections (Deprecated)
	|       `-- orm.js                      --- connect to Database in ORM
	|-- app.js 					--- Main (Starting point)
	|-- .bowerrc
	|-- bower.json
	`--package.json
```
