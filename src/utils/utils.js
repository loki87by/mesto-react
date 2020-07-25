//добавляем в UX загрузку
export default function load(Loading, form, defaultText, processText) {  
  const button = form.querySelector('.popup__button');
  if(Loading) {
    button.textContent = processText;
  } else {
    button.textContent = defaultText;
  }
}