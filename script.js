const grid = document.querySelector('#grid');
const GRIDSIDE = grid.offsetWidth - 4;
const gridSlider = document.querySelector('#slider');
const brushColor = document.querySelector('#brush-color');
const brushes = document.querySelectorAll('.brush');
let gridRowCellCount = 16;
let gridLines = true;
let currentBrush = 'normal'; //normal, rainbow, eraser, picker
document.body.ondragstart = function (){return false;}; // this prevents dragging on the page
let gridCells = generateGrid();

/* For the drag and color */
let mouseDown = false;
document.body.addEventListener('mousedown',() => mouseDown = true);
document.body.addEventListener('mouseup',() => mouseDown = false);

/* BRUSHES */
brushColor.addEventListener('change',() =>{
    changeBrush('normal');
    document.querySelector('#normal-brush').checked  = true;
});

brushes.forEach((brush)=>{
    brush.addEventListener('change', changeBrush.bind(null,brush.value));
});

/* MENU BUTTONS */
document.querySelector('#toggle-lines-btn').addEventListener('click', toggleGridLines);
document.querySelector('#clear-btn').addEventListener('click', clearGrid);

/* GRID CELLS */
gridSlider.addEventListener('input',displayGridCellCount);
document.querySelector('#grid-cells-btn').addEventListener('click', changeGridCellCount);

/* FUNCTIONS */

function generateGrid(){
    
    let cellSize = GRIDSIDE/gridRowCellCount;

    
    for(i = 0; i < gridRowCellCount; i++){
        for(j = 0; j < gridRowCellCount; j++){
            let cell = document.createElement('div');
            cell.classList.add('grid-cell');
            cell.style.width = `${cellSize}px`;
            cell.style.height = `${cellSize}px`;
            cell.style.backgroundColor = '#FFFFFF';
            cell.ondragstart = function(){return false;}
            cell.setAttribute('data-blackch','0'); // chance of brush color be black in rainbow mode
            grid.appendChild(cell);
        }
    }
    //add event listeners to the grid cells
    document.querySelectorAll('.grid-cell').forEach((cell) => {
        cell.addEventListener('mouseover', changeCellColor);
    
        cell.addEventListener('mousedown', changeCellColor);
    });
    

    return document.querySelectorAll('.grid-cell');
}

function deleteGridCells(){
    grid.innerHTML = '';

}

function changeCellColor(e){
    if(e.type === 'mouseover' && !mouseDown) return;

    switch(currentBrush){
        case 'normal':
            e.target.style.backgroundColor = `${brushColor.value}`;
            break;

        case 'rainbow':
            //The cell has a increasing chance of being black each time it's colored
            let blackRandom = Math.floor(Math.random() * 100) + 1;
            let blackChance = Number(e.target.dataset.blackch);
            if(blackChance >= blackRandom){ 
                e.target.setAttribute('data-blackch',`${0}`); //resets the chance of being black to zero
                e.target.style.backgroundColor = `rgb(34,34,34)`;
                break;
            }
            //random color
            let red = Math.floor(Math.random() * 256);
            let blue = Math.floor(Math.random() * 256);
            let green = Math.floor(Math.random() * 256);
            e.target.style.backgroundColor = `rgb(${red},${blue},${green})`;
            e.target.setAttribute('data-blackch',`${blackChance+10}`); //adds 10% to the chance of being black
            break;

        case 'eraser':
            e.target.style.backgroundColor = `#FFFFFF`;
            break;

        case 'picker':
            brushColor.value = rgbToHex(e.target.style.backgroundColor);
            document.querySelector('#normal-brush').checked  = true;
            currentBrush = 'normal';
            break;
    }
}

function clearGrid(){
    gridCells.forEach((cell) => {
        cell.style.backgroundColor = '#FFFFFF';
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

function toggleGridLines(){
    if(gridLines) disableGridLines();
    else enableGridLines();
}

function changeBrush(brushName){
    currentBrush = brushName;
}

function displayGridCellCount(e){
    document.querySelector('#slider-value').textContent = `${e.target.value}X${e.target.value}`;
}

function changeGridCellCount(){
    gridRowCellCount = gridSlider.value;
    deleteGridCells();
    gridCells = generateGrid();
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