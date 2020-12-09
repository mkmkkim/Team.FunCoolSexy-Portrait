/*from nomadcoders, developer.mozilla.org*/
const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2");
const colors = document.getElementsByClassName("jsColors");
const range = document.getElementById(jsRange);
const mode = document.getElementById(jsMode);
const saveBtn = document.getElementById(jsSave);

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 600;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;
/*ctx=To handle the pixels on the canvas*/
ctx.fillStyle = "white"
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
ctx.strokeStyle = "INITIAL_COLOR";
ctx.fillStyle = "INITIAL_COLOR";
ctx.lineWidth = 2.5;
/*beginpath=create, moveto=move to x, y,
lineto=connects the last point to the (x,y) coordinates with a straight line*/

let painting = false;
let filling = false;
function stopPainting(){
    painting = false;
 }
function startPainting(){
    painting = true;
 }
/* offset X=캔버스 좌측 상단을 기준으로 한 커서 위치(내 영어의 한계)
override=자식클래스가 부모 클래스를 무시하고 재정의*/
function onMouseMove(event) {
   const x=event.offsetX;
   const y=event.offsetY;
   if(!painting){
    ctx.beginPath();
    ctx.moveTo(x,y);
}
else{
    ctx.lineTo(x,y);
    ctx.stroke();
    }
 }
function handleColorClick(event){
   const color = event.target.style.backgroundColor;
   ctx.strokeStyle = color;
   ctx.fillStyle = color;
 }
 function handleRangeChange(event){
     const size = evnet.target.value;
     ctx.lineWidth = size;
 }
 function handleModeClick(event){
     if(filling == true){
         filling = flase;
         mode.innerText = "Fill";
     } else{
         filling = true;
         mode.innerText = "Paint";
     }
 }
 function handleCanvasClick(){
     if(filling){
     ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    }
 }
 function handleSaveClick(){
     const image = canvas.toDataURL();
     const link = document.createElement("a");
     link.href = image;
     link.download = "PaintJS";
     link.click();
 }
if(canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave",stopPainting);
    canvas.addEventListener("click",handleCanvasClick);
 }
/**/
    Array.from(colors).forEach(color =>
     color.addEventListener("click", handleColorClick));

if(range){
    range.addEventListener("input",handleRangeChange);
}

if(mode){
    mode.addEventListener("click",handleModeClick);
}

if(saveBtn){
    saveBtn.addEventListener("click", handleSaveClick);
}
