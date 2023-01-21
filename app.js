var rows = 3;
var columns = 3;

var currTile;
var otherTile;

let turns = 0;

// var imgOrder = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
var imgOrder = ["4", "2", "8", "5", "1", "6", "7", "9", "3"];

window.onload = function () {
  for (let i = 0; i < rows; i++) {
    for (let a = 0; a < columns; a++) {
      let tile = document.createElement("img");
      tile.id = i.toString() + "-" + a.toString();
      tile.src = imgOrder.shift() + ".jpg";

      // DRAG FUNCTIONALITY
      tile.addEventListener("dragstart", dragStart); //click an image to drag
      tile.addEventListener("dragover", drageOver); // moving image around while clicked
      tile.addEventListener("dragenter", drageEnter); // dragging image onto another one
      tile.addEventListener("dragleave", drageLeave); // dragged image leaving another image
      tile.addEventListener("drop", dragDrop); //drag an image over another image, drop the image
      tile.addEventListener("dragend", dragEnd); // after drag drop, swap the two tiles

      document.querySelector(".board").append(tile);
    }
  }
};

function dragStart() {
  currTile = this; //this refers to the img tile being dragged
}

function drageOver(e) {
  e.preventDefault();
}

function drageEnter(e) {
  e.preventDefault();
}

function drageLeave() {}

function dragDrop() {
  otherTile = this; //this refers to the img tile being dropped on
}

function dragEnd() {
  if (!otherTile.src.includes("3.jpg")) {
    return;
  }

  let currCoords = currTile.id.split("-"); //ex: "0-0" -> ["ø", "0"]
  let r = parseInt(currCoords[0]);
  let c = parseInt(currCoords[1]);

  let otherCoords = otherTile.id.split("-");
  let r2 = parseInt(otherCoords[0]);
  let c2 = parseInt(otherCoords[1]);

  let moveLeft = r == r2 && c2 == c - 1;
  let moveRight = r == r2 && c2 == c + 1;

  let moveUp = c == c2 && r2 == r - 1;
  let moveDown = c == c2 && r2 == r + 1;

  let isAdjacent = moveLeft || moveRight || moveUp || moveDown;

  if (isAdjacent) {
    let currImg = currTile.src;
    let otherImg = otherTile.src;

    currTile.src = otherImg;
    otherTile.src = currImg;

    turns += 1;
    document.getElementById("turns").innerText = turns;
  }
}
