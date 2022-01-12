import React from 'react';
import editButton from '../images/pen.svg';
import addButton from '../images/add-button.svg';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUser/CurrentUserContext';
import Header from './Header';
import {NavLink} from 'react-router-dom';

function Main(props) {

    const userInfo = React.useContext(CurrentUserContext);
    
    return (
        <>
        <Header>
            <NavLink to="/" className="header__menu-link" activeClassName="header__menu-link_active">{props.userMail.email}</NavLink>
            <NavLink to="/sign-in" onClick={props.exit} className="header__menu-link">Выйти</NavLink>
        </Header>
        <main className="main">
            <section className="profile">
                <div className="profile__data">
                    <div className="avatar" onClick={props.onEditAvatar} style={{ backgroundImage: `url(${userInfo.avatar})` }} ></div>
                    <div className="profile-info">
                        <div className="profile-info__name">
                            <h1 className="profile-info__title">{userInfo.name}</h1>
                            <button className="profile-info__edit-button" type="button" onClick={props.onEditProfile}>
                                <img src={editButton} className="profile-info__edit-button-image" alt="Редактировать" />
                            </button>
                        </div>
                        <p className="profile-info__subtitle">{userInfo.about}</p>
                    </div>
                </div>
                <button className="profile__add-button" type="button" onClick={props.onAddPlace}
                    style={{
                        backgroundImage: `url(${addButton})`,
                    }}></button>
            </section>
            <section className="elements">
                <ul className="cards">
                    {props.cards.map((card) => (  
                    <Card key={card._id} card={card} onCardClick={props.onCardClick} onCardDelete={props.onDeleteCard} onCardLike={props.onLikeCard} />  
                    )
                    )}
                </ul>

            </section>
        </main>
        </>
    )
}
export default Main;