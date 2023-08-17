/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/bg.ts":
/*!*******************!*\
  !*** ./src/bg.ts ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   bg: () => (/* binding */ bg),\n/* harmony export */   bgDB: () => (/* binding */ bgDB),\n/* harmony export */   update_game_speed: () => (/* binding */ update_game_speed)\n/* harmony export */ });\nlet BG_GAME_SPEED = 5;\nconst update_game_speed = (value) => {\n    BG_GAME_SPEED = value;\n};\nclass layer {\n    img;\n    x;\n    y;\n    width;\n    height;\n    game_speed;\n    speed_modifier;\n    constructor(opt) {\n        this.img = opt.img;\n        this.x = 0;\n        this.y = 0;\n        this.width = opt.width;\n        this.height = opt.height;\n        this.speed_modifier = opt.speed_modifier;\n        this.game_speed = BG_GAME_SPEED * this.speed_modifier;\n    }\n    update(game_frame, game_speed) {\n        this.game_speed = game_speed * this.speed_modifier;\n        this.x = (game_frame * this.game_speed) % this.width;\n    }\n    draw(ctx) {\n        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);\n        ctx.drawImage(this.img, this.x + this.width, this.y, this.width, this.height);\n    }\n}\nconst img_width = 2400;\nconst img_height = 700;\nconst img = (src) => {\n    const result = new Image();\n    result.src = src;\n    return result;\n};\nconst bgDB = [\n    new layer({ img: img(\"./res/layer-1.png\"), width: img_width, height: img_height, speed_modifier: 0.2 }),\n    new layer({ img: img(\"./res/layer-2.png\"), width: img_width, height: img_height, speed_modifier: 0.4 }),\n    new layer({ img: img(\"./res/layer-3.png\"), width: img_width, height: img_height, speed_modifier: 0.6 }),\n    new layer({ img: img(\"./res/layer-4.png\"), width: img_width, height: img_height, speed_modifier: 0.8 }),\n    new layer({ img: img(\"./res/layer-5.png\"), width: img_width, height: img_height, speed_modifier: 1 }),\n];\nlet bgAnimatedId = \"\";\nconst bg = (opt) => {\n    BG_GAME_SPEED = BG_GAME_SPEED;\n    const ctx = opt.canvas.getContext(\"2d\");\n    const CANVAS_WIDTH = (opt.canvas.width = 800);\n    const CANVAS_HEIGHT = (opt.canvas.height = 700);\n    if (ctx) {\n        bgAnimatedId = Math.random()\n            .toString(36)\n            .replace(/[^a-z]+/g, \"\");\n        animateBg({\n            animateId: bgAnimatedId,\n            ctx,\n            bg: opt.bg,\n            game_frame: 0,\n            canvas_width: CANVAS_WIDTH,\n            canvas_height: CANVAS_HEIGHT,\n        });\n    }\n};\nconst animateBg = (opt) => {\n    opt.ctx.clearRect(0, 0, opt.canvas_width, opt.canvas_height);\n    opt.bg.forEach((i) => {\n        i.update(opt.game_frame, BG_GAME_SPEED);\n        i.draw(opt.ctx);\n    });\n    opt.game_frame--;\n    requestAnimationFrame(() => {\n        if (bgAnimatedId === opt.animateId) {\n            animateBg(opt);\n        }\n    });\n};\n\n\n//# sourceURL=webpack://@printf83/ts-game/./src/bg.ts?");

/***/ }),

/***/ "./src/enemy.ts":
/*!**********************!*\
  !*** ./src/enemy.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   enemy: () => (/* binding */ enemy),\n/* harmony export */   enemyType: () => (/* binding */ enemyType)\n/* harmony export */ });\n/* harmony import */ var _enemy_enemy1_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./enemy/enemy1.js */ \"./src/enemy/enemy1.ts\");\n/* harmony import */ var _enemy_enemy2_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./enemy/enemy2.js */ \"./src/enemy/enemy2.ts\");\n/* harmony import */ var _enemy_enemy3_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./enemy/enemy3.js */ \"./src/enemy/enemy3.ts\");\n/* harmony import */ var _enemy_enemy4_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./enemy/enemy4.js */ \"./src/enemy/enemy4.ts\");\n/* harmony import */ var _enemy_enemy5_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./enemy/enemy5.js */ \"./src/enemy/enemy5.ts\");\n\n\n\n\n\nconst enemyDB = {\n    enemy1: {\n        img: \"./res/enemy1.png\",\n        sprite_length: 5,\n        sprite_width: 293,\n        sprite_height: 155,\n        action: _enemy_enemy1_js__WEBPACK_IMPORTED_MODULE_0__.setupEnemy1,\n    },\n    enemy2: {\n        img: \"./res/enemy2.png\",\n        sprite_length: 5,\n        sprite_width: 266,\n        sprite_height: 188,\n        action: _enemy_enemy2_js__WEBPACK_IMPORTED_MODULE_1__.setupEnemy2,\n    },\n    enemy3: {\n        img: \"./res/enemy3.png\",\n        sprite_length: 5,\n        sprite_width: 218,\n        sprite_height: 177,\n        action: _enemy_enemy3_js__WEBPACK_IMPORTED_MODULE_2__.setupEnemy3,\n    },\n    enemy4: {\n        img: \"./res/enemy4.png\",\n        sprite_length: 8,\n        sprite_width: 213,\n        sprite_height: 213,\n        action: _enemy_enemy4_js__WEBPACK_IMPORTED_MODULE_3__.setupEnemy4,\n    },\n    enemy5: {\n        img: \"./res/enemy5.png\",\n        sprite_length: 5,\n        sprite_width: 271,\n        sprite_height: 194,\n        action: _enemy_enemy5_js__WEBPACK_IMPORTED_MODULE_4__.setupEnemy5,\n    },\n    enemy6: {\n        img: \"./res/enemy6.png\",\n        sprite_length: 5,\n        sprite_width: 261,\n        sprite_height: 209,\n        action: _enemy_enemy5_js__WEBPACK_IMPORTED_MODULE_4__.setupEnemy5,\n    },\n    enemy7: {\n        img: \"./res/enemy7.png\",\n        sprite_length: 5,\n        sprite_width: 229,\n        sprite_height: 171,\n        action: _enemy_enemy5_js__WEBPACK_IMPORTED_MODULE_4__.setupEnemy5,\n    },\n    enemy8: {\n        img: \"./res/enemy8.png\",\n        sprite_length: 5,\n        sprite_width: 310,\n        sprite_height: 175,\n        action: _enemy_enemy5_js__WEBPACK_IMPORTED_MODULE_4__.setupEnemy5,\n    },\n};\nconst enemyType = (canvas, canvas_width, canvas_height, action, count) => {\n    let item = enemyDB[action];\n    const img = new Image();\n    img.src = item.img;\n    const sprite_width = item.sprite_width;\n    const sprite_height = item.sprite_height;\n    const sprite_length = item.sprite_length;\n    const actFn = item.action;\n    return {\n        canvas,\n        canvas_width,\n        canvas_height,\n        enemy: actFn(count, {\n            img,\n            sprite_width,\n            sprite_height,\n            sprite_length,\n            canvas_height,\n            canvas_width,\n        }),\n    };\n};\nlet enemAnimationId = \"\";\nconst enemy = (opt) => {\n    const ctx = opt.canvas.getContext(\"2d\");\n    if (ctx) {\n        enemAnimationId = Math.random()\n            .toString(36)\n            .replace(/[^a-z]+/g, \"\");\n        animateEnemy({\n            animateId: enemAnimationId,\n            ctx,\n            enemy: opt.enemy,\n            game_frame: 0,\n            canvas_width: opt.canvas_width,\n            canvas_height: opt.canvas_height,\n        });\n    }\n};\nconst animateEnemy = (opt) => {\n    opt.ctx.clearRect(0, 0, opt.canvas_width, opt.canvas_height);\n    opt.enemy.forEach((i) => {\n        i.update(opt.game_frame);\n        i.draw(opt.ctx);\n    });\n    opt.game_frame++;\n    requestAnimationFrame(() => {\n        if (enemAnimationId === opt.animateId) {\n            animateEnemy(opt);\n        }\n    });\n};\n\n\n//# sourceURL=webpack://@printf83/ts-game/./src/enemy.ts?");

/***/ }),

/***/ "./src/enemy/base.ts":
/*!***************************!*\
  !*** ./src/enemy/base.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   baseEnemy: () => (/* binding */ baseEnemy)\n/* harmony export */ });\nclass baseEnemy {\n    frame;\n    img;\n    x;\n    y;\n    width;\n    height;\n    sprite_width;\n    sprite_height;\n    sprite_length;\n    game_speed;\n    animation_speed;\n    constructor(opt) {\n        this.frame = 0;\n        this.img = opt.img;\n        this.x = opt.x;\n        this.y = opt.y;\n        this.width = opt.width;\n        this.height = opt.height;\n        this.sprite_length = opt.sprite_length;\n        this.sprite_width = opt.sprite_width;\n        this.sprite_height = opt.sprite_height;\n        this.game_speed = opt.game_speed;\n        this.animation_speed = opt.animation_speed;\n    }\n    update(game_frame) {\n        if (game_frame % this.animation_speed === 0) {\n            this.frame >= this.sprite_length ? (this.frame = 0) : this.frame++;\n        }\n    }\n    draw(ctx) {\n        ctx.drawImage(this.img, this.frame * this.sprite_width, 0, this.sprite_width, this.sprite_height, this.x, this.y, this.width, this.height);\n    }\n}\n\n\n//# sourceURL=webpack://@printf83/ts-game/./src/enemy/base.ts?");

/***/ }),

/***/ "./src/enemy/enemy1.ts":
/*!*****************************!*\
  !*** ./src/enemy/enemy1.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   setupEnemy1: () => (/* binding */ setupEnemy1)\n/* harmony export */ });\n/* harmony import */ var _base_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base.js */ \"./src/enemy/base.ts\");\n\nclass enemy1 extends _base_js__WEBPACK_IMPORTED_MODULE_0__.baseEnemy {\n    constructor(opt) {\n        super(opt);\n    }\n    update(game_frame) {\n        this.x += Math.random() * 7 - 3.5;\n        this.y += Math.random() * 7 - 3.5;\n        super.update(game_frame);\n    }\n    draw(ctx) {\n        super.draw(ctx);\n    }\n}\nconst setupEnemy1 = (count, opt) => {\n    const width = opt.sprite_width / 2.5;\n    const height = opt.sprite_height / 2.5;\n    return Array(count)\n        .fill(\"\")\n        .map((_i) => {\n        return new enemy1({\n            img: opt.img,\n            x: Math.random() * (opt.canvas_width - width),\n            y: Math.random() * (opt.canvas_height - height),\n            width,\n            height,\n            sprite_width: opt.sprite_width,\n            sprite_height: opt.sprite_height,\n            sprite_length: opt.sprite_length,\n            game_speed: Math.random() * 4 - 2,\n            animation_speed: Math.floor(Math.random() * 3 + 1),\n        });\n    });\n};\n\n\n//# sourceURL=webpack://@printf83/ts-game/./src/enemy/enemy1.ts?");

/***/ }),

/***/ "./src/enemy/enemy2.ts":
/*!*****************************!*\
  !*** ./src/enemy/enemy2.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   setupEnemy2: () => (/* binding */ setupEnemy2)\n/* harmony export */ });\n/* harmony import */ var _base_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base.js */ \"./src/enemy/base.ts\");\n\nclass enemy2 extends _base_js__WEBPACK_IMPORTED_MODULE_0__.baseEnemy {\n    canvas_width;\n    canvas_height;\n    angle;\n    angle_speed;\n    curve;\n    constructor(opt) {\n        super(opt);\n        this.canvas_width = opt.canvas_width;\n        this.canvas_height = opt.canvas_height;\n        this.angle = opt.angle;\n        this.angle_speed = opt.angle_speed;\n        this.curve = opt.curve;\n    }\n    update(game_frame) {\n        this.x -= this.game_speed;\n        if (this.x + this.width < 0)\n            this.x = this.canvas_width;\n        this.y += this.curve * Math.sin(this.angle);\n        this.angle += this.angle_speed;\n        super.update(game_frame);\n    }\n    draw(ctx) {\n        super.draw(ctx);\n    }\n}\nconst setupEnemy2 = (count, opt) => {\n    const width = opt.sprite_width / 2.5;\n    const height = opt.sprite_height / 2.5;\n    return Array(count)\n        .fill(\"\")\n        .map((_i) => {\n        return new enemy2({\n            img: opt.img,\n            x: Math.random() * (opt.canvas_width - width),\n            y: Math.random() * (opt.canvas_height - height),\n            width,\n            height,\n            canvas_width: opt.canvas_width,\n            canvas_height: opt.canvas_height,\n            sprite_width: opt.sprite_width,\n            sprite_height: opt.sprite_height,\n            sprite_length: opt.sprite_length,\n            game_speed: Math.random() * 4 + 1,\n            animation_speed: Math.floor(Math.random() * 3 + 1),\n            angle: Math.random() * 2,\n            angle_speed: Math.random() * 0.2,\n            curve: Math.random() * 5,\n        });\n    });\n};\n\n\n//# sourceURL=webpack://@printf83/ts-game/./src/enemy/enemy2.ts?");

/***/ }),

/***/ "./src/enemy/enemy3.ts":
/*!*****************************!*\
  !*** ./src/enemy/enemy3.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   setupEnemy3: () => (/* binding */ setupEnemy3)\n/* harmony export */ });\n/* harmony import */ var _base_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base.js */ \"./src/enemy/base.ts\");\n\nclass enemy3 extends _base_js__WEBPACK_IMPORTED_MODULE_0__.baseEnemy {\n    canvas_width;\n    canvas_height;\n    angle;\n    angle_speed;\n    constructor(opt) {\n        super(opt);\n        this.canvas_width = opt.canvas_width;\n        this.canvas_height = opt.canvas_height;\n        this.angle = opt.angle;\n        this.angle_speed = opt.angle_speed;\n    }\n    update(game_frame) {\n        this.x = (this.canvas_width / 2) * Math.cos((this.angle * Math.PI) / 90) + (this.canvas_width / 2 - this.width / 2);\n        if (this.x + this.width < 0)\n            this.x = this.canvas_width;\n        this.y = (this.canvas_height / 2) * Math.sin((this.angle * Math.PI) / 270) + (this.canvas_height / 2 - this.height / 2);\n        if (this.y + this.height < 0)\n            this.y = this.canvas_height;\n        this.angle += this.angle_speed;\n        super.update(game_frame);\n    }\n    draw(ctx) {\n        super.draw(ctx);\n    }\n}\nconst setupEnemy3 = (count, opt) => {\n    const width = opt.sprite_width / 2.5;\n    const height = opt.sprite_height / 2.5;\n    return Array(count)\n        .fill(\"\")\n        .map((_i) => {\n        return new enemy3({\n            img: opt.img,\n            x: Math.random() * (opt.canvas_width - width),\n            y: Math.random() * (opt.canvas_height - height),\n            width,\n            height,\n            canvas_width: opt.canvas_width,\n            canvas_height: opt.canvas_height,\n            sprite_width: opt.sprite_width,\n            sprite_height: opt.sprite_height,\n            sprite_length: opt.sprite_length,\n            game_speed: Math.random() * 4 + 1,\n            animation_speed: Math.floor(Math.random() * 3 + 1),\n            angle: Math.random() * 2,\n            angle_speed: Math.random() * 0.5 + 0.5,\n        });\n    });\n};\n\n\n//# sourceURL=webpack://@printf83/ts-game/./src/enemy/enemy3.ts?");

/***/ }),

/***/ "./src/enemy/enemy4.ts":
/*!*****************************!*\
  !*** ./src/enemy/enemy4.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   setupEnemy4: () => (/* binding */ setupEnemy4)\n/* harmony export */ });\n/* harmony import */ var _base_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base.js */ \"./src/enemy/base.ts\");\n\nclass enemy4 extends _base_js__WEBPACK_IMPORTED_MODULE_0__.baseEnemy {\n    canvas_width;\n    canvas_height;\n    newX;\n    newY;\n    interval;\n    constructor(opt) {\n        super(opt);\n        this.canvas_width = opt.canvas_width;\n        this.canvas_height = opt.canvas_height;\n        this.newX = opt.newX;\n        this.newY = opt.newY;\n        this.interval = opt.interval;\n    }\n    update(game_frame) {\n        if (game_frame % this.interval === 0) {\n            this.newX = Math.random() * (this.canvas_width - this.width);\n            this.newY = Math.random() * (this.canvas_height - this.height);\n        }\n        let dx = this.x - this.newX;\n        let dy = this.y - this.newY;\n        this.x -= dx / 20;\n        this.y -= dy / 20;\n        super.update(game_frame);\n    }\n    draw(ctx) {\n        super.draw(ctx);\n    }\n}\nconst setupEnemy4 = (count, opt) => {\n    const width = opt.sprite_width / 2.5;\n    const height = opt.sprite_height / 2.5;\n    return Array(count)\n        .fill(\"\")\n        .map((_i) => {\n        return new enemy4({\n            img: opt.img,\n            x: Math.random() * (opt.canvas_width - width),\n            y: Math.random() * (opt.canvas_height - height),\n            width,\n            height,\n            canvas_width: opt.canvas_width,\n            canvas_height: opt.canvas_height,\n            sprite_width: opt.sprite_width,\n            sprite_height: opt.sprite_height,\n            sprite_length: opt.sprite_length,\n            game_speed: Math.random() * 4 + 1,\n            animation_speed: Math.floor(Math.random() * 3 + 1),\n            newX: Math.random() * (opt.canvas_width - width),\n            newY: Math.random() * (opt.canvas_height - height),\n            interval: Math.floor(Math.random() * 200 + 50),\n        });\n    });\n};\n\n\n//# sourceURL=webpack://@printf83/ts-game/./src/enemy/enemy4.ts?");

/***/ }),

/***/ "./src/enemy/enemy5.ts":
/*!*****************************!*\
  !*** ./src/enemy/enemy5.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   setupEnemy5: () => (/* binding */ setupEnemy5)\n/* harmony export */ });\n/* harmony import */ var _base_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base.js */ \"./src/enemy/base.ts\");\n\nclass enemy5 extends _base_js__WEBPACK_IMPORTED_MODULE_0__.baseEnemy {\n    constructor(opt) {\n        super(opt);\n    }\n    update(game_frame) {\n        this.x += Math.random() * 7 - 3.5;\n        this.y += Math.random() * 7 - 3.5;\n        super.update(game_frame);\n    }\n    draw(ctx) {\n        super.draw(ctx);\n    }\n}\nconst setupEnemy5 = (count, opt) => {\n    const width = opt.sprite_width / 2.5;\n    const height = opt.sprite_height / 2.5;\n    return Array(count)\n        .fill(\"\")\n        .map((_i) => {\n        return new enemy5({\n            img: opt.img,\n            x: Math.random() * (opt.canvas_width - width),\n            y: Math.random() * (opt.canvas_height - height),\n            width,\n            height,\n            sprite_width: opt.sprite_width,\n            sprite_height: opt.sprite_height,\n            sprite_length: opt.sprite_length,\n            game_speed: Math.random() * 4 - 2,\n            animation_speed: Math.floor(Math.random() * 3 + 1),\n        });\n    });\n};\n\n\n//# sourceURL=webpack://@printf83/ts-game/./src/enemy/enemy5.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _bg_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./bg.js */ \"./src/bg.ts\");\n/* harmony import */ var _enemy_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./enemy.js */ \"./src/enemy.ts\");\n/* harmony import */ var _player_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./player.js */ \"./src/player.ts\");\n//base on : https://www.youtube.com/watch?v=GFO_txvwK_c&t=13054s\n\n\n\nconst playerCanvas = document.getElementById(\"playerCanvas\");\nconst cboPlayerAnimation = document.getElementById(\"playerAnimation\");\nconst playerAnimationChange = (event) => {\n    const target = event.currentTarget;\n    const value = target.value;\n    if (value) {\n        (0,_player_js__WEBPACK_IMPORTED_MODULE_2__.player)((0,_player_js__WEBPACK_IMPORTED_MODULE_2__.playerAct)(playerCanvas, value));\n    }\n};\nconst enemyCanvas = document.getElementById(\"enemyCanvas\");\nconst cboEnemyType = document.getElementById(\"enemyType\");\nconst cboEnemyCount = document.getElementById(\"enemyCount\");\nconst enemyTypeOrCountChange = () => {\n    const enemy_type = cboEnemyType.value;\n    const enemy_count = cboEnemyCount.value;\n    if (enemy_type && enemy_count) {\n        (0,_enemy_js__WEBPACK_IMPORTED_MODULE_1__.enemy)((0,_enemy_js__WEBPACK_IMPORTED_MODULE_1__.enemyType)(enemyCanvas, 400, 750, enemy_type, parseInt(enemy_count)));\n    }\n};\nconst bgCanvas = document.getElementById(\"bgCanvas\");\nconst inputBgSpeed = document.getElementById(\"bgSpeed\");\nconst bgSpeedValue = document.getElementById(\"bgSpeedValue\");\nconst inputBgSpeedChange = (event) => {\n    const target = event.currentTarget;\n    const value = target.value;\n    if (value) {\n        bgSpeedValue.innerText = `[${value}]`;\n        (0,_bg_js__WEBPACK_IMPORTED_MODULE_0__.update_game_speed)(parseInt(value));\n    }\n};\n(function () {\n    cboPlayerAnimation.addEventListener(\"change\", playerAnimationChange);\n    cboPlayerAnimation.dispatchEvent(new Event(\"change\"));\n    enemyCanvas.width = 400;\n    enemyCanvas.height = 750;\n    cboEnemyCount.addEventListener(\"change\", enemyTypeOrCountChange);\n    cboEnemyType.addEventListener(\"change\", enemyTypeOrCountChange);\n    cboEnemyType.dispatchEvent(new Event(\"change\"));\n    (0,_bg_js__WEBPACK_IMPORTED_MODULE_0__.bg)({ canvas: bgCanvas, game_speed: 4, bg: _bg_js__WEBPACK_IMPORTED_MODULE_0__.bgDB });\n    inputBgSpeed.addEventListener(\"change\", inputBgSpeedChange);\n    inputBgSpeed.dispatchEvent(new Event(\"change\"));\n})();\n\n\n//# sourceURL=webpack://@printf83/ts-game/./src/index.ts?");

/***/ }),

/***/ "./src/player.ts":
/*!***********************!*\
  !*** ./src/player.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   player: () => (/* binding */ player),\n/* harmony export */   playerAct: () => (/* binding */ playerAct)\n/* harmony export */ });\nconst actionDB = {\n    idle: {\n        frame_y: 0,\n        sprite_length: 7,\n    },\n    jump: {\n        frame_y: 1,\n        sprite_length: 7,\n    },\n    fall: {\n        frame_y: 2,\n        sprite_length: 7,\n    },\n    run: {\n        frame_y: 3,\n        sprite_length: 8,\n    },\n    dizzy: {\n        frame_y: 4,\n        sprite_length: 11,\n    },\n    sit: {\n        frame_y: 5,\n        sprite_length: 5,\n    },\n    roll: {\n        frame_y: 6,\n        sprite_length: 7,\n    },\n    bite: {\n        frame_y: 7,\n        sprite_length: 7,\n    },\n    ko: {\n        frame_y: 8,\n        sprite_length: 12,\n    },\n    gethit: {\n        frame_y: 9,\n        sprite_length: 4,\n    },\n};\nconst playerAct = (canvas, action) => {\n    let item = actionDB[action];\n    const sprite_width = 575;\n    const sprite_height = 523;\n    const frame_y = sprite_height * item.frame_y;\n    const img = new Image();\n    img.src = \"./res/player.png\";\n    return {\n        canvas,\n        img,\n        sprite_width,\n        sprite_height,\n        location: Array(item.sprite_length)\n            .fill(\"\")\n            .map((_i, ix) => {\n            return {\n                y: frame_y,\n                x: ix * sprite_width,\n            };\n        }),\n    };\n};\nlet playerAnimatedId = \"\";\nconst player = (opt) => {\n    const ctx = opt.canvas.getContext(\"2d\");\n    const CANVAS_WIDTH = (opt.canvas.width = 500);\n    const CANVAS_HEIGHT = (opt.canvas.height = 500);\n    if (ctx) {\n        playerAnimatedId = Math.random()\n            .toString(36)\n            .replace(/[^a-z]+/g, \"\");\n        animatePlayer({\n            animateId: playerAnimatedId,\n            ctx,\n            img: opt.img,\n            location: opt.location,\n            frame_stagger: 0.2,\n            game_frame: 0,\n            frame_x: 0,\n            sprite_width: opt.sprite_width,\n            sprite_height: opt.sprite_height,\n            canvas_width: CANVAS_WIDTH,\n            canvas_height: CANVAS_HEIGHT,\n        });\n    }\n};\nconst animatePlayer = (opt) => {\n    opt.ctx.clearRect(0, 0, opt.canvas_width, opt.canvas_height);\n    let position = Math.floor(opt.game_frame * opt.frame_stagger) % opt.location.length;\n    const frame_x = opt.location[position]?.x;\n    const frame_y = opt.location[position]?.y;\n    if (frame_x !== undefined && frame_y !== undefined) {\n        opt.ctx.drawImage(opt.img, frame_x, frame_y, opt.sprite_width, opt.sprite_height, 0, 0, opt.canvas_width, opt.canvas_height);\n        opt.game_frame++;\n        requestAnimationFrame(() => {\n            if (playerAnimatedId === opt.animateId) {\n                animatePlayer(opt);\n            }\n        });\n    }\n};\n\n\n//# sourceURL=webpack://@printf83/ts-game/./src/player.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;