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
