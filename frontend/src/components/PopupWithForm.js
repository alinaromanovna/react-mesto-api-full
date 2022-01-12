import React from 'react';

function PopupWithForm({ name, title, children, isOpen, onClose, buttonText, onSubmit}) {
    return (
        <div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__container">
                <button className="popup__close-button" type="reset" onClick={onClose}></button>
                <h2 className="popup__title">{`${title}`}</h2>
                <form className="form" name={`${name}`} onSubmit={onSubmit}>
                    {children}
                    <button className="form__save-button" type="submit">{`${buttonText}`}</button>
                </form>
            </div>
        </div>
    );
}

export default PopupWithForm;