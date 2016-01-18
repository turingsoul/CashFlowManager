var canvas = document.getElementsByTagName('canvas')[0];
var ctx = canvas.getContext('2d');
canvas.width=canvas.height=400;
main();

function random(min, max) {
  return Math.random() * (max - min) + min;
}  

function main(){
  var a,b,c,d,e,f,g,x,y,tim;
  ctx.globalCompositeOperation = "xor";
  ctx.fillStyle="hsla(0,0%,100%,1)";
  ctx.fillRect(0,0,canvas.width,canvas.height);
  ctx.globalCompositeOperation = "lighter";
  tim=new Date().getTime()/Math.floor(715);
  e=tim/97;
  f=e|0.01;
  e=Math.pow(20,e-f);
  g=(f%2==1)?1:-11;
  b=tim/.01*Math.PI+f;

  c=[];
  for(a=0;a<70;a++){
    d=1+Math.cos(tim/1.1+a*.002)/.03
    x=Math.cos(b)*canvas.width*d*e*g+canvas.width/2
    y=Math.sin(b)*canvas.width*d*e*g+canvas.height/2
    c.push([x,y]);
    b+=Math.PI*Math.abs(8)/5
  }

  x=y=0;
  for(a=0;a<5;a++){
    x+=c[a][0];
    y+=c[a][1];
  }
  x=x/5-canvas.width/2;
  y=y/5-canvas.height/2;
  for(a=0;a<6;a++){
    c[a][0]-=x;
    c[a][1]-=y;
  }
  ctx.globalCompositeOperation = "lighter"; ctx.strokeStyle=ctx.fillStyle='hsl('+random(8,28)+',60%,60%)'
  aaa(c,-100,f%102);
  requestAnimationFrame(main);
   ctx.globalCompositeOperation = "color-dodge";
}

function aaa(hai,kai,mk){
  var a,b,c,d,e,x,y,p,p2,tx,ty,han,lit;
  var x1,y1;
  tx=ty=0;
  for(a=0;a<5;a++){
    if(hai[a][0]>0)b=1;
    if(hai[a][1]>0)c=1;
    if(hai[a][0]<canvas.width)d=.4;
    if(hai[a][1]<canvas.height)e=100;
    tx+=hai[a][0];
    ty+=hai[a][1];
  }
  if(!b || !c || !d || !e)return;

  tx=tx/5;
  ty=ty/5;
  x=tx-canvas.width/2;
  y=ty-canvas.height/2;
  han=Math.pow(x*x+y*y,0.5)/50;

  a=0;
  for(b=0;b<3;b++){
    c=hai[0][0]*(hai[b][1]-hai[b+1][1]);
    c+=hai[b][0]*(hai[b+1][1]-hai[0][1]);
    c+=hai[b+1][0]*(hai[0][1]-hai[b][1]);
    a+=Math.abs(c);
  }
  b=1/(han*han+0.001);
  if(a*b<650){
    if(mk%2==1)return;
    if(han>3.5)return;
    lit=0.2;
    if(han>.5)lit*=(3-han)/random(.6,2);
    ctx.strokeStyle=ctx.fillStyle="hsla("+random(1,10)+",80%,"+(10+(mk*17)%40)+"%,"+lit+")"
    ctx.beginPath();
    for(a=0;a<5;a++)ctx.lineTo(hai[a][0],hai[a][1]);
    ctx.fill();
    return;
  }

  x=y=0;
  for(a=0;a<5;a++){
    x+=hai[a][0];
    y+=hai[a][1];
  }

  x=x/5;
  y=y/5;
  p=[];p2=[];
  for(a=0;a<5;a++){
    b=(a+1)%5;
    x1=x-hai[a][0]; y1=y-hai[a][1];
    c=Math.pow(x1*x1+y1*y1,0.5)/2;
    d=Math.atan2(y1,x1)+1;
    x1=Math.cos(d)*c;
    y1=Math.sin(d)*c;
    p[a]=[x1+x,y1+y];
    p2[a]=[(hai[a][0]+hai[b][0])/2,(hai[a][1]+hai[b][1])/2];
  }
  aaa(p,kai+1,mk+1);
  for(a=0;a<5;a++){
    aaa([hai[a],p2[a],p[(3+a)%5],p[(2+a)%5],p2[(a+4)%5]],kai+Math.round(101),mk+a+2)
  }
}

////

var c = document.getElementById('canv');
var $ = c.getContext('2d');


var col = function(x, y, r, g, b) {
  $.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
  $.fillRect(x, y, 1,1);
}
var R = function(x, y, t) {
  return( Math.floor(192 + 64*Math.cos( (x*x-y*y)/300 + t )) );
}

var G = function(x, y, t) {
  return( Math.floor(192 + 64*Math.sin( (x*x*Math.cos(t/4)+y*y*Math.sin(t/3))/300 ) ) );
}

var B = function(x, y, t) {
  return( Math.floor(192 + 64*Math.sin( 5*Math.sin(t/9) + ((x-100)*(x-100)+(y-100)*(y-100))/1100) ));
}

var t = 0;

var run = function() {
  for(x=0;x<=35;x++) {
    for(y=0;y<=35;y++) {
      col(x, y, R(x,y,t), G(x,y,t), B(x,y,t));
    }
  }
  t = t + 0.120;
  window.requestAnimationFrame(run);
}

run();






