class Api {
    constructor({ baseUrl, headers }) {
        this._url = baseUrl;
        this._headers = headers
    }
    _checkRes(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`)
    }


    getInitialCards() {
        return fetch(`${this._url}/cards`, {
            headers: this._headers
        })
            .then(res => this._checkRes(res))

    }

    getUserInfo() {
        return fetch(`${this._url}/users/me`, {
            headers: this._headers
        })
            .then(res => this._checkRes(res))
    }



    editProfile(data) {
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                about: data.about
            })
        })
            .then(res => this._checkRes(res))
    }

    addNewCard(name, link) {
        return fetch(`${this._url}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                link: link
            })
        })
            .then(res => this._checkRes(res))
    }
    deleteCard(idCard) {
        return fetch(`${this._url}/cards/${idCard}`, {
            method: 'DELETE',
            headers: this._headers
        })
            .then(res => this._checkRes(res))
    }

    changeLikeCardStatus(idCard, isLiked) {
        return fetch(`${this._url}/cards/likes/${idCard}`, {
            method: isLiked ? 'PUT' : 'DELETE',
            headers: this._headers
        })
            .then(res => this._checkRes(res))
    }
    
    updateAvatar(url) {
        return fetch(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: url
            })
        })
            .then(res => this._checkRes(res))
    }

}

const api = new Api({
    baseUrl: 'https://api.Alina-mesto-back.nomoredomains.rocks',
    headers: {
      authorization: `Bearer ${localStorage.getItem("jwt")}`,
      'Content-Type': 'application/json'
    }
  });

export default api;
