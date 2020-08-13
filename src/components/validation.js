//В src/App.js заменяем первоначальную разметку с помощью компонента Form, который вскоре создадим. Также необходимо сделать импорт компонента:
import React from 'react';
import './App.css';
import Form from './Form.js';
function App2 {
    return (
      <div className="App">
        <div className="App-header">
          <h2>React Form Validation Demo</h2>
        </div>
        <Form />
      </div>
    );
  }
export default App;

//Создадим компонент Form в src/Form.js. Мы сделаем простую форму с полями для ввода электронной почты и пароля. Добавим кнопку отправки формы.
import React from 'react';
import './Form.css';
function Form {
   return (
     <form className='demoForm'>
       <h2>Sign up</h2>
       <div className='form-group'>
         <label htmlFor='email'>Email address</label>
         <input type='email' className='form-control'
           name='email' />
       </div>
       <div className='form-group'>
         <label htmlFor='password'>Password</label>
         <input type='password' className='form-control'
           name="password" />
       </div>
       <button type='submit' className='btn btn-primary'>
          Sign up
       </button>
     </form>
   )
 }

export default Form;
/*Но я сделал некоторые изменения, чтобы форма работала с JSX. Так слова class и for зарезервированны в JavaScript, поэтому мы должны использовать 
className и htmlFor вместо них, соответственно. Также необходимо убедиться, что все теги закрыты, включая input
Добавим начальное значение stateв конструктор:*/
constructor (props) {
  super(props);
  this.state = {
    email: '',
    password: ''
  }
}
/*Мы установили значения по умолчанию emailи passwordв виде пустых строк.
Подключим поля вводя к значениям state , для почты:*/
value={this.state.email}
//и пароля:
value={this.state.password}
//Если мы сейчас будем вводить текст в поля, то значение состояния компонента не будет обновляться. Добавим обработчик onChange для полей ввода:
onChange={this.handleUserInput}
//Добавим логику обработчика:
handleUserInput = (e) => {
  const name = e.target.name;
  const value = e.target.value;
  this.setState({[name]: value});
}
/*Отлично. Теперь перейдем к самой проверке.
Будем хранить сообщения и код ошибок при вводе данных в state. Добавим несколько свойств для первоначального состояния:*/
constructor (props) {
  super(props);
  this.state = {
    email: '',
    password: '',
    formErrors: {email: '', password: ''},
    emailValid: false,
    passwordValid: false,
    formValid: false
  }
}
/*Свойство formError содержит объект, который состоит из названия полей в качестве ключей и информации об ошибке в качестве значения. 
Первоначальное значение для каждого ключа является пустой строкой. Также еще добавили три свойства типа boolean — emailValid, passwordValid, formValid , 
которые зависят от валидации отдельного поля и активности кнопки для отправки формы. Установим эти значения по умолчанию в false.
Добавим новый компонент FormErrors для отображения ошибок валидации над формой:*/
<div className='panel panel-default'>
 <FormErrors formErrors={this.state.formErrors} />
</div>
//Сохраним компонент в файле src/FormErrors.js:
import React from 'react';
export const FormErrors = ({formErrors}) =>
  <div className='formErrors'>
    {Object.keys(formErrors).map((fieldName, i) => {
      if(formErrors[fieldName].length > 0){
        return (
          <p key={i}>{fieldName} {formErrors[fieldName]}</p>
        )        
      } else {
        return '';
      }
    })}
  </div>
/*Это простой функциональный компонент, который принимает объект formError и возвращает объект содержащий JSX с сообщениями об ошибке, либо пустую строку.
Теперь мы можем запускать проверку как только пользователь начинает заполнять поля.
Метод setState принимает функцию обратного вызова в качестве второго аргумента, в которую можно передать функцию проверки:*/
handleUserInput (e) {
  const name = e.target.name;
  const value = e.target.value;
  this.setState({[name]: value}, 
                () => { this.validateField(name, value) });
}
//Объявим эту функцию:
validateField(fieldName, value) {
  let fieldValidationErrors = this.state.formErrors;
  let emailValid = this.state.emailValid;
  let passwordValid = this.state.passwordValid;
switch(fieldName) {
    case 'email':
      emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
      fieldValidationErrors.email = emailValid ? '' : ' is invalid';
      break;
    case 'password':
      passwordValid = value.length >= 6;
      fieldValidationErrors.password = passwordValid ? '': ' is too short';
      break;
    default:
      break;
  }
  this.setState({formErrors: fieldValidationErrors,
                  emailValid: emailValid,
                  passwordValid: passwordValid
                }, this.validateForm);
}
validateForm() {
  this.setState({formValid: this.state.emailValid &&
                            this.state.passwordValid});
}
/*Здесь мы имеем две проверки. Для поля электронной почты проверка осуществляется при помощи регулярного выражения.
Отмечу: я использую пример регулярного выражения из Devise library. Проверка электронной почты достаточно сложная задача, но для нашего примера 
этого будет достаточно.
Поле для ввода пароля проверяем на количество введенных символов. Минимальное количество 6 символов. Если менее, то выдаем ошибку.
Если поле не прошло проверку, то мы записываем сообщение об ошибке для данного поля и устанавливаем свойство прохождения проверки в false .
Затем вызываем setState для обновления formErrors и свойства прохождения проверки ( emailValid или passwordValid ). 
Далее отправляем функцию обратного вызова validateForm для установки значения formValid .
Добавить атрибут disable для кнопки отправки. Значение атрибута зависит от значения formValid в state .*/
<button type="submit" className="btn btn-primary"
  disabled={!this.state.formValid}>Sign up</button>
/*Теперь наша простая форма будет иметь проверку ввода данных.
Можно немного улучшить форму, добавив подсветку поля, которое не прошло валидацию.
 Для этого добавим полю класс Bootstraphas-error в добавок в классу form-group . 
<div className={`form-group
                 ${this.errorClass(this.state.formErrors.email)}`}>
Метод errorClass определим как:*/
errorClass(error) {
   return(error.length === 0 ? '' : 'has-error');
}
//Теперь поле не прошедшее проверку получает красное обрамление вокруг.