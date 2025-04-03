const canvas = document.getElementById("can");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const renderTools = {
    cnvs: canvas,
    context: ctx,

    fillTri(x1, y1, x2, y2, x3, y3, col){
        console.log("asdjhakfd");
        ctx.moveTo(x1, y1);
        ctx.beginPath();
        ctx.lineTo(x2, y2);
        ctx.moveTo(x2, y2);
        ctx.lineTo(x3, y3);
        ctx.moveTo(x3, y3);
        ctx.lineTo(x1, y1);
        ctx.fillStyle = col;
        ctx.fill();
    }
};

export {renderTools};