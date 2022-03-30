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


    getInitialCards(token) {
        return fetch(`${this._url}/cards`, {
            headers: {...this._headers, Authorization: `Bearer ${token}`},
        })
            .then(res => this._checkRes(res))

    }

    getUserInfo(token) {
        return fetch(`${this._url}/users/me`, {
            headers: {...this._headers, Authorization: `Bearer ${token}`},
        })
            .then(res => this._checkRes(res)
            )
    }



    editProfile(data, token) {
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: {...this._headers, Authorization: `Bearer ${token}`},
            body: JSON.stringify({
                name: data.name,
                about: data.about
            })
        })
            .then(res => this._checkRes(res))
    }

    addNewCard(name, link, token) {
        return fetch(`${this._url}/cards`, {
            method: 'POST',
            headers: {...this._headers, Authorization: `Bearer ${token}`},
            body: JSON.stringify({
                name: name,
                link: link
            })
        })
            .then(res => this._checkRes(res))
    }
    deleteCard(idCard, token) {
        return fetch(`${this._url}/cards/${idCard}`, {
            method: 'DELETE',
            headers: {...this._headers, Authorization: `Bearer ${token}`},
        })
            .then(res => this._checkRes(res))
    }

    changeLikeCardStatus(idCard, isLiked, token) {
        return fetch(`${this._url}/cards/${idCard}/likes`, {
            method: isLiked ? 'PUT' : 'DELETE',
            headers: {...this._headers, Authorization: `Bearer ${token}`},
        })
            .then(res => this._checkRes(res))
    }
    
    updateAvatar(url, token) {
        return fetch(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            headers: {...this._headers, Authorization: `Bearer ${token}`},
            body: JSON.stringify({
                avatar: url
            })
        })
            .then(res => this._checkRes(res))
    }

}
// https://api.alina-mesto-back.nomoredomains.rocks
// 
const api = new Api({
    baseUrl: 'https://api.alina-mesto-back.nomoredomains.rocks',
    headers: {
      'Content-Type': 'application/json'
    }
  });

export default api;
