//Global Variable
var fg_image = null;
var bg_image = null;
var greenThreshold = 200;
var left_canvas;
var right_canvas;


function loadForegroundImage(){
  left_canvas = document.getElementById("foreground_img");
  var file_input = document.getElementById("fgfile");
  fg_image = new SimpleImage(file_input);
  fg_image.drawTo(left_canvas);
}

function loadBackgroundImage(){
  right_canvas = document.getElementById("background_img");
  var file_input = document.getElementById("bgfile");
  bg_image = new SimpleImage(file_input);
  bg_image.drawTo(right_canvas);
}

function greenScreen(){
  var output = new SimpleImage(fg_image.getWidth(),fg_image.getHeight())
  for (var pixel of fg_image.values()){
    var x = pixel.getX();
    var y = pixel.getY();
    if (pixel.getGreen()>greenThreshold){
      var bg_pixel = bg_image.getPixel(x,y);
      output.setPixel(x,y,bg_pixel);
    }
    else {
      output.setPixel(x,y,pixel);
    }
  }
  var ctx_right = right_canvas.getContext("2d");
  ctx_right.clearRect(0,0,right_canvas.width,right_canvas.height);
  output.drawTo(left_canvas);
}

function clearCanvas(){
  var ctx_left = left_canvas.getContext("2d");
  var ctx_right = right_canvas.getContext("2d");
  ctx_left.clearRect(0,0,left_canvas.width,left_canvas.height);
  ctx_right.clearRect(0,0,right_canvas.width,right_canvas.height);
}