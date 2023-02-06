const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: [ 800, 800 ],
  animate: true,
};

const sketch = () => {
  let x = 460;
  let y = 0;
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    x -= 5;

    if (x < 0){
      y += 140;
      x = 460;
    }

    context.fillStyle = 'black';
    // Set line width
    context.lineWidth = 10;

    // Wall
    context.strokeRect(x + 75, y + 140, 150, 110);

    // Door
    context.fillRect(x + 130, y + 190, 40, 60);

    // Roof
    context.beginPath();
    context.moveTo(x + 50, y + 140);
    context.lineTo(x + 150, y + 60);
    context.lineTo(x + 250, y + 140);
    context.closePath();
    context.stroke();
  };
};

canvasSketch(sketch, settings);