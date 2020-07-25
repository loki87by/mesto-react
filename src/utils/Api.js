export class Api {
  constructor(options) {
    this.url = options.baseUrl;
    this.headers = options.headers;
  }

  //**работа с профилем
  //*получение юзердаты
  getUserInfo() {
    return fetch(`${this.url}/users/me`, {
      headers: this.headers,
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(new Error(`Ошибка: ${res.status}`));
      }
    });
  }
  //*изменение юзердаты
  updateInfo(userName, userActivity) {
    return fetch(`${this.url}/users/me`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        name: userName,
        about: userActivity
      })
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(new Error(`Ошибка: ${res.status}`));
    });
  }
  //*установка аватара
  setUserAvatar(userAvatar) {
    return fetch(`${this.url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        avatar: userAvatar
      })
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(new Error(`Ошибка: ${res.status} ${res.statusText}`));
    })
  }

  //**работа с карточками
  //*получение дефолтных карточек
  getInitialCards() {
    return fetch(`${this.url}/cards`, {
      headers: this.headers,
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(new Error(`Ошибка: ${res.status}`));
    });
  }
  //*добавление карточки
  addNewCard(cardName, cardLink) {
    return fetch(`${this.url}/cards`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        name: cardName,
        link: cardLink
      })
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(new Error(`Ошибка: ${res.status}`));
    });
  }
  //*лайк карточки
  like(cardId) {
    return fetch(`${this.url}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: this.headers
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(new Error(`Ошибка: ${res.status} ${res.statusText}`));
    })
    .then((data) => data);
  }
  //*дизлайк карточки
  dislike(cardId) {
    return fetch(`${this.url}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: this.headers,
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(new Error(`Ошибка: ${res.status} ${res.statusText}`));
    })
    .then((data) => data);
  }
  //*удаление карточки
  deleteCard(id) {
    return fetch(`${this.url}/cards/${id}`, {
      method: 'DELETE',
      headers: this.headers,
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(new Error(`Ошибка: ${res.status}`));
    });
  }
}

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-12',
  headers: {
    authorization: '35090019-cd19-48d3-8c6b-3ac80f2c4184',
    'Content-Type': 'application/json'
  }
});
export default api;