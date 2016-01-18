# ExchangeWorld Web

### How to run the project
1. Install node modules (`ExchangeWorld~$ npm install`)
2. run ExchangeWorld
  1. Run `gulp` (may require installing Gulp globally `npm install gulp -g`)
  2. Your browser will automatically be opened and directed to the browser-sync proxy address
  3. To prepare assets for production, run the `gulp prod` task (Note: the production task does not fire up the express server, and won't provide you with browser-sync's live reloading. Simply use `gulp dev` during development. More information below)
  4. If you are ready to put build files to server, run `gulp deploy` to transfer compressed build dir to remote server.
3. Now that `gulp dev` is running, the server is up as well and serving files from the `/build` directory. Any changes in the `/app` directory will be automatically processed by Gulp and the changes will be injected to any open browsers pointed at the proxy address.

### Simple Version
1. in terminal:  
  ```
  ExchangeWorld~$ npm install
  ExchangeWorld~$ gulp
  ```
  
2. gulp will open `localhost:3000` in browser for you. ヽ(✿ﾟ▽ﾟ)ノ
3. start coding...

---

### AngularJS

AngularJS is a MVW (Model-View-Whatever) Javascript Framework for creating single-page web applications. In this boilerplate, it is used for all the application routing as well as all of the frontend views and logic.

The AngularJS files are all located within `app/angular`, structured in the following manner:  
Create folders named for the feature they represent. When a folder grows to contain more than 7 files, start to consider creating a folder for them. Your threshold may be different, so adjust as needed.
```
.
├── core
├── exchange
├── follow
│   ├── follow.controller.js  // put all related controller/service/html in same feature folder
│   ├── follow.html
│   ├── follow.module.js
│   ├── follow.route.js
│   └── follow.service.js
├── goods
├── home
├── layout
├── main.js
├── map
├── mobile
├── post
├── profile
├── seek
├── templates.js
├── tmp
└── utils
```
#### Coding Style
- All angularjs related code should follow the [coding style guide](https://github.com/johnpapa/angular-styleguide)
- We use **ONE HARD-TAB** for indention

#### Dependency injection

Dependency injection is carried out with the `ng-annotate` library. In order to take advantage of this, a simple comment of the format:

```javascript
/** @ngInject */
```

needs to be added directly before any Angular functions/modules. The Gulp tasks will then take care of adding any dependency injection, requiring you only to specify the dependencies within the function call and nothing more.
