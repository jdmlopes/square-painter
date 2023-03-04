const grid = document.querySelector('#grid');
const body = document.querySelector('body');
const GRIDSIDE = grid.offsetWidth - 4;
let gridRowCellCount = 16;
let gridLines = true;
let brushColor = 'rgb(34, 34, 34)';

generateGrid(gridRowCellCount);

const gridCells = document.querySelectorAll('.grid-cell');

/* COLOR THE CELLS */
let mouseDown = 0;
body.addEventListener('mousedown',() => {
    mouseDown = 1;
});
body.addEventListener('mouseup',() => {
    mouseDown = 0;
});

gridCells.forEach((cell) => {
    cell.addEventListener('mouseover',()=>{
        if(mouseDown) changeCellColor(cell,brushColor);
    });

    cell.addEventListener('click',()=>{
        changeCellColor(cell,brushColor);
    });
});


/* MENU OPTIONS */


document.querySelector('#eraser').addEventListener('click',() => {
    changeBrushColor('white');

});

document.querySelector('#toggle-lines-btn').addEventListener('click', () =>{
    if(gridLines) disableGridLines();
    else enableGridLines();

});

document.querySelector('#clear-btn').addEventListener('click',() =>{
    clearGrid();
});



/* GRID FUNCTIONS */

function generateGrid(rowCellCount){
    
    let cellSize = GRIDSIDE/rowCellCount;

    
    for(i = 0; i < rowCellCount; i++){
        for(j = 0; j < rowCellCount; j++){
            let cell = document.createElement('div');
            cell.classList.add('grid-cell');
            cell.style.width = `${cellSize}px`;
            cell.style.height = `${cellSize}px`;
            grid.appendChild(cell);
        }
    }
}

function changeCellColor(currentCell,color){
    currentCell.style.backgroundColor = `${color}`;
}

function changeBrushColor(color){
    brushColor = color;
}

function clearGrid(){
    gridCells.forEach((cell) => {
        changeCellColor(cell,'white');
    });
}

function disableGridLines(){
    gridCells.forEach((cell) => {
        cell.style.border = 'none';
    });
    gridLines = false;
}

function enableGridLines(){
    gridCells.forEach((cell) => {
        cell.style.border = '1px solid black';
    });
    gridLines = true;
}

