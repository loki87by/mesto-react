export default class FormValidator {
  constructor(data, element) {
    this._inputSelector = data.inputSelector; //инпуты
    this._submitButtonSelector = data.submitButtonSelector; //кнопка сохранить/создать
    this._inactiveButtonClass = data.inactiveButtonClass; //неактивная кнопка
    this._inputErrorClass = data.inputErrorClass; //ошибка в инпуте
    this._errorClass = data.errorClass; //ошибка в спане
    this._element = element;
  }

  // Функция добавки ошибки
  _showInputError(formElement, inputElement, errorMessage) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  };

  //обнуление ошибок
  cleanError(data, formSelector) {
    formSelector.querySelectorAll(`.${data.errorClass}`).forEach((span) => {
      span.textContent = '';
    })
    formSelector.querySelectorAll(`${data.inputSelector}`).forEach((error) => {
      error.classList.remove(`${data.inputErrorClass}`);
    })
  }

  // Функция, очистки ошибки
  hideInputError(formElement, inputElement) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = "";
  };

  // вызов и скрытие ошибки
  _checkInputValidity(formElement, inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      );
    } else {
      this.hideInputError(formElement, inputElement);
    }
  };

  //проверка на валидность
  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  //активация/дезактивация кнопки
  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._inactiveButtonClass);
      buttonElement.setAttribute("disabled", true);
    } else {
      buttonElement.classList.remove(this._inactiveButtonClass);
      buttonElement.removeAttribute("disabled");
    }
  };

  //добавка слушателей
  _setEventListeners(formElement) {
    const inputList = Array.from(formElement.querySelectorAll(this._inputSelector));
    const buttonElement = formElement.querySelector(this._submitButtonSelector);
    this._toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._toggleButtonState(inputList, buttonElement);
        this._checkInputValidity(formElement, inputElement);
      });
    });
  };

  //активаия валидации
  enableValidation() {
    this._setEventListeners(this._element);
  };
};