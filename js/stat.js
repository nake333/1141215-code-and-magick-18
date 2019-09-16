'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var FONT_GAP = 20;
var BAR_GAP = 50;
var BAR_WIDTH = 40;
var BAR_HEIGHT = 150;
var PLAYER_NAMES_Y = 255;


var renderCloud = function(ctx, x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);

};

var getMaxElement = function(arr) {
    if (arr.length !== 0) {
        var maxElement = arr[0];

    for (var i = 0; i < arr.length; i++) {
        if (arr[i] > maxElement) {
            maxElement = arr[i];
        }
    }
        return maxElement;
    }
     return 'Массив ' + arr + 'пустой!';
};

var randomBlueSaturation = function () {
    var blueSaturation = Math.round(Math.random() * 100);
  
    return 'hsl(240, ' + blueSaturation + '%, 50%)';
};

window.renderStatistics = function(ctx, names, times) {    
    renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
    renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');
    
    ctx.fillStyle = '#000';  
    ctx.font ='16px PT Mono';
    ctx.textBaseline = 'hanging';
    ctx.fillText('Ура вы победили!', CLOUD_X + FONT_GAP, CLOUD_Y + FONT_GAP);
    ctx.fillText('Список результатов:', CLOUD_X + FONT_GAP, CLOUD_Y + FONT_GAP * 2);

    for (var j = 0; j < times.length; j++) {
        times[j] = Math.round(times[j]);
    }

    var maxTime = getMaxElement(times);
    

    for (var i = 0; i < names.length; i++) {
    ctx.fillStyle = '#000';
    ctx.fillText(names[i], CLOUD_X + BAR_GAP + (BAR_GAP + BAR_WIDTH) * i, PLAYER_NAMES_Y);
    ctx.fillText(times[i], CLOUD_X + BAR_GAP + (BAR_GAP + BAR_WIDTH) * i, BAR_GAP * 2 - GAP * 0.5 - FONT_GAP + (BAR_HEIGHT - (BAR_HEIGHT * times[i]) / maxTime));
    ctx.fillStyle = names[i] === 'Вы' ? 'rgba(255, 0, 0, 1)' : randomBlueSaturation();
    ctx.fillRect(CLOUD_X + BAR_GAP + (BAR_GAP + BAR_WIDTH) * i, BAR_GAP * 2 - GAP * 0.5 + (BAR_HEIGHT - (BAR_HEIGHT * times[i]) / maxTime), BAR_WIDTH, (BAR_HEIGHT * times[i]) / maxTime);
    } 
    
};