import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {

    const [name, setName] = React.useState();
    const [link, setLink] = React.useState();

    function handleChangeName(e) {
        setName(e.target.value);
    }

    function handleChangeLink(e) {
        setLink(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.onAddPlace ({
          name: name,
          link: link,
        });
    }

    return(
        <PopupWithForm name="add-card" title="Новое место" isOpen={props.isOpen} onClose={props.onClose} buttonText="Сохранить" onSubmit={handleSubmit}>
                <input className="form__input form__input_type_name form__input_type_error" id="place-input" type="text" name="name" placeholder="Название" required minLength="2" maxLength="30" value={name} onChange={handleChangeName} />
                <span className="form__input-error place-input-error"></span>
                <input className="form__input form__input_type_link form__input_type_error" id="link-input" type="url" name="link" placeholder="Ссылка на картинку" required value={link} onChange={handleChangeLink}/>
                <span className="form__input-error link-input-error"></span>
        </PopupWithForm>
    )
}

export default AddPlacePopup;