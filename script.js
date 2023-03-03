const grid = document.querySelector('#grid');
const gridSideLenght = 960;

generateGrid(16);


function generateGrid(gridSize){
    
    let cellSize = gridSideLenght/gridSize;

    
    for(i = 0; i < gridSize; i++){
        for(j = 0; j < gridSize; j++){
            let cell = document.createElement('div');
            cell.classList.add('grid-cell');
            cell.style.width = `${cellSize}px`;
            cell.style.height = `${cellSize}px`;
            grid.appendChild(cell);
        }
    }
}