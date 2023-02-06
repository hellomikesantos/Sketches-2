const canvasSketch = require('canvas-sketch');
const math = require('canvas-sketch-util/math'); 
const random = require('canvas-sketch-util/random');

const settings = {
  dimensions: [ 1080, 1080 ]
};

const sketch = ({ context, width, height }) => {
  let x, y, w, h, fill, stroke;
  // let radius, angle, rx, ry;
  const num = 30;
  const degrees = -30;

  const rects = [];

  for (let i = 0; i < num; i++){
    x = random.range(0, width);
    y = random.range(0, height);
    w = random.range(200, 600);
    h = random.range(40, 200);

    fill = `rgba(${random.range(0, 20)}, ${random.range(0, 200)}, ${random.range(0, 190)}, 1)`;
    stroke = `rgba(${random.range(0, 20)}, ${random.range(0, 170)}, ${random.range(0, 120)}, 1)`;

    blend = (random.value() > 0.5 ?  'overlay' : 'source-over');

    rects.push({ x, y, w, h, fill, stroke, blend });
  }

  return ({ context, width, height }) => {
    context.fillStyle = `rgba(${random.range(0, 255)}, ${random.range(10, 255)}, ${random.range(0, 200)}, 1 )`;
    context.fillRect(0, 0, width, height);

   

    rects.forEach(rect => {

    const { x, y, w, h, fill, stroke, blend } = rect;

    context.save();
    context.translate(x, y);

    

    context.strokeStyle = stroke;
    context.fillStyle = fill;
    context.lineWidth = 10;

    context.globalCompositeOperation = blend;

    drawSkewedRect({ context, w, h, degrees });
    context.shadowColor = 'black';
    context.shadowColor = `rgba(0, 0, 0, 0.5)`
    context.shadowOffsetX = -10;
    context.shadowOffsetY = 20;

    // context.fill();
    context.shadowColor = null;
    context.stroke();

    context.globalCompositeOperation = 'source-over';

    
    context.lineWidth = 2;
    context.strokeStyle = 'gray';
    context.stroke();

    context.restore();
    });

    context.save();
    context.translate(width * 0.5, height * 0.5); 

    context.restore();
  };
};

const drawSkewedRect = ({context, w = 600, h = 200, degrees = 45}) => {
  const angle = math.degToRad(degrees);
  const rx = Math.cos(angle) * w;
  const ry = Math.sin(angle) * w;

  context.save();
  context.translate(rx * -0.5, (ry + h) * -0.5); 
  
  context.beginPath();
  context.moveTo(0, 0);
  context.lineTo(rx, ry);
  context.lineTo(rx, ry + h);
  context.lineTo(0, h);
  context.closePath(); 
  context.stroke();

  context.restore();
}

canvasSketch(sketch, settings);
