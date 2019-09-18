'use strict';

var RECTANGLE_WIDTH = 420;
var RECTANGLE_HEIGHT = 270;
var RECTANGLE_X = 100;
var RECTANGLE_Y = 10;
var GAP = 10;
var FONT_GAP = 20;
var BAR_GAP = 50;
var BAR_WIDTH = 40;
var BAR_HEIGHT = 150;
var PLAYER_NAMES_Y = 255;


var renderRectangle = function (ctx, x, y, width, height, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);

};

var getMaxElement = function (arr) {
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

var renderText = function (ctx, text, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillText(text, x, y);
};

var randomNumber = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor((Math.random() * (max - min + 1)) + min);
};

window.renderStatistics = function (ctx, names, times) {
  renderRectangle(ctx, RECTANGLE_X + GAP, RECTANGLE_Y + GAP, RECTANGLE_WIDTH, RECTANGLE_HEIGHT, 'rgba(0, 0, 0, 0.7)');
  renderRectangle(ctx, RECTANGLE_X, RECTANGLE_Y, RECTANGLE_WIDTH, RECTANGLE_HEIGHT, '#fff');
  ctx.font = '16px PT Mono';
  ctx.textBaseline = 'hanging';
  renderText(ctx, 'Ура вы победили!', RECTANGLE_X + FONT_GAP, RECTANGLE_Y + FONT_GAP, '#000');
  renderText(ctx, 'Список результатов:', RECTANGLE_X + FONT_GAP, RECTANGLE_Y + FONT_GAP * 2, '#000');

  for (var j = 0; j < times.length; j++) {
    times[j] = Math.round(times[j]);
  }

  var maxTime = getMaxElement(times);
  for (var i = 0; i < names.length; i++) {
    var winnerX = RECTANGLE_X + BAR_GAP + (BAR_GAP + BAR_WIDTH) * i;
    var winnerY = BAR_GAP * 2 - GAP * 0.5 + (BAR_HEIGHT - (BAR_HEIGHT * times[i]) / maxTime);
    var randomBlue = names[i] === 'Вы' ? 'rgba(255, 0, 0, 1)' : 'hsl(240, ' + randomNumber(0, 100) + '%, 50%)';

    renderText(ctx, names[i], winnerX, PLAYER_NAMES_Y, '#000');
    renderText(ctx, times[i], winnerX, winnerY - FONT_GAP, '#000');
    renderRectangle(ctx, winnerX, winnerY, BAR_WIDTH, (BAR_HEIGHT * times[i]) / maxTime, randomBlue);
  }
};
