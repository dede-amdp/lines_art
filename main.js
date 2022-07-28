// === GLOBAL DEFS ===
let cnv;
let data = []; // main data
let data2 = []; // secondary data
let l = 0; // length of each column (initialization)
const cols = 10; // number of columns
const ls = 5; // number of main lines
const colors = ["#05668D", "#028090", "#00A896", "#02C39A", "#F0F3BD", "#151E3F", "#030027", "#F2F3D9", "#DC9E82", "#C16E70", "#FFBE0B", "#FB5607", "#FF006E", "#8338EC", "#3A86FF"];
const backgrounds = ["#0A1128", "#890620", "#073B3A"]
// === MAIN ===
function setup() {
    cnv = createCanvas(1080, 1080);
    l = width / cols; // length of each column
    for (let j = 0; j < ls; j++) {
        let row = [];
        let row2 = [];
        for (let i = 0; i < cols; i++) {
            row.push((Math.random() * height - height / 2) + height / 2); // generate random main data
            if (j % 2 == 0)
                row2.push((Math.random() * height - height / 2) + height / 2); // generate random secondary data only if j is even
        }
        data.push(row);
        if (row2.length != 0)
            data2.push(row2);
    }
}

function draw() {
    background(random(backgrounds));
    // draw the lines
    draw_lines(data, 100); // usage example
    //draw_broken(data2, 10);
    //draw_bezier(data2, 10);
    noLoop();
}

// === METHODS ===

// draws the data as a set of connected segments
function draw_lines(data, thickness) {
    for (let j = 0; j < data.length; j++) {
        let row = data[j]; // get a line
        stroke(random(colors)); // choose a color
        strokeWeight(thickness); // set the thickness
        for (let i = 0; i < cols; i++) {
            line(i * l, row[i], (i + 1) * l, row[i]); // draw a line
            if (i + 1 < cols)
                line((i + 1) * l, row[i], (i + 1) * l, row[i + 1]); //draw a vertical line only if it is not the last segment
        }
    }
}

// draws the data as a broken line
function draw_broken(data, thickness) {
    for (let j = 0; j < data.length; j++) {
        let row = data[j]; // get a line
        stroke(random(colors)); //choose a color
        noFill();
        beginShape();
        strokeWeight(thickness); // set the thickness
        for (let i = 1; i < cols; i++) {
            vertex(i * l, row[i]); // set a vertex for each point to draw the line
        }
        endShape();
    }
}

// draws the data as a broken curved line
function draw_bezier(data, thickness) {
    for (let j = 0; j < data.length; j++) {
        let row = data[j]; // get a line
        stroke(random(colors)); // choose a color
        noFill();
        beginShape();
        strokeWeight(thickness); // set the thickness
        for (let i = 1; i < cols; i++) {
            vertex(i * l, row[i]); // set the first vertex
            // set up to draw the a bezier curve
            let x2 = (i + 1) * l;
            let y2 = row[i];
            let x3 = i * l + (random() * 50 - 25);
            let y3 = (random() * 50 - 25) + row[i];
            let x4 = (i + 1) * l + (random() * 50 - 25);
            let y4 = (random() * 50 - 25) + row[i + 1];
            bezierVertex(x2, y2, x3, y3, x4, y4); // set a bezier vertex
        }
        endShape();
    }
}