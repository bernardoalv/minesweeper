'use strict';

// dynamically generate player board
var generatePlayerBoard = function generatePlayerBoard(numberOfRows, numberOfColumns) {
	var board = []; // represents overall game board
	for (var rowIndex = 0; rowIndex < numberOfRows; rowIndex++) {
		var row = []; // represents single row to add to game board
		for (var columnIndex = 0; columnIndex < numberOfColumns; columnIndex++) {
			row.push(' ');
		};
		board.push(row);
	}
	return board;
};

// dynamically generate bomb board
var generateBombBoard = function generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs) {
	var board = []; // represents overall bomb board

	for (var rowIndex = 0; rowIndex < numberOfRows; rowIndex++) {
		var row = []; // represents single row to add to bomb board
		for (var columnIndex = 0; columnIndex < numberOfColumns; columnIndex++) {
			row.push(null);
		}
		board.push(row);
	}

	var numberOfBombsPlaced = 0; // bomb counter

	while (numberOfBombsPlaced < numberOfBombs) {
		var randomRowIndex = Math.floor(Math.random() * numberOfRows);
		var randomColumnIndex = Math.floor(Math.random() * numberOfColumns);
		if (board[randomRowIndex][randomColumnIndex] !== 'B') {
			board[randomRowIndex][randomColumnIndex] = 'B';
			numberOfBombsPlaced++;
		}
	}

	return board;
};

// show number of nearby bombs
var getNumberOfNeighboringBombs = function getNumberOfNeighboringBombs(bombBoard, rowIndex, columnIndex) {
	var neighborOffsets = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
	var numberOfRows = bombBoard.length;
	var numberOfColumns = bombBoard[0].length;

	var numberOfBombs = 0;

	neighborOffsets.forEach(function (offset) {
		var neighborRowIndex = rowIndex + offset[0];
		var neighborColumnIndex = columnIndex + offset[1];
		if (neighborRowIndex >= 0 && neighborRowIndex < numberOfRows && neighborColumnIndex >= 0 && neighborColumnIndex < numberOfColumns) {
			if (bombBoard[neighborRowIndex][neighborColumnIndex] === 'B') {
				numberOfBombs++;
			}
		}
	});
	return numberOfBombs;
};

// let user "flip" a tile
var flipTile = function flipTile(playerBoard, bombBoard, rowIndex, columnIndex) {
	if (playerBoard[rowIndex][columnIndex] !== ' ') {
		console.log('This tile has already been flipped.');
		return;
	} else if (bombBoard[rowIndex][columnIndex] === 'B') {
		playerBoard[rowIndex][columnIndex] = 'B';
	} else {
		playerBoard[rowIndex][columnIndex] = getNumberOfNeighboringBombs(bombBoard, rowIndex, columnIndex);
	}
};

// function to format the game board
var printBoard = function printBoard(board) {
	console.log(board.map(function (row) {
		return row.join(' | ');
	}).join('\n'));
};

// test the functions
var playerBoard = generatePlayerBoard(3, 4);

var bombBoard = generateBombBoard(3, 4, 5);
console.log('Player Board: ');
printBoard(playerBoard);

console.log('Bomb Board: ');
printBoard(bombBoard);

// always returns 0 for number of bombs - not sure why
flipTile(playerBoard, bombBoard, 0, 0);
console.log('Updated Player Board: ');
printBoard(playerBoard);