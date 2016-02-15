 function drawPercentage(before,now){
 	
 	var config4 = liquidFillGaugeDefaultSettings();
    config4.circleThickness = 0.03;
    config4.circleColor = "#808015";
    config4.textColor = "#ffffff";
    config4.waveTextColor = "#123456";
    config4.waveColor = "#AAAA39";
    config4.textVertPosition = 0.8;
    config4.waveAnimateTime = 1000;
    config4.waveHeight = 0.05;
    config4.waveAnimate = true;
    config4.waveRise = false;
    config4.waveHeightScaling = false;
    config4.waveOffset = 0.25;
    config4.textSize = 0.75;
    config4.waveCount = 3;
    var gauge5 = loadLiquidFillGauge("fillgauge",before,config4);
    gauge5.update(now);
    
 }
 