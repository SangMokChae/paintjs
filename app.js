// CanvasRenderingContext2D mdn 참조 ctx내용 등등
const canvas = document.getElementById("jsCanvas"); //jsCanvus id값을 불러온다. 
const ctx = canvas.getContext("2d"); // ctx= Context
const colors = document.getElementsByClassName("jsColor");//class값을 불러온다.
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const INITIAL_COLOR = "#2c2c2c";

canvas.width = document.getElementsByClassName("canvas")[0].offsetWidth; //캔버스 크기를 호출 한다.
canvas.height = document.getElementsByClassName("canvas")[0].offsetHeight;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height); //배경을 하얀색으로 지정

ctx.strokeStyle = INITIAL_COLOR; // 기본색깔
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5; // range의 변화가 선굵기에 영향을 주도록 하는것

let painting = false; //painting 마우스클릭전에는 기본 false
let filling =  false; // filling의 기본값은 false다.


function stopPainting() { // 마우스가 멈추는 function을 포괄적으로 실행한다.
  painting = false
}

function startPainting() {
  painting = true;
}

function onMouseMove(event) {
  const x = event.offsetX; //offset은 만든 캔버스의 범위에 해당한다.
  const y = event.offsetY;
  if(!painting) {
      // console.log("creating path in ", x, y);
    ctx.beginPath(); // 움직이면서 path가 시작되게 한다. / 클릭하면 path가 끝나는 지점이 된다.
    ctx.moveTo(x, y); // 마우스가 이동하는 곳으로 path를 이동시킨다.
  } else {
      // console.log("creating line in ", x, y);
    ctx.lineTo(x, y); // 시작점과 끝점을 연결한다.
    ctx.stroke();
  }
}

// function onMouseDown(event) { //Array 만들면서 생략가능
//   painting = true; //마우스 클릭시 painting 이 ture가 되고 페인트가 시작된다.
// }

// function onMouseUp(event) { // 생략가능
//   // painting = false; //마우스를 땟을때는 다시 painting이 멈추고 false로 돌아간다.
//   stopPainting(); //마우스를 땟을때 stopPainting function이 실행 되게한다.
// }

// function onMouseLeave(event) { // 밑에보면 mouseLeave() 가 필요 없어진다.
//   painting = false; //마우스가 켄버스를 벗어났을때 그림이 그려지지 않게 한다.
// }

function handleColorClick(event) {
  const color = event.target.style.backgroundColor;
  // console.log(color);
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

function handleRangeChange(event) {
  const size = event.target.value;
  ctx.lineWidth = size;
}

function handleModeClick(event) {
  if(filling==true) {
    filling = false;
    mode.innerText = "Fill";
  } else {
    filling = true;
    mode.innerText = "Paint";
    // ctx.fillStyle = ctx.strokeStyle; 
  }
}

function handleCanvasClick() {
  if(filling) {
    ctx.fillRect(0, 0, canvas.width, canvas.height); // 꽉차게 canvas 색깔 박스 만들기
  }
}

function handleCM(event) {
  event.preventDefault(); // 마우스 오른쪽 클릭 금지
}

function handleSaveClick(){
  const image = canvas.toDataURL(); // png로 저장하는 function
  const link = document.createElement("a"); // a 링크를 만들어 낸다 이때 a 는 a link 를 의미한다.
  link.href = image;
  link.download = "PaintJS[🎨]";
  link.click();
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting); //mousedown은 클릭했을 때
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting); // 이렇게 함으로써 mouseLeave function 이 필요 없어 진다.
  canvas.addEventListener("click", handleCanvasClick);
  // canvas.addEventListener("contextmenu", handleCM); //마우스 오른쪽 클릭시 나오는 콘텐츠창 안뜨게 하기
}

Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick));

if(range) {
  range.addEventListener("input", handleRangeChange);
}

if(mode) {
  mode.addEventListener("click", handleModeClick);
}

if(saveBtn) {
  saveBtn.addEventListener("click", handleSaveClick); //mdn canvas to data URL
}