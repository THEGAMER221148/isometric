import { Camera } from "./camera.js";
import { currentCamera } from "./controller.js";

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

class Position3D {

    constructor(x, y, z){
        this.x = x;
        this.y = y;
        this.z = z;
    }

    castTo2D(){
        let xDiff = this.x-currentCamera.pos.x;
        let yDiff = this.y+currentCamera.pos.y;
        let zDiff = this.z-currentCamera.pos.z;
        return new Position2D((Math.sin(currentCamera.ry)*zDiff)+(xDiff*Math.cos(currentCamera.ry))+window.innerWidth/2, yDiff+window.innerHeight/2 + (currentCamera.pos.x-this.x)/Math.tan(currentCamera.vd)*Math.sin(currentCamera.ry)+(zDiff/Math.tan(currentCamera.vd)*Math.cos(currentCamera.ry)));//Position2D(((this.x-currentCamera.pos.x)*Math.cos(currentCamera.ry))+(this.z-currentCamera.pos.z)*Math.sin(currentCamera.ry)+window.innerWidth/2, ((this.z-currentCamera.pos.z)/Math.tan(currentCamera.vd)*Math.sin(currentCamera.ry)) + (this.y - currentCamera.pos.y) + Math.cos(currentCamera.ry)*((this.z-currentCamera.pos.x)/Math.tan(currentCamera.vd)) + window.innerHeight/2);
    } //yDiff+window.innerHeight/2 + zDiff/Math.tan(currentCamera.vd)*Math.sin(currentCamera.ry)

}

class Triangle {

    constructor(pos1, pos2, pos3, color) {
        this.v1 = pos1;
        this.v2 = pos2;
        this.v3 = pos3;
        this.col = color;
    }

    render(){
        ctx.beginPath();
        ctx.moveTo(this.v1.castTo2D().x, this.v1.castTo2D().y);
        ctx.lineTo(this.v2.castTo2D().x, this.v2.castTo2D().y);
        ctx.lineTo(this.v3.castTo2D().x, this.v3.castTo2D().y);
        ctx.closePath();
        ctx.fillStyle = this.col.toStyleString();
        ctx.fill();
    }

}

let screenCenter;

const triangles = [
    new Triangle(new Position3D(0, 0, 0), new Position3D(100, 0, 0), new Position3D(100, 100, 0), new Color(255, 0, 0)),
    new Triangle(new Position3D(0, 0, 100), new Position3D(100, 0, 100), new Position3D(100, 100, 100), new Color(0, 255, 0)),
];

const renderTools = {
    cnvs: canvas,
    context: ctx,

    initialize(){
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        screenCenter = new Position2D(window.innerWidth/2, window.innerHeight/2);
    },

    drawPoint(pos){
        ctx.fillStyle = new Color(0, 0, 255).toStyleString();
        ctx.fillRect(pos.x - currentCamera.pos.x - 10, pos.y - currentCamera.pos.y - 10, pos.x - currentCamera.pos.x + 10, pos.y - currentCamera.pos.y + 10);
        console.log(pos.x - currentCamera.pos.x - 10, pos.y - currentCamera.pos.y - 10);
    },

    renderEnvironment(){
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        triangles.forEach((item) => {
            item.render();
        });
    }

};

export {renderTools, Color, Position2D, Position3D, Triangle};