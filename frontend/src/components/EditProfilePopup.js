import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUser/CurrentUserContext';

function EditProfilePopup(props){

    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');

    const currentUser = React.useContext(CurrentUserContext);

    React.useEffect(() => {
      setName(currentUser.name);
      setDescription(currentUser.about);
    }, [currentUser, props.isOpen]); 

    function handleChangeName(e) {
        setName(e.target.value);
    }

    function handleChangeDescription(e) {
        setDescription(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateUser({
          name: name,
          about: description
        });
      } 

return (
    <PopupWithForm name="edit-profile" title="Редактировать профиль" isOpen={props.isOpen} onClose={props.onClose} buttonText="Сохранить" onSubmit={handleSubmit}>
                <input className="form__input form__input_type_name" id="name-input" type="text" name="name" placeholder="Имя" required minLength="2" maxLength="40" value={name} onChange={handleChangeName}/>
                <span className="form__input-error name-input-error"></span>
                <input className="form__input form__input_type_job" id="job-input" type="text" name="about" placeholder="Работа" required minLength="2" maxLength="200" value={description} onChange={handleChangeDescription}/>
                <span className="form__input-error job-input-error"></span>
    </PopupWithForm>
)
}

export default EditProfilePopup;