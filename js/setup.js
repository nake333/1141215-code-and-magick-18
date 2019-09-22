'use strict';

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb (0, 0, 0)'];
var WIZARD_EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var WIZARD_NUMBERS = 4;

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

var getRandomArrayElement = function (arr) {
  var randomElement = Math.floor(Math.random() * arr.length);
  return arr[randomElement];
};

var generateRandomWizard = function () {
  var wizard = {
    name: getRandomArrayElement(WIZARD_NAMES),
    surname: getRandomArrayElement(WIZARD_SURNAMES),
    coatColor: getRandomArrayElement(WIZARD_COAT_COLORS),
    eyesColor: getRandomArrayElement(WIZARD_EYES_COLORS)
  };

  return wizard;
};

var wizards = [];

for (var i = 0; i < WIZARD_NUMBERS; i++) {
  wizards[i] = generateRandomWizard();
}

var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name.length > wizard.surname.length ? wizard.name + ' ' + wizard.surname : wizard.surname + ' ' + wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

var fragment = document.createDocumentFragment();

for (var j = 0; j < wizards.length; j++) {
  fragment.appendChild(renderWizard(wizards[j]));
}

similarListElement.appendChild(fragment);

userDialog.querySelector('.setup-similar').classList.remove('hidden');
