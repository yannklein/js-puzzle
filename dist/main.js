/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./lib/puzzle.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./lib/puzzle.js":
/*!***********************!*\
  !*** ./lib/puzzle.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

// console.log("Hi from puzzle.js");

// //////////
// REHEARSAL
// //////////

// 1. Select 2 elements: button, hint
const button = document.querySelector("#show-hint");
const hint = document.querySelector(".hint");

// 2. Listen to a click on the button
button.addEventListener("click", () => {
  // 3. Add a class "active" to the hint
  hint.classList.add("active");
});

// //////////
// LIVECODE
// //////////

const isNextToEmpty = (tile) => {
  // Define the position of clicked tile
  const tileCol = tile.cellIndex;
  const tileRow = tile.parentElement.rowIndex;
  // Define the position of the empty tile
  const emptyTile = document.querySelector(".empty");
  const emptyCol = emptyTile.cellIndex;
  const emptyRow = emptyTile.parentElement.rowIndex;
  // if empty is near the clicked tile, return true, else, return false
  return (Math.abs(tileRow-emptyRow) + Math.abs(tileCol-emptyCol)) === 1;
};

const swapTiles = (tile) => {
  const emptyTile = document.querySelector(".empty");
  // add the number to empty tile and remove the class "empty"
  emptyTile.innerText = tile.innerText;
  emptyTile.classList.remove("empty");
  // remove the number from clicked tile and add the class "empty"
  tile.innerText = "";
  tile.classList.add("empty");
};

const didWeWin = (tiles) => {
  const winningString = "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,";
  const tileNumbers = [];
  tiles.forEach((tile) => {
    tileNumbers.push(tile.innerText);
  });
  // tiles is a NodeList, we cannot do .map on a NodeList!!! just on arrays
  // const tileNumbers = tiles.map((tile) => {
  //   return tile.innerText;
  // });
  const tileNumbersString = tileNumbers.join(",");
  return tileNumbersString === winningString;
};

// 1. Select all the tiles (we get a NodeList ~= array)
const tiles = document.querySelectorAll("td");
// 2. For each tile...
tiles.forEach((tile) => {
  // 3. Listen to a click on the tile
  tile.addEventListener("click", (event) => {
    // event.currentTarget is the tile that we have been clicking
    // 4. check if the clicked tile is next to the empty tile or not (above, below, left, right)
    const clickedTile = event.currentTarget;
    if (isNextToEmpty(clickedTile)) {
      // console.log("next to empty");
      // 5. If empty tile next to it, swap the tiles
      swapTiles(clickedTile);
      // 6. if the tiles are in the right order, we win the game
      if (didWeWin(tiles)) {
        alert("🎸 You won! 😍");
      }
    }
  });
});


/***/ })

/******/ });
//# sourceMappingURL=main.js.map