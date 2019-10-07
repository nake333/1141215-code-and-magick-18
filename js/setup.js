'use strict';

(function () {
  var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var WIZARD_COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb (0, 0, 0)'];
  var WIZARD_FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
  var WIZARD_EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var WIZARD_NUMBERS = 4;
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  var getRandomArrayElement = function (arr) {
    var randomElement = Math.floor(Math.random() * arr.length);
    return arr[randomElement];
  };

  var generateRandomWizard = function () {
    var wizard = {
      name: getRandomArrayElement(WIZARD_NAMES) + ' ' + getRandomArrayElement(WIZARD_SURNAMES),
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

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

    return wizardElement;
  };

  var fragment = document.createDocumentFragment();

  for (var j = 0; j < wizards.length; j++) {
    fragment.appendChild(renderWizard(wizards[j]));
  }

  similarListElement.appendChild(fragment);

  var setup = document.querySelector('.setup');
  var setupCoordinationX = getComputedStyle(setup).left;
  var setupCoordinationY = getComputedStyle(setup).top;
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = setup.querySelector('.setup-close');

  var onPopupEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closePopup();
    }
  };

  var setupResetPosition = function () {
    setup.style.left = setupCoordinationX;
    setup.style.top = setupCoordinationY;
  };

  var openPopup = function () {
    setup.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
  };

  var closePopup = function () {
    setup.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
    setupResetPosition();
  };

  setupOpen.addEventListener('click', function () {
    openPopup();
  });

  setupOpen.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      openPopup();
    }
  });

  setupClose.addEventListener('click', function () {
    closePopup();
  });

  setupClose.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      closePopup();
    }
  });

  var setupNameInput = setup.querySelector('.setup-user-name');
  setupNameInput.addEventListener('keydown', function (evt) {
    evt.stopPropagation();
    if (event.keyCode === ENTER_KEYCODE) {
      event.preventDefault();
    }
  });

  var coatColor = setup.querySelector('.setup-wizard .wizard-coat');
  var eyesColor = setup.querySelector('.setup-wizard .wizard-eyes');
  var fireballColor = setup.querySelector('.setup-fireball-wrap');
  var coatColorInput = setup.querySelector('[name="coat-color"]');
  var eyesColorInput = setup.querySelector('[name="eyes-color"]');
  var fireballColorInput = document.querySelector('[name="fireball-color"]');

  coatColor.addEventListener('click', function () {
    var newCoatColor = WIZARD_COAT_COLORS[WIZARD_COAT_COLORS.indexOf(coatColorInput.value) + 1];
    if (newCoatColor === undefined) {
      newCoatColor = WIZARD_COAT_COLORS[0];
    }
    coatColor.setAttribute('style', 'fill: ' + newCoatColor);
    coatColorInput.value = newCoatColor;
  });

  eyesColor.addEventListener('click', function () {
    var newEyesColor = WIZARD_EYES_COLORS[WIZARD_EYES_COLORS.indexOf(eyesColorInput.value) + 1];
    if (newEyesColor === undefined) {
      newEyesColor = WIZARD_EYES_COLORS[0];
    }
    eyesColor.setAttribute('style', 'fill: ' + newEyesColor);
    eyesColorInput.value = newEyesColor;
  });

  fireballColor.addEventListener('click', function () {
    var newFireballColor = WIZARD_FIREBALL_COLORS[WIZARD_FIREBALL_COLORS.indexOf(fireballColorInput.value) + 1];
    if (newFireballColor === undefined) {
      newFireballColor = WIZARD_FIREBALL_COLORS[0];
    }
    fireballColor.setAttribute('style', 'background-color: ' + newFireballColor);
    fireballColorInput.value = newFireballColor;
  });

  window.setup = {
    node: setup
  };
})();
