const grid = document.querySelector('#grid');
const gridSideLenght = 960;
const gridRowCellCount = 16;

generateGrid(gridRowCellCount);

const gridCells = document.querySelectorAll('.grid-cell');


let mouseDown = 0;
grid.addEventListener('mousedown',() => {
    mouseDown = 1;
});
grid.addEventListener('mouseup',() => {
    mouseDown = 0;
});

gridCells.forEach((cell) => {
    cell.addEventListener('mouseover',()=>{
        if(mouseDown) changeCellColor(cell,'rgb(34, 34, 34)');
    });
});


function generateGrid(rowCellCount){
    
    let cellSize = gridSideLenght/rowCellCount;

    
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