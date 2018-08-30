var p5Canvas;

class Circle {
    constructor(posX, posY, hue) {
        this.posX = posX;
        this.posY = posY;
        this.scale = 0;

        this.hue = hue;
        this.saturation = 100;
        this.brightness = 100;
        this.alpha = 100;
    }

    tick() {
        this.alpha += 0.05 * (0 - this.alpha);
        this.scale += 0.01 * (1000 - this.scale);
    }

    display() {
        strokeWeight(2);
        stroke(this.hue, this.saturation, this.brightness, this.alpha);
        ellipse(this.posX, this.posY, this.scale, this.scale);
    }
}

class CircleController {
    constructor() {
        this.circles = [];
        this.currHue = 0;
        this.hueValue = 1;
        this.xoff = 0;
        this.yoff = 0;
    }

    tick() {
        
        for (var i = 0; i < this.circles.length; i++) {
            this.circles[i].tick();
            this.circles[i].display();

            if (this.circles[i].alpha < 0.1) {
                this.circles = this.circles.slice(1);
            }
        }
    }

    move(currX, currY) {
        this.circles.push(new Circle(currX, currY, this.currHue));

        // color change
        this.currHue += this.hueValue;
        if (this.currHue > 100) {
            this.hueValue *= -1;
        } else if (this.currHue < 0) {
            this.hueValue *= -1;
        }
    }
}

var cc = new CircleController();

function setup() {
    p5Canvas = createCanvas(innerWidth, innerWidth);
    p5Canvas.parent("p5canvas");
    background(255);
    noFill();
    colorMode(HSB, 100);
}

function draw() {
    background(20);

    cc.tick();
}

function mouseMoved(){
    cc.move(mouseX, mouseY);
}
