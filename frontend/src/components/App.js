import React from 'react';
import { Route, Switch, useHistory, NavLink } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import api from '../utils/Api'
import { CurrentUserContext } from '../contexts/CurrentUser/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ProtectedRoute from './ProtectedRoute';
import InfoToolTip from './InfoToolTip';
import * as auth from '../utils/Auth';





function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
    const [isInfotoolPopupOpen, setIsInfotoolOpen] = React.useState(false);
    const [selectedCard, setIsSelectedCard] = React.useState({ link: '', name: '' });

    const [currentUser, setCurrentUser] = React.useState({ name: '', about: '', avatar: '' });
    const [cards, setCards] = React.useState([])

    const [loggedIn, setLoggedIn] = React.useState(false);
    const [isAuthorized, setIsAuthorized] = React.useState(false);
    const [userData, setUserData] = React.useState({
        _id: '',
        email: '',
    })
    const token = localStorage.getItem('jwt');

    function handleRegister({ password, email }) {
        auth.register({ password, email })
            .then((data) => {
                if (data) {
                    setIsInfotoolOpen(true);
                    setIsAuthorized(true)
                    history.push('/sign-in')
                }
            })
            .catch((err) => {
                setIsInfotoolOpen(true);
                setIsAuthorized(false);
                console.log(err)

            })
    }

    function handleLogin({ email, password }) {
        auth.authorize({
            email,
            password
        })
            .then((data) => {
                if (data.token) {
                    localStorage.setItem('jwt', data.token);
                    handleTokenCheck();
                }
            })
            .catch((err) => {
                setIsInfotoolOpen(true);
                setIsAuthorized(false);
                console.log(err)

            })
    }

    function handleTokenCheck() {
        const jwt = localStorage.getItem('jwt');
        if (jwt) {
            auth.getContent(jwt)
                .then((res) => {
                    if (res) {
                        const userData = {
                            _id: res._id,
                            email: res.email
                        }
                        setUserData(userData)
                        setLoggedIn(true)
                        history.push("/");
                    }
                })
                .catch((err) => {
                    setIsInfotoolOpen(true);
                    setIsAuthorized(false);
                    console.log(err)

                })
        }
    }

    React.useEffect(() => {
        console.log(loggedIn);
        if (loggedIn === true) {
            Promise.all([api.getUserInfo(token), api.getInitialCards(token)])
                .then(([dataUser, dataCard]) => {
                    console.log(dataCard);
                    console.log(dataUser);
                    setCurrentUser(dataUser)
                    setCards(dataCard);
                
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }, [loggedIn]);

    function handleCardLike(card) {
        const isLiked = card.likes.some(id => id === currentUser._id);
        api.changeLikeCardStatus(card._id, !isLiked, token)
            .then((newCard) => {
                setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
            })
            .catch(err => {
                console.log(err);
            })
    }

    function handleCardDelete(card) {
        api.deleteCard(card._id, token)
            .then((cards) => {
                console.log(card);
                setCards(cards.filter((c) => c._id !== card._id))
                console.log();

            })
            .catch(err => {
                console.log(err);
            })
    }

    function handleUpdateUser(data) {
        api.editProfile(data, token)
            .then((userData) => {
                console.log(userData);
                setCurrentUser(userData);
                closeAllPopups();
            })
            .catch(err => {
                console.log(err);
            })

    }

    function handleUpdateAvatar(data) {
        console.log(data);
        api.updateAvatar(data.avatar, token)
            .then((userData) => {
                console.log(userData);
                setCurrentUser(userData);
                closeAllPopups();
            })
            .catch(err => {
                console.log(err);

            })
    }

    function handleAddPlaceSubmit(data) {
        api.addNewCard(data.name, data.link, token)
            .then((newCard) => {
                setCards([newCard, ...cards])
                closeAllPopups();
            })
            .catch(err => {
                console.log(err);
            })
    }

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);

    }

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);

    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    }

    function handleCardClick(card) {
        setIsSelectedCard(card);
        setIsImagePopupOpen(true);
    }

    function closeAllPopups() {
        setIsEditAvatarPopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsSelectedCard({ link: '', name: '' });
        setIsImagePopupOpen(false);
        setIsInfotoolOpen(false);
    }

    const history = useHistory()

    function handleExit() {
        localStorage.removeItem('jwt');
    }

    React.useEffect(() => {
        handleTokenCheck()
    }, [])




    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="app">
                <Switch>
                    <ProtectedRoute exact path="/" loggedIn={loggedIn} component={Main}
                        onEditAvatar={handleEditAvatarClick}
                        onEditProfile={handleEditProfileClick}
                        onAddPlace={handleAddPlaceClick}
                        onCardClick={handleCardClick}
                        onDeleteCard={handleCardDelete}
                        onLikeCard={handleCardLike}
                        cards={cards}
                        exit={handleExit}
                        userMail={userData}
                    />
                    <Route path="/sign-in">
                        <Header>
                            <NavLink to="/sign-up" className="header__menu-link">Регистрация</NavLink>
                        </Header>
                        <Login onLogin={handleLogin} />
                    </Route>
                    <Route path="/sign-up">
                        <Header>
                            <NavLink to="/sign-in" className="header__menu-link">Войти</NavLink>
                        </Header>
                        <Register onRegister={handleRegister} />
                    </Route>
                </Switch>
                <Footer />
                <InfoToolTip isOpen={isInfotoolPopupOpen} onClose={closeAllPopups} isAutorized={isAuthorized} />
                <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
                <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
                <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />
                <ImagePopup card={selectedCard} isOpen={isImagePopupOpen} onClose={closeAllPopups} />
            </div>
        </CurrentUserContext.Provider>

    );
}

export default App;
