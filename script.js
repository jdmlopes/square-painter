const grid = document.querySelector('#grid');
const body = document.querySelector('body');
const GRIDSIDE = 960;
let gridRowCellCount = 16;
let gridLines = true;

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
        if(mouseDown) changeCellColor(cell,'rgb(34, 34, 34)');
    });

    cell.addEventListener('click',()=>{
        changeCellColor(cell,'rgb(34, 34, 34)');
    });
});


/* MENU OPTIONS */
document.querySelector('#clear-btn').addEventListener('click',() =>{
    clearGrid();
});

document.querySelector('#toggle-lines-btn').addEventListener('click', () =>{
    if(gridLines) disableGridLines();
    else enableGridLines();

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