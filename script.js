const grid = document.querySelector('#grid');
const body = document.querySelector('body');
const GRIDSIDE = grid.offsetWidth - 4;
const gridSlider = document.querySelector('#slider');
const brushColor = document.querySelector('#brush-color');
const brushes = document.querySelectorAll('.brush');
let gridRowCellCount = 16;
let gridLines = true;
let brush = 'normal'; //normal, rainbow, eraser, picker

let gridCells = generateGrid(gridRowCellCount);



/* For the drag and color */
let mouseDown = 0;
grid.addEventListener('mousedown',() => {
    mouseDown = 1;
});
grid.addEventListener('mouseup',() => {
    mouseDown = 0;
});

/* MENU OPTIONS */

/* Brushes */

brushColor.addEventListener('change',() =>{
    brush = 'normal';
    document.querySelector('#normal-brush').checked  = true;
});

brushes.forEach((b)=>{
    b.addEventListener('change', () =>{
        brush = b.value;
    });
});

/* Buttons */
document.querySelector('#toggle-lines-btn').addEventListener('click', () =>{
    if(gridLines) disableGridLines();
    else enableGridLines();

});

document.querySelector('#clear-btn').addEventListener('click',() =>{
    clearGrid();
});

/* GRID CELLS */
gridSlider.addEventListener('input',(e) =>{
    document.querySelector('#slider-value').textContent = `${e.target.value}X${e.target.value}`;

});

document.querySelector('#grid-cells-btn').addEventListener('click', () => {
    gridRowCellCount = gridSlider.value;
    deleteGridCells();
    gridCells = generateGrid(gridRowCellCount);

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
            cell.setAttribute('data-blackch','0'); // chance of brush color be black in rainbow mode
            grid.appendChild(cell);
        }
    }
    //add event listeners to the grid cells
    document.querySelectorAll('.grid-cell').forEach((cell) => {
        cell.addEventListener('mouseover',()=>{
            if(mouseDown) changeCellColor(cell);
        });
    
        cell.addEventListener('click',()=>{
            changeCellColor(cell);
        });
    });
    

    return document.querySelectorAll('.grid-cell');
}

function deleteGridCells(){
    grid.innerHTML = '';

}

function changeCellColor(currentCell,color = brushColor.value){
    switch(brush){
        case 'normal':
            currentCell.style.backgroundColor = `${color}`;
            break;
        case 'rainbow':
            let blackRandom = Math.floor(Math.random() * 100) + 1;
            let blackChance = Number(currentCell.dataset.blackch);
            if(blackChance >= blackRandom){ //The cell has a increasing chance of being black each time it's colored
                currentCell.setAttribute('data-blackch',`${0}`); //resets the chance of being black to zero
                currentCell.style.backgroundColor = `rgb(34,34,34)`;
                break;
            }
            //random color
            let red = Math.floor(Math.random() * 256);
            let blue = Math.floor(Math.random() * 256);
            let green = Math.floor(Math.random() * 256);
            currentCell.style.backgroundColor = `rgb(${red},${blue},${green})`;
            currentCell.setAttribute('data-blackch',`${blackChance+10}`); //adds 10% to the chance of being black
            break;
        case 'eraser':
            currentCell.style.backgroundColor = `white`;
            break;
        case 'picker':
            brushColor.value = rgbToHex(currentCell.style.backgroundColor);
            document.querySelector('#normal-brush').checked  = true;
            brush = 'normal';
            break;
        default:
            currentCell.style.backgroundColor = `${color}`;
    }
    
}

function clearGrid(){
    gridCells.forEach((cell) => {
        cell.style.backgroundColor = 'white';
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

function rgbToHex(rgb){
    if(rgb.charAt(0) === '#') return rgb;

    if(rgb === '') return '#ffffff';

    let hex = rgb.replace('rgb(','');
    hex = hex.replace(')','');
    hex = hex.replaceAll(' ','');

    let colors = hex.split(',');
    let red = Number(colors[0]).toString(16);
    let blue = Number(colors[1]).toString(16);
    let green = Number(colors[2]).toString(16);

    if(red.length === 1) red = red.padStart(2,'0');
    if(blue.length === 1) blue = blue.padStart(2,'0');
    if(green.length === 1) green = green.padStart(2,'0');

    return `#${red}${blue}${green}`;
}

