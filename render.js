const canvas = document.getElementById("can");
const ctx = canvas.getContext("2d");

class Color {

    constructor(red, green, blue, alpha) {
        this.red = red;
        this.green = green;
        this.blue = blue;
        this.alpha = alpha == undefined? 0 : alpha;
    }

    toStyleString(){
        return this.originalStyleString == undefined? this.alpha == 0? `rgb(${this.red}, ${this.green}, ${this.blue})` : `rgba(${this.red}, ${this.green}, ${this.blue}, ${this.alpha})` : this.originalStyleString;
    }

    fromStyleString(styleString){
        let split = styleString.split(",");
        return new Color(Number(split[0].split("(")[1]), Number(split[1]), isNaN(Number(split[2]))? Number(split[2].split(")")[0]) : Number(split[2]), isNaN(Number(split[3].split(")")[0]))? 0 : Number(split[3].split(")")[0]));
    }
}

class Position2D {

    constructor(x, y){
        this.x = x;
        this.y = y;
    }

}

let screenCenter;
class Position3D {

    constructor(x, y, z){
        this.x = x;
        this.y = y;
        this.z = z;
    }

    castTo2D(){
        return new Position2D(screenCenter.x)
    }

}

const renderTools = {
    cnvs: canvas,
    context: ctx,

    initialize(){
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        screenCenter = new Position2D(window.innerWidth/2, window.innerHeight/2);
    },

    fillTri(pos1, pos2, pos3, col){
        ctx.beginPath();
        ctx.moveTo(pos1.x, pos1.y);
        ctx.lineTo(pos2.x, pos2.y);
        ctx.lineTo(pos3.x, pos3.y);
        ctx.closePath();
        ctx.fillStyle = col.toStyleString();
        ctx.fill();
    },

    drawPoint(pos){
        ctx.fillRect(pos.)
    },
    draw3DTri(){},
};

export {renderTools, Color, Position2D, Position3D};